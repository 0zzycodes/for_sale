import React from "react";
import PaystackButton from "react-paystack";
import { paystackKeys } from "../../../configs/apiKeys";

import "./styles.scss";

const PayWithPaystack = ({ getReference, amount }) => {
  const callback = (response) => {
    console.log(response);
  };

  const close = () => {
    console.log("Payment closed");
  };
  return (
    <div>
      <PaystackButton
        text="Pay Now"
        className="payButton"
        callback={callback}
        close={close}
        disabled={false} /*disable payment button*/
        embed={false} /*payment embed in your app instead of a pop up*/
        reference={getReference}
        email={"test@test.com"}
        amount={amount}
        paystackkey={paystackKeys.public}
        tag="button" /*it can be button or a or input tag */
      />
    </div>
  );
};

export default PayWithPaystack;
