import React, { useEffect, useState } from 'react'
import { getHome } from '../api/services'
import HomeCard from '../Components/Card/HomeCard'
import Spinner from '../Components/Spinner/Spinner'

const AllHome = () => {
  const [loading, setLoading] = useState(false)
  const [homes, setHomes] = useState([]);

  useEffect(() => {
    getHome()
    .then(data =>{
       console.log(data)
       setHomes(data)
      })
  }, []);

  return (
    <>
      {loading ? (
        <Spinner />
      ) : (
        <section className='max-w-screen-xl text-gray-600 body-font mx-auto'>
          <div className='pb-8 pt-2 mx-auto'>
            <div className='grid lg:grid-cols-4 md:grid-cols-2 pt-4 gap-5'>
              {homes.map((home, i) =>
                <HomeCard
                  key={i}
                  home={home}
                ></HomeCard>
              )}
            </div>
          </div>
        </section>
      )}
    </>
  )
}

export default AllHome
