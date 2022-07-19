import React, { useState, useContext, useEffect } from "react";
import ReactDOM from "react-dom";
import EditOrderList from "./EditOrderList";
import CartContext from "../data/cart-context";
import classes from "../UI/HeaderCartButton.module.css";
import CartIcon from "./CartIcon";

function Cart() {
  const [isDisplayed, setIsDisplayed] = useState(false);
  const [btnIsHighlighted, setBtnIsHighlighted] = useState(false);
  const ctx = useContext(CartContext);

  function handleOnClick() {
    setIsDisplayed((prevState) => {
      return !prevState;
    });
  }

  const btnClasses = `${classes.button} ${
    btnIsHighlighted ? classes.bump : ""
  }`;

  useEffect(() => {
    setBtnIsHighlighted(true);
    const timer = setTimeout(() => {
      setBtnIsHighlighted(false);
    }, 300);
    return () => {
      clearTimeout(timer);
    };
  }, [ctx.totalAmount]);

  return (
    <>
      {isDisplayed && (
        <React.Fragment>
          {ReactDOM.createPortal(
            <EditOrderList handleOnClick={handleOnClick} />,
            document.getElementById("editOrder-Modal-root")
          )}
        </React.Fragment>
      )}
      <button className={btnClasses} onClick={handleOnClick}>
        <span className={classes.icon}>
          <CartIcon />
        </span>
        <span>Your Cart</span>
        <span className={classes.badge}>{ctx.totalAmount}</span>
      </button>
    </>
  );
}

export default Cart;
