import React from 'react'
import { createBrowserRouter } from 'react-router-dom'
import ErrorPage from '../Pages/Shared/ErrorPage'
import Home from '../Pages/Home'
import Login from '../Pages/Login/Login'
import Signup from '../Pages/Login/Signup'
import Main from '../Layout/Main'
import ComingSoon from '../Pages/Shared/ComingSoon'
import Details from '../Pages/Details'
import SearchResult from '../Pages/SearchResult'
import Checkout from '../Pages/Checkout'
import PrivateRoute from './PrivateRoute'
import DashboardLayout from '../Layout/DashboardLayout'
import Dashboard from '../Pages/Dashboard/Dashboard'
import MyBookings from '../Pages/Dashboard/MyBookings'
import BecomeAHost from '../Pages/Dashboard/BecomeAHost'
import AllUsers from '../Pages/Dashboard/All-users'
import Allbooking from '../Pages/Dashboard/All-bookings'
import AddHome from '../Pages/Dashboard/AddHome'
import ManageHomes from '../Pages/Dashboard/ManageHomes'
import AllHome from '../Pages/AllHome'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Main />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: '/',
        element: <Home />,
      },
      {
        path: '/login',
        element: <Login />,
      },
      {
        path: '/signup',
        element: <Signup />,
      },
      {
        path: '/coming-soon',
        element: <ComingSoon></ComingSoon>,
      },
      {
        path: '/all-homes',
        element: <AllHome></AllHome>,
      },
      {
        path: '/service-details/:id',
        element: <Details></Details>,
        loader: ({params}) => fetch(`${process.env.REACT_APP_API_URL}/service/${params.id}`)
      },
      {
        path: '/search-result',
        element: <SearchResult></SearchResult>,
      },
      {
        path: '/checkout',
        element: <PrivateRoute><Checkout></Checkout></PrivateRoute>,
      },
    ],
  },
  {
    path: '/dashboard',
    element: <PrivateRoute><DashboardLayout /></PrivateRoute>,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "",
        element: <Dashboard></Dashboard>
      },
      {
        path: "my-bookings",
        element: <PrivateRoute>
          <MyBookings></MyBookings>
        </PrivateRoute>
      },
      {
        path: "become-host",
        element: <PrivateRoute>
          <BecomeAHost></BecomeAHost>
        </PrivateRoute>
      },
      {
        path: "all-users",
        element: <PrivateRoute>
          <AllUsers />
        </PrivateRoute>
      },
      {
        path: "my-bookings",
        element: <PrivateRoute>
          <MyBookings />
        </PrivateRoute>
      },
      {
        path: "all-bookings",
        element: <PrivateRoute>
          <Allbooking></Allbooking>
        </PrivateRoute>
      },
      {
        path: "add-home",
        element: <PrivateRoute>
          <AddHome></AddHome>
        </PrivateRoute>
      },
      {
        path: "manage-homes",
        element: <PrivateRoute>
          <ManageHomes></ManageHomes>
        </PrivateRoute>
      }

    ]
  },
])

export default router
