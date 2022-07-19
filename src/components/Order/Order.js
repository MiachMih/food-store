import React, { useContext, useState } from "react";
import CartContext from "../data/cart-context";
import classes from "../UI/MealItem.module.css";
import form from "../UI/MealItemForm.module.css";
import input from "../UI/Input.module.css";

function Order(props) {
  const [amount, setAmount] = useState(1);

  const ctx = useContext(CartContext);

  function changeHandler(e) {
    let val = e.target.value;
    if (val <= 0) {
      val = 1;
    }
    if (val > 5) {
      val = 5;
    }
    setAmount(Number(val).toFixed(0));
  }

  function clickHandler(e) {
    e.preventDefault();
    const order = {
      id: props.id,
      name: props.name,
      price: props.price,
      count: amount,
    };
    ctx.addToOrderList(order);
  }

  return (
    <li className={classes.meal}>
      <div>
        <h3>{props.name}</h3>
        <div className={classes.description}>{props.description}</div>
        <div className={classes.price}>${props.price}</div>
      </div>
      <div>
        <form className={form.form} onSubmit={clickHandler}>
          <div className={input.input}>
            <label htmlFor={props.id}>Amount</label>
            <input
              type="number"
              value={amount}
              onChange={(e) => changeHandler(e)}
            />
          </div>
          <button type="submit">Add</button>
        </form>
      </div>
    </li>
  );
}

export default Order;
