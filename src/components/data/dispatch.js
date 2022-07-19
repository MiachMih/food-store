function dispatch(state, action) {
  if (action.type === "ADD") {
    let checkingOrder = state.filter((order) => order.id === action.order.id);
    if (Object(checkingOrder).length !== 0) {
      let orders = state.map((order) => {
        return { ...order };
      });
      orders.find((order) => order.id === action.order.id).count =
        Number(orders.find((order) => order.id === action.order.id).count) +
        Number(action.order.count);
      return orders;
    }
    return [...state, action.order];
  }

  if (action.type === "EDIT") {
    let orders = state.map((order) => {
      return { ...order };
    });
    const oldCount = orders.find((order) => order.id === action.id).count;
    orders.find((order) => order.id === action.id).count =
      Number(orders.find((order) => order.id === action.id).count) +
      Number(action.count);
    if (orders.find((order) => order.id === action.id).count <= 0) {
      action.fixTotalAmount(Number(-1 * Number(oldCount)));
      action.fixTotalPrice(
        Number(orders.find((order) => order.id === action.id).price) *
          Number(-oldCount)
      );
      return orders.filter((order) => order.id !== action.id);
    }
    const newCount =
      orders.find((order) => order.id === action.id).count - oldCount;
    action.fixTotalAmount(Number(newCount));
    action.fixTotalPrice(
      Number(orders.find((order) => order.id === action.id).price) *
        Number(newCount)
    );
    return orders;
  }

  if (action.type === "RESET") {
    return [];
  }
}

export default dispatch;
