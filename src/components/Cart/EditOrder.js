import React, { useContext, useState } from "react";
import CartContext from "../data/cart-context";
import classes from "../UI/CartItem.module.css";

function EditOrder(props) {
  const { id, name, price, count } = props.order;
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

  function subtractHandler(e) {
    e.preventDefault();
    ctx.editOrder(id, -1 * Number(amount));
  }

  function addHandler(e) {
    e.preventDefault();
    ctx.editOrder(id, Number(amount));
  }

  return (
    <li className={classes["cart-item"]}>
      <div>
        <h2>{name}</h2>
        <div className={classes.summary}>
          <span className={classes.price}>{price}</span>
          <span className={classes.amount}>{count}</span>
        </div>
      </div>
      <div className={classes.actions}>
        <button type="submit" onClick={subtractHandler}>
          -
        </button>
        <input
          className={classes.amount}
          type="number"
          value={amount}
          onChange={changeHandler}
        />
        <button type="submit" onClick={addHandler}>
          +
        </button>
      </div>
    </li>
  );
}

export default EditOrder;
