import { useDispatch, useSelector } from 'react-redux';
import { authSelectors } from 'redux/auth/auth-selectors';
import { logOut } from 'redux/auth/auth-operations';
import s from './UserMenu.module.css';
import { ImUserCheck } from "react-icons/im";

export default function UserMenu() {
  const dispatch = useDispatch();
  // const name = useSelector(state => state.auth.user.name);
  const name = useSelector(authSelectors.getUsername);

  return (
    <div className={s.menuContainer}>
      <ImUserCheck className={ s.icon}/>
      <span className={s.name}>welcome, {name}</span>
      <button type="button" className={s.btn} onClick={() => dispatch(logOut())}>
        logout
      </button>
    </div>
  );
}
