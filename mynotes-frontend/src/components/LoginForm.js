import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { IoMdKey, IoMdPerson } from "react-icons/io";
import { MdLogin } from "react-icons/md";
import { login } from "../features/auth/authSlice";
import Button from "./Button";
import Input from "./Input";

const LoginForm = () => {
  const dispatch = useDispatch();

  const [loginFormData, setLoginFormData] = useState({
    providedUserName: "",
    providedPassword: "",
  });

  const { providedUserName, providedPassword } = loginFormData;

  const handleLoginFormDataChange = (e) => {
    setLoginFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const onLoginSubmit = (e) => {
    e.preventDefault();
    const declaredUser = { providedUserName, providedPassword };
    dispatch(login(declaredUser));
  };

  const setPlaceholderStyle = (inputName) => {
    if (inputName) return "placeholder-hidden";
    return "input-placeholder input-placeholder--aligned";
  };

  return (
    <form onSubmit={onLoginSubmit}>
      <div className="service-form-field service-form-field--continuing">
        <Input
          componentStyle="input-component input-component--full-size"
          icon={<IoMdPerson className="icon icon--left" />}
          name="providedUserName"
          onChange={handleLoginFormDataChange}
          placeholderStyle={setPlaceholderStyle(providedUserName)}
          placeholderText="USERNAME"
          type="text"
          value={providedUserName}
        />
      </div>
      <div className="service-form-field service-form-field--ending">
        <Input
          componentStyle="input-component input-component--full-size"
          icon={<IoMdKey className="icon icon--left" />}
          name="providedPassword"
          onChange={handleLoginFormDataChange}
          placeholderStyle={setPlaceholderStyle(providedPassword)}
          placeholderText="PASSWORD"
          type="password"
          value={providedPassword}
        />
        <Button
          componentStyle="btn btn--right btn--small"
          icon={<MdLogin className="icon icon--right" />}
          lableStyle="btn-orientation-right"
          title="SIGN IN"
          type="submit"
        />
      </div>
    </form>
  );
};

export default LoginForm;
