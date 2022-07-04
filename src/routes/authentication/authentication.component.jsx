import React, { useEffect } from "react";
import { getRedirectResult } from "firebase/auth";
import {
  auth,
  createUserDocumentFromAuth,
  signInWithGooglePopup,
} from "../../utils/firebase/firebase.utils";
import "./authentication.styles.scss";
import SignUpForm from "../../components/sign-up-form/sign-up-form.component";
import SignInForm from "../../components/sign-in-form/sign-in-form.component";

const Redirect = async () => {
  const respone = await getRedirectResult(auth);
  if (respone) {
    const userDocRef = await createUserDocumentFromAuth(respone.user);
  }
  // console.log(respone);
};
const Authentication = () => {
  useEffect(() => {
    Redirect();
  }, []);

  const logGoogleUser = async () => {
    const respone = await signInWithGooglePopup();
    // console.log(respone);
    const userDocRef = await createUserDocumentFromAuth(respone.user);

    //! w/Destructuring
    // const {user} = await signInWithGooglePopup();
    // createUserDocumentFromAuth(user);
  };

  return (
    <div className="authentication-container">
      <SignInForm />
      <SignUpForm />
    </div>
  );
};

export default Authentication;
