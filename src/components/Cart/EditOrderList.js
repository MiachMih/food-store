import React, { useContext, useState } from "react";
import EditOrder from "./EditOrder";
import CartContext from "../data/cart-context";
import Checkout from "./Checkout";
import cart from "../UI/Cart.module.css";
import classes from "../UI/Modal.module.css";

function Backdrop(props) {
  return <div className={classes.backdrop} onClick={props.onClick} />;
}

function EditOrderList(props) {
  const ctx = useContext(CartContext);
  const [showCheckout, setShowCheckout] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [didSubmit, setDidSubmit] = useState(false);

  function currentHandler() {
    toggleShowCheckout();
  }

  function toggleShowCheckout() {
    setShowCheckout((prevState) => {
      return !prevState;
    });
  }

  const modalActions = (
    <div className={cart.actions}>
      <button className={cart["button--alt"]} onClick={props.handleOnClick}>
        Close
      </button>
      {ctx.totalAmount !== 0 && (
        <button className={cart.button} onClick={currentHandler}>
          Order
        </button>
      )}
    </div>
  );

  const displayCurrentOrders = (
    <ul className={cart["cart-items"]}>
      {ctx.orders.map((order) => {
        return <EditOrder key={order.id} order={order} />;
      })}
    </ul>
  );
  const displayCartInformation = (
    <div className={cart.total}>
      <span>Total Price</span>
      <span>${ctx.totalPrice.toFixed(2)}</span>
    </div>
  );

  async function submitOrderHandler(userInfo) {
    setIsSubmitting(true);
    try {
      const response = await fetch(
        "https://react-http-5141a-default-rtdb.firebaseio.com/orders.json",
        {
          method: "POST",
          body: JSON.stringify({
            user: userInfo,
            orderedItems: ctx.orders,
          }),
        }
      );
      if (!response.ok) {
        throw new Error("Error submitting");
      }
      setDidSubmit(true);
      toggleShowCheckout();
      ctx.reset();
    } catch (error) {
      console.log(error.message);
    }
    setIsSubmitting(false);
  }

  const editOrderList = (
    <>
      {displayCurrentOrders}
      {displayCartInformation}
      {showCheckout && (
        <Checkout
          onSubmit={submitOrderHandler}
          cancelHandler={toggleShowCheckout}
        />
      )}
      {!showCheckout && modalActions}
    </>
  );

  const submittingModalContent = <p>Sending order data...</p>;
  const didSubmitModalContent = (
    <React.Fragment>
      <p>Successfully sent the order</p>
      <div className={cart.actions}>
        <button
          className={cart["button--alt"]}
          onClick={() => {
            setDidSubmit(false);
          }}
        >
          Confirm
        </button>
      </div>
    </React.Fragment>
  );

  return (
    <React.Fragment>
      <Backdrop onClick={props.handleOnClick} />
      <div className={classes.modal}>
        <div className={classes.content}>
          {!isSubmitting && !didSubmit && editOrderList}
          {isSubmitting && submittingModalContent}
          {!isSubmitting && didSubmit && didSubmitModalContent}
        </div>
      </div>
    </React.Fragment>
  );
}

export default EditOrderList;
