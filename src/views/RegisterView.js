import { useState, useEffect } from 'react';
import s from '../components/InputsForm/RegLogInputs.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { register } from '../redux/auth/auth-operations';
import { badReq } from 'redux/auth/auth-actions';
import { authSelectors } from 'redux/auth/auth-selectors';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function RegisterView() {
  const dispatch = useDispatch();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  // const badRequest = useSelector(state => state.auth.badRequest);
  const badRequest = useSelector(authSelectors.getBadRequest);

  useEffect(() => {
    if (!badRequest) {
      return;
    };
    badRequest && toast.warn('Невозможно зарегистрировать. Пользователь с таким email уже зарегистрирован');
    dispatch(badReq(false));
  });

  const handleChange = ({ target: { name, value } }) => {
    switch (name) {
      case 'name':
        return setName(value);
      case 'email':
        return setEmail(value);
      case 'password':
        return setPassword(value);
      default:
        return;
    }
  };

  const handleSubmit = e => {
    e.preventDefault();
    if (!name || !email || !password) {
      toast.warn('заполните все поля!')
      return 
    }
    dispatch(register({ name, email, password }));
    setName('');
    setEmail('');
    setPassword('');
  };

  return (
    <>
      <h1>registration</h1>
      <div  className={s.frame}>
      <form
        onSubmit={handleSubmit}
        className={s.form}
        autoComplete="off">
        <label>
          <input
            className={s.input}
            type="text"
            name="name"
            placeholder="name"
            value={name}
            onChange={handleChange} />
        </label>

        <label>
          <input
            className={s.input}
            type="email"
            name="email"
            placeholder="email"
            value={email}
            onChange={handleChange}
          />
        </label>

        <label>
          <input
            className={s.input}
            type="password"
            name="password"
            placeholder="password"
            value={password}
            onChange={handleChange}
          />
        </label>

        <button type="submit" className={s.btn}>register</button>
      </form>
      </div>

      <ToastContainer
        position="top-center"
        autoClose={3000}
        theme="colored"
      />
    </>
  );
}
