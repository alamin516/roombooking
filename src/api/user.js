export const hostRequest = async hostData => {

    const url = `${process.env.REACT_APP_API_URL}/user/${hostData?.email}`;

    const response = await fetch(url, {
        method: "PUT",
        headers: {
            'content-type': ['application/json'],
        },
        body: JSON.stringify(hostData)
    })
    const data = await response.json();

    return data;


}

// Get User role
export const getRole = async email => {

    const url = `${process.env.REACT_APP_API_URL}/user/${email}`;

    const response = await fetch(url)
    const user = await response.json();
    return user.role;

}

// All user
export const getAllUsers = async () => {

    const url = `${process.env.REACT_APP_API_URL}/users`;

    const response = await fetch(url)
    const users = await response.json();
    return users;
}


export const makeHost = async user =>{
    delete user._id
    
    const url = `${process.env.REACT_APP_API_URL}/user/${user?.email}`;

    const response = await fetch(url, {
        method: "PUT",
        headers: {
            'content-type': ['application/json'],
        },
        body: JSON.stringify({...user, role: 'host'})
    })
    const users = await response.json();

    return users;
}

