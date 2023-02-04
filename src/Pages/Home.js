import React, { useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { getHome } from '../api/services'
import ExpCard from '../Components/Card/ExpCard'
import HomeCard from '../Components/Card/HomeCard'
import SearchForm from '../Components/Form/SearchForm'
import Spinner from '../Components/Spinner/Spinner'
const Home = () => {
  // const {loading, setLoading} = useContext(false)
  const [allExp, setAllExp] = useState([]);
  const [homes, setHomes] = useState([]);
  const [loading, setLoading] = useState(true)

  useEffect(() => {
   getHome()
   .then(data =>{
    setHomes(data)
    setLoading(false)
   })

  }, []);

  // useEffect(() => {
  //  fetch(`expdata.json`)
  //  .then(data =>{
  //   setAllExp(data)
  //  })

  // }, []);


  return (
    <div>
      <div className="py-32 bg-[url('https://d23e6qdu75bsi3.cloudfront.net/webpack/images/skyline-08-vegas-2dddf6f764f9375b4972.jpg')]">
        <div>
          <SearchForm></SearchForm>
        </div>
      </div>
      <div className='max-w-screen-xl mx-auto'>
        <div className='py-10'>
          <div className='flex justify-between mb-4'>
            <h3 className='text-2xl font-bold'>Services</h3>
            <Link to="/all-homes">See All</Link>
          </div>
          <div className='container'>
            <div className='grid lg:grid-cols-3 md:grid-cols-2 gap-4'>
              {loading ? <Spinner></Spinner> :
                homes.map((home) => <HomeCard
                  key={home._id}
                  home={home}
                ></HomeCard>)
              }
            </div>
          </div>
        </div>
        <div className='py-10'>
          <div className='flex justify-between mb-4'>
            <h3 className='text-2xl font-bold'>Experience</h3>
            <Link to="/coming-soon">See All</Link>
          </div>
          <div className='container'>
            <div className='grid lg:grid-cols-4 md:grid-cols-2 gap-4'>
              {loading ? <Spinner></Spinner> :
                [...Array(8)].map((expo, i) => <ExpCard
                  key={i}
                  expo={expo}
                ></ExpCard>)
              }
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home
