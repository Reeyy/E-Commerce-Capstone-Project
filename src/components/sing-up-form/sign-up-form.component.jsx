import React, { useState } from "react";
import {
  createAuthUserWithEmailAndPassword,
  createUserDocumentFromAuth,
} from "../../utils/firebase/firebase.utils";

import FormInput from "../form-input/form-input.component";

//! initial value dari form
const defaultformField = {
  displayName: "",
  email: "",
  password: "",
  confirmPassword: "",
};
const SignUpForm = () => {
  const [formFields, setFormFields] = useState(defaultformField);
  //*destructuring the value of form
  const { displayName, email, password, confirmPassword } = formFields;

  const resetFormFields = () => {
    setFormFields(defaultformField);
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormFields({ ...formFields, [name]: value });
    //* set name value menggnakan [name]:value
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (password !== confirmPassword) {
      alert("password do not match");
      return;
    }
    try {
      const respone = await createAuthUserWithEmailAndPassword(email, password);
      console.log(respone);
      await createUserDocumentFromAuth(respone.user, { displayName });
      resetFormFields();
    } catch (error) {
      if (error.code === "auth/email-already-in-use") {
        alert("Email already in use");
      } else {
        console.log(error);
      }
    }
  };

  return (
    <div>
      <h1>Sign Up With Your Email And Password</h1>
      <form onSubmit={handleSubmit}>
        <FormInput
          label="Display Name"
          inputOptions={{
            type: "text",
            required: true,
            onChange: handleChange,
            name: "displayName",
            value: displayName,
          }}
        />
        <FormInput
          label="Email"
          inputOptions={{
            type: "text",
            required: true,
            onChange: handleChange,
            name: "email",
            value: email,
          }}
        />
        <FormInput
          label="Password"
          inputOptions={{
            type: "text",
            required: true,
            onChange: handleChange,
            name: "password",
            value: password,
          }}
        />
        <FormInput
          label="Password Confrimation"
          inputOptions={{
            type: "text",
            required: true,
            onChange: handleChange,
            name: "confirmPassword",
            value: confirmPassword,
          }}
        />

        <button type="submit">Sign up</button>
      </form>
    </div>
  );
};

export default SignUpForm;
