import React, { useState } from "react";
import IndividualDisplay from "./IndividualDisplay";
import cart from "../UI/Cart.module.css";
import classes from "../UI/Modal.module.css";
import btn from "../UI/HeaderCartButton.module.css";

function DisplayOrders() {
  const [isDisplayed, setIsDisplayed] = useState(false);
  const [fullHistory, setFullHistory] = useState({});

  function toggleDisplay() {
    setIsDisplayed((prevState) => {
      return !prevState;
    });
  }

  async function clickHandler() {
    try {
      const reponse = await fetch(
        "https://react-http-5141a-default-rtdb.firebaseio.com/orders.json"
      );
      if (!reponse.ok) {
        throw new Error("Something went wrong");
      }
      const data = await reponse.json();
      setFullHistory(data);
      toggleDisplay();
    } catch (error) {
      console.log(error.message);
    }
  }

  let history = [];
  Object.keys(fullHistory).forEach((key) => {
    history = [...history, { id: key, content: fullHistory[key] }];
  });

  const displayItems = history.map((item) => {
    return (
      <IndividualDisplay
        key={item.id}
        orders={item.content.orderedItems}
        user={item.content.user}
      />
    );
  });

  const wrap = (
    <React.Fragment>
      <div className={classes.backdrop} onClick={toggleDisplay} />
      <div className={classes.modal}>
        <div className={classes.content}>
          <ul className={cart["cart-items"]}>{displayItems}</ul>
          <div className={cart.actions}>
            <button className={cart["button--alt"]} onClick={toggleDisplay}>
              Close
            </button>
          </div>
        </div>
      </div>
    </React.Fragment>
  );

  return (
    <React.Fragment>
      {isDisplayed && wrap}
      <button className={btn.button} onClick={clickHandler}>
        DisplayOrders
      </button>
    </React.Fragment>
  );
}

export default DisplayOrders;
