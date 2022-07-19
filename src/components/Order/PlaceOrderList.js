import React, { useEffect, useState } from "react";
//import list from "../data/data";
import Order from "./Order";
import classes from "../UI/AvailableMeals.module.css";
import card from "../UI/Card.module.css";

function PlaceOrderList() {
  const [meals, setMeals] = useState([]);
  const [isLoading, setLoading] = useState(false);
  const [httpError, setHTTPError] = useState();

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      const response = await fetch(
        "https://react-http-5141a-default-rtdb.firebaseio.com/meals.json"
      );
      if (!response.ok) {
        throw new Error("something went wrong");
      }
      const data = await response.json();
      let MEALS = [];
      Object.keys(data).forEach((key) => {
        const obj = {
          id: key,
          name: data[key].name,
          description: data[key].description,
          price: data[key].price,
        };
        MEALS.push(obj);
      });
      setMeals((prevState) => {
        return [...prevState, ...MEALS];
      });
      setLoading(false);
    }
    fetchData().catch((error) => {
      setLoading(false);
      setHTTPError(error.message);
    });
  }, []);

  if (isLoading) {
    return (
      <section className={classes.mealsLoading}>
        <p>Loading...</p>
      </section>
    );
  }

  if (httpError) {
    return (
      <section className={classes.mealsError}>
        <p>Error...</p>
      </section>
    );
  }

  return (
    <section className={classes.meals}>
      <div className={card.card}>
        <ul>
          {meals.map((order) => {
            return (
              <Order
                key={order.id}
                id={order.id}
                name={order.name}
                description={order.description}
                price={order.price}
              />
            );
          })}
        </ul>
      </div>
    </section>
  );
}

export default PlaceOrderList;
