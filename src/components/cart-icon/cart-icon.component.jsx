import React from "react";
import { useContext } from "react";
import { ReactComponent as ShoppingIcon } from "../../assets/shopping-bag.svg";
import { CartContext } from "../../contexts/cart.context";
import "./cart-icon.styles.scss";

const CartIcon = () => {
  const { cartCount, isCartOpen, setisCartOpen } = useContext(CartContext);
  const toglleisCartOpen = () => setisCartOpen(!isCartOpen);

  return (
    <div className="cart-icon-container" onClick={toglleisCartOpen}>
      <ShoppingIcon className="shopping-icon" />
      <span className="item-count">{cartCount}</span>
    </div>
  );
};

export default CartIcon;
