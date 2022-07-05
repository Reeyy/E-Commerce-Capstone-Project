import React from "react";
import { Home } from "./routes/home/home.component";
import { Routes, Route } from "react-router-dom";
import Navgation from "./routes/navigation/Navgation";
import Authentication from "./routes/authentication/authentication.component";
import Shop from "./routes/shop/shop.component";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Navgation />}>
        <Route index element={<Home />} />
        <Route path="shop" element={<Shop />} />
        <Route path="auth" element={<Authentication />} />
      </Route>
    </Routes>
  );
};

export default App;
