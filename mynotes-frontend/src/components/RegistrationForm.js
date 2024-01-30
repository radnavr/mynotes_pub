import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { IoMdKey, IoMdMail, IoMdPerson } from "react-icons/io";
import { PiStampFill } from "react-icons/pi";
import { register, throwAuthError } from "../features/auth/authSlice";
import Button from "./Button";
import Input from "./Input";

function RegistrationForm() {
  const dispatch = useDispatch();

  const [registrationFormData, setRegistrationFormData] = useState({
    providedUserName: "",
    providedEmail: "",
    providedPassword: "",
    providedPassword2: "",
  });

  const {
    providedUserName,
    providedEmail,
    providedPassword,
    providedPassword2,
  } = registrationFormData;

  const handleRegistrationFormDataChange = (e) => {
    setRegistrationFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const onRegistrationSubmit = (e) => {
    e.preventDefault();
    if (providedPassword !== providedPassword2) {
      dispatch(throwAuthError("passwords doesn't match"));
    } else {
      const newUser = {
        providedUserName,
        providedEmail,
        providedPassword,
      };
      dispatch(register(newUser));
    }
  };

  const setPlaceholderStyle = (inputName) => {
    if (inputName) return "placeholder-hidden";
    return "input-placeholder input-placeholder--aligned";
  };

  return (
    <form onSubmit={onRegistrationSubmit}>
      <div className="service-form-field service-form-field--continuing">
        <Input
          componentStyle="input-component input-component--full-size"
          icon={<IoMdPerson className="icon icon--left" />}
          name="providedUserName"
          onChange={handleRegistrationFormDataChange}
          placeholderStyle={setPlaceholderStyle(providedUserName)}
          placeholderText="USERNAME"
          type="text"
        />
      </div>
      <div className="service-form-field service-form-field--continuing">
        <Input
          componentStyle="input-component input-component--full-size"
          icon={<IoMdKey className="icon icon--left" />}
          name="providedPassword"
          onChange={handleRegistrationFormDataChange}
          placeholderStyle={setPlaceholderStyle(providedPassword)}
          placeholderText="PASSWORD"
          type="password"
        />
      </div>
      <div className="service-form-field service-form-field--continuing">
        <Input
          componentStyle="input-component input-component--full-size"
          icon={<IoMdKey className="icon icon--left" />}
          name="providedPassword2"
          onChange={handleRegistrationFormDataChange}
          placeholderStyle={setPlaceholderStyle(providedPassword2)}
          placeholderText="CONFIRM PASSWORD"
          type="password"
        />
      </div>
      <div className="service-form-field service-form-field--ending">
        <Input
          componentStyle="input-component input-component--full-size"
          icon={<IoMdMail className="icon icon--left" />}
          name="providedEmail"
          onChange={handleRegistrationFormDataChange}
          placeholderStyle={setPlaceholderStyle(providedEmail)}
          placeholderText="E-MAIL"
          type="email"
        />
        <Button
          componentStyle="btn btn--right btn--small"
          icon={<PiStampFill className="icon icon--right" />}
          lableStyle="btn-orientation-right"
          title="SIGN UP"
          type="submit"
        />
      </div>
    </form>
  );
}

export default RegistrationForm;
