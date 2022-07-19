import React from "react";
import DisplayIndividualUser from "./DisplayIndividualUser";
import DisplayOrderOfUser from "./DisplayOrderOfUser";
import classes from "../UI/CartItem.module.css";

function IndividualDisplay(props) {
  const displayOrders = props.orders.map((order) => {
    return (
      <li className={classes["cart-item"]}>
        <DisplayOrderOfUser
          key={Math.random()}
          name={order.name}
          count={order.count}
          price={order.price}
        />
      </li>
    );
  });

  return (
    <React.Fragment>
      <li className={classes["cart-item"]}>
        <ul>{displayOrders}</ul>
        <DisplayIndividualUser key={Math.random()} user={props.user} />
      </li>
    </React.Fragment>
  );
}

export default IndividualDisplay;
