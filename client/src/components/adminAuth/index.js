// Login User
export const signin = async (data) => {
    return fetch(`/api/admin/signin`, {
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
        if(JSON.parse(localStorage.getItem('societyjwt')))
        {
            localStorage.removeItem('societyjwt');
        }

        localStorage.setItem('adminjwt', JSON.stringify(data))
    }
}

// Signout so destroy the local token
export const signout = () => {
    if(typeof window !== 'undefined')
    {
        localStorage.removeItem('adminjwt');
        window.location.reload(false);
    }
};

// Return if user is authenticated or not
export const isAuthenticated = () => {
    if(typeof window === 'undefined')
    {
        return false;
    }

    if(localStorage.getItem('adminjwt'))
    {
        return JSON.parse(localStorage.getItem('adminjwt'));
    } else {
        return false;
    }
}

// Forgot Password (send token)
export const forgot = async email => {
    return fetch(`/api/admin/forgot`, {
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json"
        },
        body: JSON.stringify(email)
    })
    .then(response => {
        return response.json();
    })
    .catch(err => {
        console.log(err);
    })
}

// Update password
export const updatePassword = async (password, token) => {
    return fetch(`/api/admin/resetPassword/${token}`, {
        method: "PUT",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json"
        },
        body: JSON.stringify(password)
    })
    .then(response => {
        return response.json();
    })
    .catch(err => {
        console.log(err);
    })
}