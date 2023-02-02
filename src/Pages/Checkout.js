import React, { Fragment, useContext, useState } from 'react'
import { Tab } from '@headlessui/react'
import { AuthContext } from '../contexts/AuthProvider'
import ReviewHouse from '../Components/ReviewHouse'
import WhosComing from '../Components/WhosComing'
import CheckoutCart from '../Components/CheckoutCart'
// import toast from 'react-hot-toast'
// import Payment from '../Components/Payment'
import { saveBooking } from '../api/bookings'
import { toast } from 'react-hot-toast'
import { useLocation, useNavigate } from 'react-router-dom'
import Payment from '../Components/Payment'

const Checkout = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const { state: checkoutData } = useLocation();

  // const homeData = {
  //   _id: '60ehjhedhjdj3434',
  //   location: 'Dhaka, Bangladesh',
  //   title: 'Huge Apartment with 4 bedrooms',
  //   image: 'https://i.ibb.co/YPXktqs/Home1.jpg',
  //   from: '17/11/2022',
  //   to: '21/11/2022',
  //   host: {
  //     name: 'John Doe',
  //     image: 'https://i.ibb.co/6JM5VJF/photo-1633332755192-727a05c4013d.jpg',
  //     email: 'johndoe@gmail.com',
  //   },
  //   price: 98,
  //   total_guest: 4,
  //   bedrooms: 2,
  //   bathrooms: 2,
  //   ratings: 4.8,
  //   reviews: 64,
  // }

  const [bookingData, setBookingData] = useState({
    home: {
      id: checkoutData?.homeData?._id,
      title: checkoutData?.homeData?.title,
      image: checkoutData?.homeData?.image,
      location: checkoutData?.homeData?.location,
      from: checkoutData?.homeData?.from,
      to: checkoutData?.homeData?.to
    },
    hostEmail: checkoutData?.homeData?.host?.email,
    message: '',
    totalPrice: parseFloat(checkoutData?.total),
    guestEmail: user?.email,

  })
  const [selectedIndex, setSelectedIndex] = useState(0)

  const handleBooking = () => {
    // return console.log(bookingData)

    saveBooking(bookingData)
      .then(data => {
        console.log(data)
        toast.success('Booking Successful!')
        navigate('/dashboard/my-bookings')
      })
      .catch(err => {
        console.log(err)
        toast.error(err?.message)
      })
  }

  return (
    <div className='md:flex gap-5 items-start justify-between sm:mx-10 md:mx-20 px-4 lg:mx-40 py-4'>
      {/* Details */}
      <div className='flex-1'>
        <Tab.Group
          selectedIndex={selectedIndex}
          onChange={setSelectedIndex}
          defaultIndex={1}
        >
          <Tab.List>
            <div className='container flex flex-wrap items-center py-4 mx-auto overflow-y-auto whitespace-nowrap'>
              <Tab as={Fragment}>
                {({ selected }) => (
                  <button
                    className={selected ? 'text-blue-600' : 'text-gray-600'}
                  >
                    1. Reviews house rules
                  </button>
                )}
              </Tab>

              <span className='mx-5 text-gray-500 dark:text-gray-300 rtl:-scale-x-100'>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  className='w-5 h-5'
                  viewBox='0 0 20 20'
                  fill='currentColor'
                >
                  <path
                    fillRule='evenodd'
                    d='M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z'
                    clipRule='evenodd'
                  />
                </svg>
              </span>
              <Tab as={Fragment}>
                {({ selected }) => (
                  <button
                    className={selected ? 'text-blue-600' : 'text-gray-600'}
                  >
                    2. Who's coming?
                  </button>
                )}
              </Tab>

              <span className='mx-5 text-gray-500 dark:text-gray-300 rtl:-scale-x-100'>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  className='w-5 h-5'
                  viewBox='0 0 20 20'
                  fill='currentColor'
                >
                  <path
                    fillRule='evenodd'
                    d='M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z'
                    clipRule='evenodd'
                  />
                </svg>
              </span>
              <Tab as={Fragment}>
                {({ selected }) => (
                  <button
                    className={selected ? 'text-blue-600' : 'text-gray-600'}
                  >
                    3. Confirm and pay
                  </button>
                )}
              </Tab>
            </div>
          </Tab.List>
          <Tab.Panels>
            <Tab.Panel>
              <ReviewHouse
                setSelectedIndex={setSelectedIndex}
                homeData={{ ...checkoutData?.homeData, totalNights: checkoutData?.totalNights }}
              />
            </Tab.Panel>
            <Tab.Panel>
              {/* WhosComing Comp */}
              <WhosComing
                setSelectedIndex={setSelectedIndex}
                host={checkoutData?.homeData?.host}
                bookingData={bookingData}
                setBookingData={setBookingData}
              />
            </Tab.Panel>
            <Tab.Panel>
              {/* Payment Comp */}
              <Payment bookingData={bookingData} />
            </Tab.Panel>
          </Tab.Panels>
        </Tab.Group>
      </div>

      {/* Cart */}
      <CheckoutCart
        homeData={{
          ...checkoutData?.homeData,
          totalNights: checkoutData?.totalNights,
          sub_total: checkoutData?.sub_total,
          total: checkoutData?.total
        }}
      />
    </div>
  )
}

export default Checkout