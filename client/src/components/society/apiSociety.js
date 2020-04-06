// Book Slot for society 
export const bookSlot = (data) => {
    return fetch(`/api/booking/add`, {
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            'Authorization': JSON.parse(localStorage.getItem('societyjwt')).token
        },
        body: JSON.stringify(data)
    })

    .then(response => {
        return response.json();
    })
    .catch(err => {
        console.log(err);
    })
} 

// Get society details
export const getSociety = id => {
    return fetch(`/api/society/getSociety/${id}`, {
        method: "GET",
        headers: {
            'Authorization': JSON.parse(localStorage.getItem('societyjwt')).token
        },
    })
    .then(response => {
        return response.json();
    })
    .catch(err => {
        console.log(err);
    })
} 

// Update Society
export const Update = async(id, society) => {
    console.log(    JSON.parse(localStorage.getItem('societyjwt')).token)

    return fetch(`/api/society/update/${id}`, {
        method: 'PUT',
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            'x-auth-token': JSON.parse(localStorage.getItem('societyjwt')).token
        },
            body: JSON.stringify(society)
    })
    .then(response => {
        return response.json();
    })
    .catch(err => {
        console.log(err);
    })
}

// Update society in local storage
export const updateSociety = (society, next) => {
    if(typeof window !== 'undefined')
    {
        if(localStorage.getItem('societyjwt'))
        {
            let auth = JSON.parse(localStorage.getItem("societyjwt"));
            auth.society = society;
            localStorage.setItem('societyjwt', JSON.stringify(auth))
            next()
        }
    }
}
