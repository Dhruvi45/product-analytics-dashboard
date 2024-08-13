import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { Container, Form, Button, Row, Col, Card } from 'react-bootstrap';
import '../css/auth.css'
interface LoginFormInputs {
  email: string;
  password: string;
}
const initialMode = 'login';
const Login: React.FC = () => {
  const [mode, setMode] = useState(initialMode);

    const toggleMode = () => {
        setMode(mode === 'login' ? 'signup' : 'login');
    };
    const onSubmit =()=>{
        console.log('submit');
    }

    return (
        <div>
            <div className={`form-block-wrapper form-block-wrapper--is-${mode}`} ></div>
            <section className={`form-block form-block--is-${mode}`}>
                <header className="form-block__header">
                    <h1>{mode === 'login' ? 'Welcome back!' : 'Sign up'}</h1>
                    <div className="form-block__toggle-block">
                        <span>{mode === 'login' ? 'Don\'t' : 'Already'} have an account? Click here &#8594;</span>
                        <input id="form-toggler" type="checkbox" onClick={toggleMode} />
                        <label htmlFor="form-toggler"></label>
                    </div>
                </header>
                <LoginForm mode={mode} onSubmit={onSubmit} />
            </section>
        </div>
    );
};

const LoginForm = ({ mode, onSubmit }:any) => (
    <form onSubmit={onSubmit}>
        <div className="form-block__input-wrapper">
            <div className="form-group form-group--login">
                <input
                    className="form-group__input"
                    type="text"
                    id="username"
                    placeholder="user name"
                    disabled={mode === 'signup'}
                />
                <input
                    className="form-group__input"
                    type="password"
                    id="password"
                    placeholder="password"
                    disabled={mode === 'signup'}
                />
            </div>
            <div className="form-group form-group--signup">
                <input
                    className="form-group__input"
                    type="text"
                    id="fullname"
                    placeholder="full name"
                    disabled={mode === 'login'}
                />
                <input
                    className="form-group__input"
                    type="email"
                    id="email"
                    placeholder="email"
                    disabled={mode === 'login'}
                />
                <input
                    className="form-group__input"
                    type="password"
                    id="createpassword"
                    placeholder="password"
                    disabled={mode === 'login'}
                />
                <input
                    className="form-group__input"
                    type="password"
                    id="repeatpassword"
                    placeholder="repeat password"
                    disabled={mode === 'login'}
                />
            </div>
        </div>
        <button className="button button--primary full-width" type="submit">
            {mode === 'login' ? 'Log In' : 'Sign Up'}
        </button>
    </form>
);

export default Login;
