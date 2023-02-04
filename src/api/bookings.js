// Post booking data in database
export const saveBooking = async (bookingData) => {

    const response = await fetch(`${process.env.REACT_APP_API_URL}/bookings`, {
        method: "POST",
        headers: {
            'content-type': ['application/json'],
            authorization: `bearer ${localStorage.getItem('accessToken')}`
            
        },
        body: JSON.stringify(bookingData)
    })

    const data = await response.json();
    return data;
}

// Get all booking data from database
export const getAllBookingsByEmail = async email => {
    const url = `${process.env.REACT_APP_API_URL}/bookings?email=${email}`;

    const response = await fetch(url, {
        headers: {
            "Content-Type": "application/json",
            authorization: `bearer ${localStorage.getItem('accessToken')}`
        },
    })
    const data = await response.json();

    return data;
}



// Get booking data for admin
export const getAllBookings = async () => {
    const url = `${process.env.REACT_APP_API_URL}/bookings`;

    const response = await fetch(url, {
        headers: {
            "Content-Type": "application/json",
            authorization: `bearer ${localStorage.getItem('accessToken')}`
        },
    })

    const data = await response.json();
    return data;
}


// Post booking data in database
export const getPaymentIntent = async price => {
    const url = `${process.env.REACT_APP_API_URL}/create-payment`;

    const response = await fetch(url, {
        method: "POST",
        headers: {
            'content-type': ['application/json']
        },
        body: JSON.stringify({price})
    })

    const data = await response.json();
    return data;
}

