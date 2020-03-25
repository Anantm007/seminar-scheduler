// Check whether slot is free or not 
export const checkSlot = (query) => {
    return fetch(`/api/booking/check`, {
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json"
        },
        body: JSON.stringify(query)
    })

    .then(response => {
        return response.json();
    })
    .catch(err => {
        console.log(err);
    })
} 
