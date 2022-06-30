import React from "react";
import {
  createUserDocumentFromAuth,
  signInWithGooglePopup,
} from "../../utils/firebase/firebase.utils";

const SignIn = () => {
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
    </div>
  );
};

export default SignIn;
