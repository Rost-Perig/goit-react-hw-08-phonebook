import { useEffect } from 'react';
import { lazy, Suspense } from 'react'; // Suspense - обязателен для ассинхронных маршрутов (lazy)
import { useDispatch } from 'react-redux';
import { Switch, Route, Redirect } from 'react-router-dom';
import './App.css';
import Container from 'components/Container';
import { fetchCurrentUser } from 'redux/auth/auth-operations';
import Spinner from 'components/Spinner';
import AppBar from 'components/AppBar';
import ProtectedRoute from 'components/ProtectedRoute';
import PublicRoute from 'components/PublicRoute';
// import HomeView from 'views/HomeView';
// import RegisterView from 'views/RegisterView';
// import LoginView from 'views/LoginView';
// import ContactsView from 'views/ContactsView';

const HomeView = lazy(() => import('views/HomeView'));
const RegisterView = lazy(() => import('views/RegisterView'));
const LoginView = lazy(() => import('views/LoginView'));
const ContactsView = lazy(() => import('views/ContactsView'));


export default function App() {
  const dispatch = useDispatch();

  //проверяем и есть ли в локал сторидж записаный токен и подбираем его для дальнейших запросов на сервер
  useEffect(() => {
    dispatch(fetchCurrentUser());
  }, [dispatch]);

  return (
    <Container>
      <AppBar />
      <Switch>
        <Suspense fallback={<Spinner/>}> 
          <Route exact path="/" component={HomeView} />
          <PublicRoute exact path="/register" redirectTo="/" restricted>
            <RegisterView />
          </PublicRoute>
          <PublicRoute exact path="/login" redirectTo="/" restricted>
            <LoginView />
          </PublicRoute>
          <ProtectedRoute path="/contacts" redirectTo="/">
            <ContactsView/>
          </ProtectedRoute>
        </Suspense>
      </Switch>
      <Redirect to='/'>
        <HomeView/>
      </Redirect>
    </Container>
  )
};
