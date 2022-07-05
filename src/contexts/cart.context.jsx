import { useState } from "react";
import { createContext } from "react";

export const CartContext = createContext({
  isCartOpen: false,
  setIsCartOpen: () => {},
});

export const CartProvider = ({ children }) => {
  const [isCartOpen, setisCartOpen] = useState(false);
  const value = { isCartOpen, setisCartOpen };
  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
