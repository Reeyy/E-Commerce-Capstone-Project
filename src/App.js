import React from "react";
import { Home } from "./routes/home/home.component";
import { Routes, Route } from "react-router-dom";
import Navgation from "./routes/navigation/Navgation";
import SignIn from "./routes/sign-in/SignIn";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Navgation />}>
        <Route index element={<Home />} />
        <Route path="sign-in" element={<SignIn />} />
      </Route>
    </Routes>
  );
};

export default App;
