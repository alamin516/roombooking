import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { getPayment, getPaymentIntent, saveBooking } from '../../api/bookings';
import PrimaryButton from '../Button/PrimaryButton';


const CheckoutForm = ({ bookingData }) => {
    const [clientSecret, setClientSecret] = useState('');
    const stripe = useStripe()
    const elements = useElements();
    const [cardError, setCardError] = useState('')
    const [success, setSuccess] = useState('')
    const [processing, setProcessing] = useState(true)
    const [transactionId, setTransactionId] = useState('')
    const navigate = useNavigate();
    const { price, _id, guestEmail, guestName } = bookingData;

    useEffect(() => {
        // Create PaymentIntent as soon as the page loads
        getPaymentIntent(price)
            .then((data) => {
                console.log(data)
                setClientSecret(data.clientSecret)
            });
    }, [price]);


    const handleSubmit = async (event) => {
        event.preventDefault()

        if (!stripe || !elements) {
            return;
        }

        const card = elements.getElement(CardElement);

        if (card === null) {
            return;
        }

        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: 'card',
            card
        })

        if (error) {
            setCardError(error.message)
        }
        else {
            setCardError('')
        }

        setSuccess('')
        setProcessing(true)

        const { paymentIntent, error: confirmError } = await stripe.confirmCardPayment(
            clientSecret,
            {
                payment_method: {
                    card: card,
                    billing_details: {
                        name: guestName,
                        email: guestEmail
                    },
                },
            },
        );

        if (confirmError) {
            setCardError(confirmError.message)
            return;
        }

        if (paymentIntent.status === 'succeeded') {

            const payment = {
                ...bookingData,
                transactionId: paymentIntent.id,
                orderId: _id
            }

            saveBooking(payment)
                .then(data => {
                    setTransactionId(data.transactionId)
                    toast.success('Booking Successful!')
                    navigate('/dashboard/my-bookings')
                    setProcessing(false)
                })
                .catch(err => {
                    console.log(err)
                    toast.error(err?.message)
                })

        }



    }


    return (
        <form className='w-96' onSubmit={handleSubmit}>
            <CardElement className='border p-4'
                options={{
                    style: {
                        base: {
                            fontSize: '16px',
                            color: '#424770',
                            '::placeholder': {
                                color: '#aab7c4',
                            },
                        },
                        invalid: {
                            color: '#9e2146',
                        },
                    },
                }}
            />
            <PrimaryButton classes="px-8 py-2 mt-3 rounded-lg" type="submit" disabled={!stripe || !clientSecret || processing}>
                Pay Now
            </PrimaryButton>
            <p className='text-red-600'>{cardError}</p>
            {
                success && <div>
                    <p className='text-green-600'>{success}</p>
                    <p>{transactionId}</p>
                </div>
            }
        </form>


    );
};

export default CheckoutForm;