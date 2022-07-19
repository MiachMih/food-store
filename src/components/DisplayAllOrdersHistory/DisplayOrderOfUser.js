import React from "react";
import classes from "../UI/CartItem.module.css";

function DisplayOrderOfUser(props) {
  const { name, price, count } = props;
  return (
    <div>
      <h2>{name}</h2>
      <div className={classes.summary}>
        <span className={classes.price}>{price}</span>
        <span className={classes.amount}>{count}</span>
      </div>
    </div>
  );
}

export default DisplayOrderOfUser;
