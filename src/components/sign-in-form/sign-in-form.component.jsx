import React, { useState, useContext } from "react";
import { UserContext } from "../../contexts/user.context";
import {
  createUserDocumentFromAuth,
  signInWithGooglePopup,
  signInAuthUserWithEmailAndPassword,
} from "../../utils/firebase/firebase.utils";
import Button from "../button/button.component";
import FormInput from "../form-input/form-input.component";
import "./sign-in-form.style.scss";

//! initial value dari form
const defaultformField = {
  email: "",
  password: "",
};

const SignInForm = () => {
  const { setCurrentUser } = useContext(UserContext);

  const [formFields, setFormFields] = useState(defaultformField);
  //*destructuring the value of form
  const { email, password } = formFields;

  const resetFormFields = () => {
    setFormFields(defaultformField);
  };

  const signInWithGoogle = async () => {
    const respone = await signInWithGooglePopup();
    console.log(respone);
    const userDocRef = await createUserDocumentFromAuth(respone.user);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const respone = await signInAuthUserWithEmailAndPassword(email, password);
      setCurrentUser(respone.user);
      resetFormFields();
    } catch (error) {
      switch (error.code) {
        case "auth/user-not-found":
          alert("User Not Found");
          break;
        case "auth/wrong-password":
          alert("Wrong Password");
          break;

        default:
          console.log(error.code);
      }
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormFields({ ...formFields, [name]: value });
    //* set name value menggnakan [name]:value
  };

  return (
    <div className="sign-up-container">
      <h1>Already have an account?</h1>
      <h2>Sign Up With Your Email And Password</h2>
      <form onSubmit={handleSubmit}>
        <FormInput
          label="Email"
          inputOptions={{
            type: "email",
            required: true,
            onChange: handleChange,
            name: "email",
            value: email,
          }}
        />
        <FormInput
          label="Password"
          inputOptions={{
            type: "password",
            required: true,
            onChange: handleChange,
            name: "password",
            value: password,
          }}
        />
        <div className="buttons-container">
          <Button buttonType=" inverted" type="submit">
            Sign In
          </Button>
          <Button type="button" onClick={signInWithGoogle} buttonType="google">
            Google
          </Button>
        </div>
      </form>
    </div>
  );
};

export default SignInForm;
