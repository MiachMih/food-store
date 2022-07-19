import React from "react";
import classes from "../UI/CartItem.module.css";

function DisplayIndividualUser(props) {
  const { name, street, city, postal } = props.user;
  return (
    <div>
      <h2>Name: {name}</h2>
      <h2>Street: {street}</h2>
      <h2>Postal: {postal}</h2>
      <h2>City: {city}</h2>
    </div>
  );
}

export default DisplayIndividualUser;
