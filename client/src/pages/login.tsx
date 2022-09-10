import { NextPage } from "next";
import s from "../../styles/Auth.module.css";
import * as Yup from "yup";
import React from "react";
import AuthPageWrapper from "../components/AuthPageWrapper";
import Heading from "../components/Heading";
import { login } from "../features/authSlice";
import Input from "../components/Input";
import Button from "../components/Button";
import { Field, Formik, Form } from "formik";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../store";
const SignipSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Required"),
  password: Yup.string().required("Password is required"),
});
const Login: NextPage = () => {
  const dispatch = useDispatch<AppDispatch>();
  return (
    <AuthPageWrapper type="login">
      <>
        <Heading level={2} className={s.heading}>
          Login
        </Heading>
        <Formik
          initialValues={{ email: "", password: "" }}
          onSubmit={(values, actions) => {
            const email = values.email;
            const password = values.password;
            dispatch(login({ email, password }));
          }}
          validationSchema={SignipSchema}
        >
          <Form className="form">
            <Field
              component={Input}
              classNames={s.input}
              name="email"
              placeholder="email"
            />
            <Field
              component={Input}
              classNames={s.input}
              name="password"
              type="password"
              placeholder="password"
            />
            <Button>Go!</Button>
          </Form>
        </Formik>
      </>
    </AuthPageWrapper>
  );
};
export default Login;
