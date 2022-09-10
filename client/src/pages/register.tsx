import { NextPage } from "next";
import s from "../../styles/Auth.module.css";
import * as Yup from "yup";
import React from "react";
import AuthPageWrapper from "../components/AuthPageWrapper";
import Heading from "../components/Heading";
import Input from "../components/Input";
import Button from "../components/Button";
import { Field, Formik, Form } from "formik";
import { register } from "../features/authSlice";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../store";
const SignupSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Required"),
  password: Yup.string().required("Password is required"),
  passwordRepeat: Yup.string()
    .required("Password is required")
    .oneOf([Yup.ref("password")], "Passwords must match"),
});
const Register: NextPage = () => {
  const dispatch = useDispatch<AppDispatch>();
  return (
    <AuthPageWrapper type="register">
      <>
        <Heading level={2} className={s.heading}>
          Register
        </Heading>
        <Formik
          initialValues={{ email: "", password: "", passwordRepeat: "" }}
          onSubmit={async (values) => {
            const email = values.email;
            const password = values.password;
            dispatch(register({ email, password }));
          }}
          validationSchema={SignupSchema}
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
            <Field
              component={Input}
              classNames={s.input}
              name="passwordRepeat"
              type="password"
              placeholder="repeat password"
            />
            <Button>Go!</Button>
          </Form>
        </Formik>
      </>
    </AuthPageWrapper>
  );
};
export default Register;
