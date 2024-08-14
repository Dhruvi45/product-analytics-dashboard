import React, { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { Container, Form, Button, Row, Col, Card } from "react-bootstrap";
import "../css/auth.css";

interface LoginFormInputs {
  email: string;
  password: string;
  fullname?: string;
  repeatpassword?: string;
}

const initialMode = "signup";

const Login: React.FC = () => {
  const [mode, setMode] = useState(initialMode);
  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
    clearErrors
  } = useForm<LoginFormInputs>();

  const toggleMode = () => {
    clearErrors();
    setMode(mode === "login" ? "signup" : "login");
  };

  const onSubmit: SubmitHandler<LoginFormInputs> = (data) => {
    console.log("Form Data:", data);
  };

  return (
    <div>
      <div
        className={`form-block-wrapper form-block-wrapper--is-login`}
      ></div>
      <section className={`form-block form-block--is-${mode}`}>
        <header className="form-block__header">
          <h1>{mode === "login" ? "Welcome back!" : "Sign up"}</h1>
          <div className="form-block__toggle-block">
            <span>
              {mode === "login" ? "Don't" : "Already"} have an account? Click
              here &#8594;
            </span>
            <input id="form-toggler" type="checkbox" onClick={toggleMode} />
            <label htmlFor="form-toggler"></label>
          </div>
        </header>
        <LoginForm
          mode={mode}
          onSubmit={handleSubmit(onSubmit)}
          register={register}
          errors={errors}
          getValues={getValues}
        />
      </section>
    </div>
  );
};

const LoginForm: React.FC<{
  mode: string;
  onSubmit: any;
  register: any;
  errors: any;
  getValues: any;
}> = ({ mode, onSubmit, register, errors, getValues }) => (
  <form onSubmit={onSubmit}>
    <div className="form-block__input-wrapper">
      <div className={`form-group form-group--login`}>
        {mode === "login" ? (
          <>
            <div className="textfield">
              <input
                className="form-group__input"
                type="email"
                id="email"
                placeholder="Email"
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^\S+@\S+$/i,
                    message: "Invalid email address",
                  },
                })}
              />
              <p className="error invalid-feedback d-block h-30">
                <span className="text-danger">
                  {errors.email && errors.email.message}
                </span>
              </p>
            </div>
            <div className="textfield">
              <input
                className="form-group__input"
                type="password"
                id="password"
                placeholder="Password"
                {...register("password", { required: "Password is required" })}
              />
              <p className="error invalid-feedback d-block h-30">
                <span className="text-danger">
                  {errors.password && errors.password.message}
                </span>
              </p>
            </div>
          </>
        ) : (
          <>
            <div className="textfield">
              <input
                className="form-group__input"
                type="text"
                id="fullname"
                placeholder="Full Name"
                {...register("fullname", { required: "Full Name is required" })}
              />

              <p className="error invalid-feedback d-block h-30">
                <span className="text-danger">
                  {errors.fullname && errors.fullname.message}
                </span>
              </p>
            </div>
            <div className="textfield">
              <input
                className="form-group__input"
                type="email"
                id="email"
                placeholder="Email"
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^\S+@\S+$/i,
                    message: "Invalid email address",
                  },
                })}
              />
              <p className="error invalid-feedback d-block h-30">
                <span className="text-danger">
                  {errors.email && errors.email.message}
                </span>
              </p>
            </div>
            <div className="textfield">
              <input
                className="form-group__input"
                type="password"
                id="createpassword"
                placeholder="Password"
                {...register("password", { required: "Password is required" })}
              />
              <p className="error invalid-feedback d-block h-30">
                <span className="text-danger">
                  {errors.password && errors.password.message}
                </span>
              </p>
            </div>
            <div className="textfield">
              <input
                className="form-group__input"
                type="password"
                id="repeatpassword"
                placeholder="Repeat Password"
                {...register("repeatpassword", {
                  required: "Please confirm your password",
                  validate: (value: any) =>
                    value === getValues("password") || "Passwords do not match",
                })}
              />
              <p className="error invalid-feedback d-block h-30">
                <span className="text-danger">
                  {errors.repeatpassword && errors.repeatpassword.message}
                </span>
              </p>
            </div>
          </>
        )}
      </div>
    </div>
    <button className="button button--primary full-width" type="submit">
      {mode === "login" ? "Log In" : "Sign Up"}
    </button>
  </form>
);

export default Login;
