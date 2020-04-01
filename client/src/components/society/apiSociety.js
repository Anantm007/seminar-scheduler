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
