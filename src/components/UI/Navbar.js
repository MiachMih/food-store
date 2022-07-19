import React from "react";
import Cart from "../Cart/Cart";
import classes from "./Header.module.css";
import mealsImage from "./meals.jpg";
import DisplayOrdersHistory from "../DisplayAllOrdersHistory/DisplayOrders";

function Navbar() {
  return (
    <React.Fragment>
      <header className={classes.header}>
        <h1>React Meals</h1>
        <DisplayOrdersHistory />
        <Cart />
      </header>
      <div className={classes["main-image"]}>
        <img src={mealsImage} alt="A table full of delicious food!" />
      </div>
    </React.Fragment>
  );
}

export default Navbar;
