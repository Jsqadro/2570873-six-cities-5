import { AppRoute, AuthorizationStatus } from '@const';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/header/header';
import LoginForm from '../../components/login-form/login-form';
import { useAppSelector } from '../../hooks';


export default function LoginPage(): JSX.Element {
  const navigate = useNavigate();
  const authorizationStatus = useAppSelector((state) => state.authorizationStatus);

  useEffect(() => {
    if (authorizationStatus === AuthorizationStatus.Auth) {
      navigate(AppRoute.Root);
    }
  }, [authorizationStatus, navigate]);

  return (
    <div className="page page--gray page--login">
      <Header />
      <main className="page__main page__main--login">
        <div className="page__login-container container">
          <section className="login">
            <h1 className="login__title">Sign in</h1>
            <LoginForm />
          </section>
          <section className="locations locations--login locations--current">
            <div className="locations__item">
              <a className="locations__item-link" href="#">
                <span>Amsterdam</span>
              </a>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}

