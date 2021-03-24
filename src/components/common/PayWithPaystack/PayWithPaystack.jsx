import React from "react";
import { usePaystackPayment } from "react-paystack";
import { useSelector } from "react-redux";
import { paystackKeys } from "../../../configs/apiKeys";
import { firestore } from "../../../firebase/config";
import { AddMonths } from "../../../utils/helper";

import "./styles.scss";

const PayWithPaystack = ({
  amount,
  setStep,
  setCompleted,
  setLoading,
  plan,
}) => {
  const currentUser = useSelector(({ user }) => user.currentUser);
  const config = {
    reference: new Date().getTime(),
    email: "user@example.com",
    amount: amount * 100,
    publicKey: paystackKeys.public,
  };
  const initializePayment = usePaystackPayment(config);

  const onSuccess = (reference) => {
    // TODO: Send request to subscribe endpoint with type payload
    setLoading(true);
    const userRef = firestore.doc(`users/${currentUser.id}`);
    userRef.update({
      hasSubcribedBefore: true,
      isSubscribed: true,
      plan: plan,
      lastSubDate: Date.now(),
      latestSubRef: reference,
      // TODO: Diffirent expire date
      subExpireDate: AddMonths(new Date(), 1),
    });
    setLoading(false);
    setCompleted(true);
    return setStep(4);
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
