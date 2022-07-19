import React, { useRef, useState } from "react";
import classes from "./Checkout.module.css";

function Checkout(props) {
  const [formInputValidity, setFormInputValidity] = useState({
    name: true,
    street: true,
    city: true,
    postal: true,
  });

  const nameInputRef = useRef();
  const streetInputRef = useRef();
  const postalInputRef = useRef();
  const cityInputRef = useRef();

  function isEmpty(value) {
    return value.trim() === "";
  }

  function isFiveChar(value) {
    return value.trim().length === 5;
  }

  function submitHandler(e) {
    e.preventDefault();
    const enteredName = nameInputRef.current.value;
    const enteredStreet = streetInputRef.current.value;
    const enteredPostal = postalInputRef.current.value;
    const enteredCity = cityInputRef.current.value;

    const enteredNameIsValid = !isEmpty(enteredName);
    const enteredStreetIsValid = !isEmpty(enteredStreet);
    const enteredPostalIsValid = isFiveChar(enteredPostal);
    const enteredCityIsValid = !isEmpty(enteredCity);

    setFormInputValidity({
      name: enteredNameIsValid,
      street: enteredStreetIsValid,
      city: enteredCityIsValid,
      postal: enteredPostalIsValid,
    });

    const formIsValid =
      enteredNameIsValid &&
      enteredStreetIsValid &&
      enteredPostalIsValid &&
      enteredCityIsValid;

    if (!formIsValid) {
      return;
    }
    props.onSubmit({
      name: enteredName,
      street: enteredStreet,
      city: enteredCity,
      postal: enteredPostal,
    });
  }

  const nameControlClasses = `${classes.control} ${
    formInputValidity.name ? "" : classes.invalid
  }`;

  const nameControlStreet = `${classes.control} ${
    formInputValidity.street ? "" : classes.invalid
  }`;

  const nameControlPostal = `${classes.control} ${
    formInputValidity.postal ? "" : classes.invalid
  }`;

  const nameControlCity = `${classes.control} ${
    formInputValidity.city ? "" : classes.invalid
  }`;

  return (
    <form onSubmit={submitHandler}>
      <div className={nameControlClasses}>
        <label htmlFor="name">Your name</label>
        <input type="text" id="name" ref={nameInputRef} />
        {!formInputValidity.name && <p>Enter your name</p>}
      </div>
      <div className={nameControlStreet}>
        <label htmlFor="street">Street</label>
        <input type="text" id="street" ref={streetInputRef} />
        {!formInputValidity.street && <p>Enter your street</p>}
      </div>
      <div className={nameControlPostal}>
        <label htmlFor="postal">Postal Code</label>
        <input type="text" id="postal" ref={postalInputRef} />
        {!formInputValidity.postal && (
          <p>Enter your postal code (5 characters long)</p>
        )}
      </div>
      <div className={nameControlCity}>
        <label htmlFor="city">City</label>
        <input type="text" id="city" ref={cityInputRef} />
        {!formInputValidity.city && <p>Enter your city</p>}
      </div>
      <div className={classes.actions}>
        <button type="button" onClick={props.cancelHandler}>
          Cancel
        </button>
        <button type="submit" className={classes.submit}>
          Confirm
        </button>
      </div>
    </form>
  );
}

export default Checkout;
