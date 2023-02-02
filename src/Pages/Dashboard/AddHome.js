import { format } from 'date-fns'
import React, { useState } from 'react'
import { useContext } from 'react'
import { toast } from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'
import { saveServices } from '../../api/add-home'
import { getImageUrl } from '../../api/imageUpload'
import AddServiceForm from '../../Components/Form/AddServiceForm'
import { AuthContext } from '../../contexts/AuthProvider'

const AddHome = () => {
  const { user } = useContext(AuthContext)
  const [arrivalDate, setArrivalDate] = useState(new Date())
  const [departureDate, setDepartureDate] = useState(arrivalDate.getTime() + 48 * 60 * 60 * 1000);
  const navigate = useNavigate()

  const handleSubmit = event => {
    event.preventDefault()

    const form = event.target;

    const location = form.location.value;
    const title = form.title.value;
    const from = format(arrivalDate, "P")
    const to = format(departureDate, "P")
    const price = form.price.value;
    const guest = form.total_guest.value;
    const bedrooms = form.bedrooms.value;
    const bathrooms = form.bathrooms.value;
    const image = form.image.files[0];
    const description = form.description.value;

    console.log(from, to)

    getImageUrl(image)
      .then(data => {

        const serviceData = {
          location: location,
          title: title,
          from: from,
          to: to,
          image: data,
          price: price,
          guest: guest,
          bedrooms: bedrooms,
          bathrooms: bathrooms,
          description: description,
          host: {
            name: user?.displayName,
            image: user?.photoURL,
            email: user?.email
          }
        }

        saveServices(serviceData)
          .then(data => {
            console.log(data)
            toast.success('Service Added successfully')
            navigate('/dashboard/manage-homes')
          })
          .catch(err => console.log(err))

      })
      .catch(err => console.log(err))

  }

  return (
    <>
      <h1 className='text-3xl font-bold text-gray-800 py-8 text-center'>
        Add Home
      </h1>
      <AddServiceForm
        handleSubmit={handleSubmit}
        arrivalDate={arrivalDate}
        setArrivalDate={setArrivalDate}
        departureDate={departureDate}
        setDepartureDate={setDepartureDate}
      />
    </>
  )
}

export default AddHome;

