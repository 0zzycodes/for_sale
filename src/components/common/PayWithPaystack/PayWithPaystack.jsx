import React from "react";
import { usePaystackPayment } from "react-paystack";
import { paystackKeys } from "../../../configs/apiKeys";

import "./styles.scss";

const PayWithPaystack = ({ amount, setStep, setCompleted }) => {
  const config = {
    reference: new Date().getTime(),
    email: "user@example.com",
    amount: amount * 100,
    publicKey: paystackKeys.public,
  };
  const initializePayment = usePaystackPayment(config);

  const onSuccess = (reference) => {
    setCompleted(true);
    setStep(4);
  };

  const onClose = () => {
    console.log("closed");
  };
  return (
    <div>
      <button
        className="btn pay-now-btn"
        onClick={() => {
          initializePayment(onSuccess, onClose);
        }}
      >
        Pay Now
      </button>
    </div>
  );
};

export default PayWithPaystack;
