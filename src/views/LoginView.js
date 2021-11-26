import { useState, useEffect } from 'react';
import s from '../components/InputsForm/RegLogInputs.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { logIn } from '../redux/auth/auth-operations';
import { badReq } from 'redux/auth/auth-actions';
import { authSelectors } from 'redux/auth/auth-selectors';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function LoginView() {
  const dispatch = useDispatch();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  // const badRequest = useSelector(state => state.auth.badRequest);
  const badRequest = useSelector(authSelectors.getBadRequest);

  useEffect(() => {
    if (!badRequest) {
      return;
    };
    badRequest && toast.warn('Неверный логин или пароль. Пробуй ещё. Осталось всего несколько миллионов вариантов...');
    dispatch(badReq(false));
  });

  const handleChange = ({ target: { name, value } }) => {
    switch (name) {
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
    
    dispatch(logIn({ email, password }));
    setEmail('');
    setPassword('');
  };

  return (
    <>
      <h1>login</h1>
        <div  className={s.frame}>
        <form
          onSubmit={handleSubmit}
          className={s.form}
          autoComplete="off">
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

            <button type="submit" className={s.btn}>login</button>
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
