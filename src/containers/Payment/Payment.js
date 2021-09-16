import React, {Component} from "react";
// import ReactDOM from "react-dom";
import StripeCheckout from "react-stripe-checkout";
import axios from "axios";
import { toast } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";
import classes from "./Payment.css";

toast.configure();

function Payment() {
  const [product] = React.useState({
    name: "Tesla Roadster",
    price: 64998.67,
    description: "Cool car"
  });

  async function handleToken(token, addresses) {
    const response = await axios.post(
      "https://g67bn.sse.codesandbox.io/checkout",
      { token, product }
    );
    const { status } = response.data;
    console.log("Response:", response.data);
    if (status === "success") {
      toast("Success! Check email for details", { type: "success" });
    } else {
      toast("Something went wrong", { type: "error" });
    }
  }

  return (
    <div className={classes.Wrapper}>
      <div className={classes.Container}>
        <div className={classes.Product}>
          <h1>{product.name}</h1>
          <h3>On Sale · ${product.price}</h3>
        </div>
        <StripeCheckout
          stripeKey="pk_test_51IEU7MGonuADJZ7cFx6UjQZaK0ovPl5ZppJh7qlUk2WJNRkonRkjINqPJv3ykdApWlVbkiHUQKTEypSFkmYsR7oR001lz3hL96"
          token={handleToken}
          amount={product.price * 100}
          name="Tesla Roadster"
          billingAddress
          shippingAddress
        />
    </div>
    </div>
  );
}

export default Payment;
