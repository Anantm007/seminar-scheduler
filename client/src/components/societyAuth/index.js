// Login User
export const signin = async (data) => {
    return fetch(`/api/society/signin`, {
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json"
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

// Save token in storage
export const authenticate = (data) => {
    if(typeof window !== 'undefined')
    {
        if(JSON.parse(localStorage.getItem('adminjwt')))
        {
            localStorage.removeItem('adminjwt');
        }

        localStorage.setItem('societyjwt', JSON.stringify(data))
    }
}

// Signout so destroy the local token
export const signoutSociety = () => {
    if(typeof window !== 'undefined')
    {
        localStorage.removeItem('societyjwt');
        window.location.reload(false);
    }
};

// Return if user is authenticated or not
export const isAuthenticatedSociety = () => {
    if(typeof window === 'undefined')
    {
        return false;
    }

    if(localStorage.getItem('societyjwt'))
    {
        return JSON.parse(localStorage.getItem('societyjwt'));
    } else {
        return false;
    }
}