import React, { useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { getAllBookingsByEmail } from '../../api/bookings'
import PrimaryButton from '../../Components/Button/PrimaryButton'
import Spinner from '../../Components/Spinner/Spinner'
import { AuthContext } from '../../contexts/AuthProvider'
import SingleBooking from './SingleBooking'

const MyBookings = () => {
  const { user } = useContext(AuthContext)
  const [bookings, setBookings] = useState([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    setLoading(true)
    getAllBookingsByEmail(user?.email).then(data => {
      console.log(data)
      setBookings(data)
      setLoading(false)
    })
  }, [user])
  return (
    <>
      {bookings && Array.isArray(bookings) && bookings.length > 0 ?
        <div className='container mx-auto px-4 sm:px-8'>
          <div className='py-8'>
            <div className='-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto'>
              {loading ? <Spinner></Spinner> : <div className='inline-block min-w-full shadow rounded-lg overflow-hidden'>
                <table className='min-w-full leading-normal'>
                  <thead>
                    <tr>
                      <th
                        scope='col'
                        className='px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal'
                      >
                        Title
                      </th>
                      <th
                        scope='col'
                        className='px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal'
                      >
                        Location
                      </th>
                      <th
                        scope='col'
                        className='px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal'
                      >
                        Price
                      </th>
                      <th
                        scope='col'
                        className='px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal'
                      >
                        From
                      </th>
                      <th
                        scope='col'
                        className='px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal'
                      >
                        To
                      </th>
                      <th
                        scope='col'
                        className='px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal'
                      >
                        Action
                      </th>
                    </tr>
                  </thead>
                  {
                    bookings.map(booking => <SingleBooking
                      key={booking._id}
                      booking={booking}
                    ></SingleBooking>)
                  }
                </table>
              </div>}
            </div>
          </div>
        </div>
        :
        <div className='h-screen text-gray-700 flex flex-col justify-center items-center pb-16 md:-x-64'>
          <div className='text-center'>
            <h2>You haven't booked any item yet</h2>
            <Link to='/all-homes'>
                  <PrimaryButton classes='px-6 py-2 text-medium rounded mt-4'>
                    Browse Homes
                  </PrimaryButton>
            </Link>
          </div>
        </div>
      }
    </>
  )
}

export default MyBookings