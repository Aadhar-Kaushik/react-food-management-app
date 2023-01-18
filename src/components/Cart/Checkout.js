import { useRef, useState } from 'react';
import classes from './Checkout.module.css';

const Checkout = (props) => {
  const [formValidity, setFormValidity] = useState({
    nameIsValid: true,
    streetIsValid: true,
    postalCodeIsValid: true,
    cityIsValid: true
  })
  const nameRef = useRef("")
  const streetRef = useRef("")
  const postalCodeRef = useRef("")
  const cityRef = useRef("")

  const isEmpty = str => str.trim() === ""
  const hasSixChar = str => str.trim().length === 6

  const confirmHandler = (event) => {
    event.preventDefault();
    const enteredName = nameRef.current.value
    const enteredStreet = streetRef.current.value
    const enteredPostalCode = postalCodeRef.current.value
    const enteredCity = cityRef.current.value

    const nameIsValid = !isEmpty(enteredName)
    const streetIsValid = !isEmpty(enteredStreet)
    const cityIsValid = !isEmpty(enteredCity)

    const postalCodeIsValid = hasSixChar(enteredPostalCode)
    const formIsValid= nameIsValid && streetIsValid && cityIsValid && postalCodeIsValid

    
    setFormValidity({
      nameIsValid,
      streetIsValid,
      postalCodeIsValid,
      cityIsValid
    })
    if(!formIsValid){
      return
    }
    props.onConfirm({							
      name:enteredName,
      street:enteredStreet,
      city:enteredCity,
      postalCode:enteredPostalCode
    })
  };

  const nameClass=`${classes.control} ${formValidity.nameIsValid?"":classes.invalid}`
  const streetClass=`${classes.control} ${formValidity.streetIsValid?"":classes.invalid}`
  const postalClass=`${classes.control} ${formValidity.postalCodeIsValid?"":classes.invalid}`
  const cityClass=`${classes.control} ${formValidity.cityIsValid?"":classes.invalid}`

  return (
    <form className={classes.form} onSubmit={confirmHandler}>
      <div className={nameClass}>
        <label htmlFor='name'>Your Name</label>
        <input type='text' id='name' ref={nameRef} />
        {!formValidity.nameIsValid && <p>Please Enter a Valid Name!</p>}
      </div>
      <div className={streetClass}>
        <label htmlFor='street'>Street</label>
        <input type='text' id='street' ref={streetRef} />
        {!formValidity.streetIsValid && <p>Please Enter a Valid Street!</p>}
      </div>
      <div className={postalClass}>
        <label htmlFor='postal'>Postal Code</label>
        <input type='text' id='postal' ref={postalCodeRef} />
        {!formValidity.postalCodeIsValid && <p>Please Enter a Valid Postal Code!</p>}
      </div>
      <div className={cityClass}>
        <label htmlFor='city'>City</label>
        <input type='text' id='city' ref={cityRef} />
        {!formValidity.cityIsValid && <p>Please Enter a Valid City!</p>}
      </div>
      <div className={classes.actions}>
        <button type='button' onClick={props.onCancel}>
          Cancel
        </button>
        <button className={classes.submit}>Confirm</button>
      </div>
    </form>
  );
};

export default Checkout;
