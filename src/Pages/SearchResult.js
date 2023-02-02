import React from 'react'
import { useLocation } from 'react-router-dom'
import SearchCard from '../Components/Card/SearchCard'

const SearchResult = () => {
  const { state } = useLocation()
  console.log(state)
  return (
    <section className='text-gray-600 body-font'>
      <div className="flex items-center justify-center h-80 py-10 bg-center bg-cover bg-no-repeat bg-blend-[#000000] bg-[url('https://i.ibb.co/RgwmMhk/clay-banks-b5-S4-Fr-Jb7y-Q-unsplash.jpg')]">
        {/* <img
          alt='feature'
          className='h-full object-cover object-center overflow-hidden w-full'
          src='https://i.ibb.co/RgwmMhk/clay-banks-b5-S4-Fr-Jb7y-Q-unsplash.jpg'
        /> */}
        <div className='px-10 py-5 rounded-lg bg-lime-600'>
          <h2 className='text-center text-3xl font-semibold text-white'>Search Result in <span className='capitalize'>{state?.location}</span></h2>
        </div>
      </div>
      <div className='max-w-screen-xl lg:mx-auto'>
        <div className='lg:py-4 lg:px-16 py-2 px-5'>
          <div className='py-2'>
            <small className='text-gray-400'>252 stays Nov 13-17 3 Guest</small>
            <h2 className='text-2xl font-medium text-gray-900 mb-4'>
              Stay in {state?.location}
            </h2>
          </div>
          <div className='grid lg:grid-cols-2 md:grid-cols-2 gap-6'>
            {[...Array(7)].map((_, i) => (
              <SearchCard key={i} />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default SearchResult
