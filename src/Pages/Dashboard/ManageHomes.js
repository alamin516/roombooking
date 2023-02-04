import React, { useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { getServiceByEmail } from '../../api/services'
import PrimaryButton from '../../Components/Button/PrimaryButton'
import HomeDataRow from '../../Components/HomeDataRow'
import { AuthContext } from '../../contexts/AuthProvider'

const ManageHomes = () => {
    const { user } = useContext(AuthContext)
    const [homes, setHomes] = useState([])
    // const [loading, setLoading] = useState(true)

    const fetchHomes = () => {
        getServiceByEmail(user)
            .then(data => {
                setHomes(data)
            })
            .catch(err => {
                console.error(err)
                // setLoading(false)
            })
    }

    useEffect(() => {
        fetchHomes()
    }, [user])

    return (
        <>
            {homes && Array.isArray(homes) && homes.length > 0 ? <div className='container mx-auto px-4 sm:px-8'>
                <div className='py-8'>
                    <div className='-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto'>
                        <div className='inline-block min-w-full shadow rounded-lg overflow-hidden'>
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
                                            Delete
                                        </th>
                                        <th
                                            scope='col'
                                            className='px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal'
                                        >
                                            Update
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {homes &&
                                        homes.map((home) =>
                                        (
                                            <HomeDataRow
                                                key={home._id}
                                                home={home}
                                                fetchHomes={fetchHomes}
                                            />
                                        )
                                        )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div> :
                <>
                    <div className='h-screen text-gray-700 flex flex-col justify-center items-center pb-16 md:-x-64'>
                        <div className='text-center'>
                            <h2>You haven't added any home yet</h2>
                            <Link to='/dashboard/add-home'>
                                <PrimaryButton classes='px-6 py-2 text-medium rounded mt-4'>
                                    Add Homes
                                </PrimaryButton>
                            </Link>
                        </div>
                    </div>
                </>
            }
        </>
    )
}

export default ManageHomes