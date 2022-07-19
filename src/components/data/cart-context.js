import React, { useReducer, useState } from "react";
import dispatch from "./dispatch";

const CartContext = React.createContext({
  orders: [{ id: "", name: "", price: 0, count: 0 }],
  addToOrderList: (order) => {},
  totalAmount: 0,
  totalPrice: 0,
  fixTotalAmount: (count) => {},
  fixTotalPrice: (price) => {},
  editOrder: (id, count) => {},
  reset: () => {},
});

export function CartContextProvider(props) {
  const [orders, dispatchOrders] = useReducer(dispatch, []);

  const [totalAmount, setTotalAmount] = useState(+0);
  const [totalPrice, setTotalPrice] = useState(+0);

  function addToOrderList(order) {
    dispatchOrders({ type: "ADD", order: order });
    fixTotalAmount(Number(order.count));
    fixTotalPrice(Number(order.price) * Number(order.count));
  }

  function editOrder(id, count) {
    dispatchOrders({
      type: "EDIT",
      id: id,
      count: count,
      fixTotalAmount: fixTotalAmount,
      fixTotalPrice: fixTotalPrice,
    });
  }

  function fixTotalAmount(count) {
    setTotalAmount((prevState) => {
      if (Number(prevState) + Number(count) <= 0) return Number(0);
      return Number(prevState) + Number(count);
    });
  }

  function fixTotalPrice(price) {
    setTotalPrice((prevState) => {
      if (Number(prevState) + Number(price) <= 0) return Number(0);
      return +(Number(prevState) + Number(price)).toFixed(2);
    });
  }

  function reset() {
    dispatchOrders({ type: "RESET" });
    setTotalAmount(Number(0));
    setTotalPrice(Number(0));
  }

  return (
    <CartContext.Provider
      value={{
        orders: orders,
        addToOrderList: addToOrderList,
        totalAmount: totalAmount,
        totalPrice: totalPrice,
        fixTotalPrice: fixTotalPrice,
        fixTotalAmount: fixTotalAmount,
        editOrder: editOrder,
        reset: reset,
      }}
    >
      {props.children}
    </CartContext.Provider>
  );
}

export default CartContext;
