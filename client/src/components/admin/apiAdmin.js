// Fetch booking details for admin for their respective seminar halls
export const getBookingRequests = (type) => {
    return fetch (`/api/admin/bookings/${type}`, {
        method: 'GET',
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            'Authorization': JSON.parse(localStorage.getItem('adminjwt')).token
        },
    })
    .then(response => {
        return response.json();
    })
    .catch(err => {
        console.log(err);
    })
} 

// Get admin details
export const getAdmin = id => {
    return fetch(`/api/admin/getAdmin/${id}`, {
        method: "GET",
        headers: {
            'Authorization': JSON.parse(localStorage.getItem('adminjwt')).token
        },
    })
    .then(response => {
        return response.json();
    })
    .catch(err => {
        console.log(err);
    })
} 

// Update Admin
export const Update = async(id, admin) => {
    return fetch(`/api/admin/update/${id}`, {
        method: 'PUT',
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            'x-auth-token': JSON.parse(localStorage.getItem('adminjwt')).token
        },
            body: JSON.stringify(admin)
    })
    .then(response => {
        return response.json();
    })
    .catch(err => {
        console.log(err);
    })
}

// Update admin in local storage
export const updateAdmin = (admin, next) => {
    if(typeof window !== 'undefined')
    {
        if(localStorage.getItem('adminjwt'))
        {
            let auth = JSON.parse(localStorage.getItem("adminjwt"));
            auth.admin = admin;
            localStorage.setItem('adminjwt', JSON.stringify(auth))
            next()
        }
    }
}