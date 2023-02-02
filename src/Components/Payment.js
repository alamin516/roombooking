import React from 'react';
import {Elements} from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import CheckoutForm from './Form/CheckoutForm';

const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PB_KEY);


const Payment = ({bookingData}) => {

    return (
        <div className='p-5'>
            <h2 className='text-2xl font-bold'>Your Payment Details:</h2>
            {/* <h3 className='text-xl my-3'>You have to pay <strong>${price}</strong> for <strong>{title}</strong></h3> */}
            <Elements className="mt-5" stripe={stripePromise} >
                    <CheckoutForm 
                    handleBooking={bookingData}
                    />
                </Elements>
        </div>
    );
};

export default Payment;