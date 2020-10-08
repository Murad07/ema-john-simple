import React from 'react';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import SplitCardForm from './SplitCardForm';
import SimpleCardForm from './SimpleCardForm';

const stripePromise = loadStripe(
  'pk_test_51HZqN7B2V9woFMQDDxG1n88UfTlS8kUqPckSuFSUw8RUNBwtROksyXMrU5ik1iEfDagAGQALkbHUPgF9GHfxUISx00mlksyMgO'
);

const ProcessPayment = ({ handlePayment }) => {
  return (
    <Elements stripe={stripePromise}>
      <SimpleCardForm handlePayment={handlePayment}></SimpleCardForm>
      {/* <SplitCardForm></SplitCardForm> */}
    </Elements>
  );
};

export default ProcessPayment;
