import { Route, Redirect } from "react-router";
import { useSelector } from "react-redux";
import { authSelectors } from '../redux/auth/auth-selectors';

/**
 * - Если маршрут ограниченный, и юзер залогинен, рендерит по redirectTo
 * - В противном случае рендерит компонент
 *
 */

export default function PublicRoute({
  children,
  restricted = false,
  redirectTo = '/',
  ...routeProps
}) {
  const isLoggedIn = useSelector(authSelectors.getIsLoggedIn);
  const shouldRedirect = isLoggedIn && restricted;
  return (
    <Route {...routeProps}>
      {shouldRedirect ? <Redirect to={redirectTo} /> : children}
    </Route>
  );
}