export const getBookingRequests = (type) => {
    console.log('Hi', type)
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