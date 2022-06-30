import React, { useEffect } from "react";
import { getRedirectResult } from "firebase/auth";
import {
  auth,
  createUserDocumentFromAuth,
  signInWithGooglePopup,
  signInWithGoogleRedirect,
} from "../../utils/firebase/firebase.utils";
import SignUpForm from "../../components/sing-up-form/sign-up-form.component";

const Redirect = async () => {
  const respone = await getRedirectResult(auth);
  if (respone) {
    const userDocRef = await createUserDocumentFromAuth(respone.user);
  }
  console.log(respone);
};
const SignIn = () => {
  useEffect(() => {
    Redirect();
  }, []);

  const logGoogleUser = async () => {
    const respone = await signInWithGooglePopup();
    console.log(respone);
    const userDocRef = await createUserDocumentFromAuth(respone.user);

    //! w/Destructuring
    // const {user} = await signInWithGooglePopup();
    // createUserDocumentFromAuth(user);
  };

  return (
    <div>
      <h1>SignIn</h1>
      <button onClick={logGoogleUser}>Sigin with google popup</button>
      <button onClick={signInWithGoogleRedirect}>
        Sigin with google Redirect
      </button>
      <SignUpForm />
    </div>
  );
};

export default SignIn;
