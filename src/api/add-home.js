// Save in Database
export const saveServices = async serviceData => {
    const url = `${process.env.REACT_APP_API_URL}/services`;

    const response = await fetch(url, {
        method: "POST",
        headers: {
            'content-type': ['application/json'],
        },
        body: JSON.stringify(serviceData)
    })

    const data = await response.json();
    return data;
}

// // Save in Database
export const getServiceByEmail = async user => {
    const url = `${process.env.REACT_APP_API_URL}/services?${user?.email}`;

    const response = await fetch(url)
    const data = await response.json();
    return data;
}

// Save in Database
export const getHome = async () => {
    const url = `${process.env.REACT_APP_API_URL}/services`;
    const response = await fetch(url)
    const data = await response.json();
    return data;
}




// update a home
export const updateHome = async homeData=> {
    const url =  `${process.env.REACT_APP_API_URL}/service`
    const response = await fetch(url, {
      method: 'PUT',
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify(homeData),
    })
  
    const data = await response.json()
    return data
  }
  


// // Save in Database
export const deleteHome = async id => {
    const url = `${process.env.REACT_APP_API_URL}/services/${id}`;

    const response = await fetch(url, {
        method: 'DELETE',
    });
    const data = await response.json();
    return data;
}