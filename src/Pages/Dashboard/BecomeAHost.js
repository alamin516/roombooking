import React, { useContext, useEffect, useState } from 'react'
import { toast } from 'react-hot-toast'
import { getImageUrl } from '../../api/imageUpload'
import { getRole, hostRequest } from '../../api/user'
import BecomeAHostForm from '../../Components/Form/BecomeAHostForm'
import { AuthContext } from '../../contexts/AuthProvider'

const BecomeAHost = () => {
  const { user } = useContext(AuthContext)
  const [role, setRole] = useState(null)
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true)
    getRole(user?.email)
      .then(data => {
        setRole(data)
        setLoading(false)
      })
  }, [user])




  const handleSubmit = event => {
    event.preventDefault()
    const location = event.target.location.value
    const image = event.target.image.files[0]

    getImageUrl(image)
      .then(data => {
        console.log(data)
        const hostData = {
          location: location,
          documentImg: data,
          role: 'requested',
          email: user?.email,
        }
        hostRequest(hostData)
          .then(data => {
            console.log(data)
            toast.success('Your request is sent to admin')
          })
      })
      .catch(error => {
        console.log(error)
        setLoading(false)
      })
  }

  return (
    <>
      {role ? (
        <div className='h-screen text-gray-600 flex flex-col justify-center items-center pb-16 text-xl lg:text-3xl'>
          {role === 'host' ? ' ' : 'Request Sent, wait for admin approval'}
        </div>
      ) : (
        <>{!loading && <BecomeAHostForm handleSubmit={handleSubmit} />}</>
      )}
    </>
  )
}

export default BecomeAHost