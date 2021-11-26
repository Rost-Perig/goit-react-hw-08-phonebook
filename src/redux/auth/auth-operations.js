/*================при использовании createAsyncThunk================*/
import { createAsyncThunk } from '@reduxjs/toolkit'; // при использовании createAsyncThunk
import axios from 'axios';

axios.defaults.baseURL = 'https://connections-api.herokuapp.com';


//эта "фигня" позволяет добавлять токены в строку запроса на сервер (такое предусмотрено в axios)
const token = {
  set(token) {
    axios.defaults.headers.common.Authorization = `Bearer ${token}`; //эта заморочка добавляет Authorization = `Bearer ${token}` в строку запроса (на ВСЕ!(в этом варианте) запросы на сервер) и сервер распознает пользователя по токену
  },
  unset() {
    axios.defaults.headers.common.Authorization = '';  //эта заморочка добавляет Authorization = '' в строку запроса (на ВСЕ! запросы на сервер) и сервер не распознает пользователя по токену
  },
};

/*
 * POST @ /users/signup
 * body: { name, email, password }
 * После успешной регистрации добавляем токен в HTTP-заголовок
 */
export const register = createAsyncThunk(
  'auth/register',
  async credentials => {
  try {
    const { data } = await axios.post('/users/signup', credentials);
    token.set(data.token); //здесь при удачной регистрации настраивается описаный выше токен, ему прописывается значение токена. полученого с сервера
    return data;
  } catch (error) {
    // alert('Невозможно зарегистрировать пользователя с такими данными или пользователь с таким email уже зарегистрирован');
    return console.log(error);
  }
  });

/*
 * POST @ /users/login
 * body: { email, password }
 * После успешного логина добавляем токен в HTTP-заголовок
 */
export const logIn = createAsyncThunk(
  'auth/login',
  async credentials => {
    try {
      const { data } = await axios.post('/users/login', credentials);
      token.set(data.token); //здесь при удачном залогинивании настраивается описаный выше токен, ему прописывается значение токена. полученого с сервера
      return data;
    } catch (error) {
      // alert('Неверный логин или пароль. Пробуй ещё. Осталось всего несколько миллионов вариантов...');
      return console.log(error);
    }
});

/*
 * POST @ /users/logout
 * headers: Authorization: Bearer token
 * После успешного логаута, удаляем токен из HTTP-заголовка
 */
export const logOut = createAsyncThunk(
  'auth/logout',
  async () => {
    try {
      await axios.post('/users/logout');
      token.unset(); //здесь при разлогинивании токен сбрасывается
    } catch (error) {
      return console.log(error);
    }
});

  /*
 * GET @ /users/current
 * headers:
 *    Authorization: Bearer token
 *
 * 1. Забираем токен из стейта через getState()
 * 2. Если токена нет, выходим не выполняя никаких операций
 * 3. Если токен есть, добавляет его в HTTP-заголовок и выполянем операцию
 */
export const fetchCurrentUser = createAsyncThunk(
  'auth/refresh',
  async (_, thunkAPI) => {
    const state = thunkAPI.getState(); //так просто мы получаем весь наш стейт
    const persistedToken = state.auth.token; //это токен с этого стейта (с предыдущей сессии)

    if (persistedToken === null) {
      return thunkAPI.rejectWithValue();
    };
    token.set(persistedToken); //"передаем" токен предыдущей сессии в заголовок для авторизации
    try {
      const { data } = await axios.get('/users/current');
      return data;
    } catch (error) {
      // TODO: Добавить обработку ошибки error.message
      return console.log(error);
    }
  },
);