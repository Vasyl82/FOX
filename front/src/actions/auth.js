const SERVER_ADDRESS = `${window.location.origin}`;

const userRegisterValidationFetch = token => {
    return dispatch => {
        const csrftoken = getCookie('csrftoken');
        let send_data = JSON.stringify({ token: token });
        return fetch(`${SERVER_ADDRESS}/api/validate_register_token/`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json',
                'X-CSRFToken': csrftoken
            },
            body: send_data
        }).then(resp => {
            if (resp.ok) {
                dispatch(allowRegistration(token));
            } else {
                dispatch(registerError());
            }
            return resp.json();
        }).then(data => {
            console.warn(data);
        }).catch(function (error) {
            console.error(error);
        })
    }
}

const userRegisterFetch = credentials => {
    return dispatch => {
        let data = JSON.stringify(credentials);
        const csrftoken = getCookie('csrftoken');
        return fetch(`${SERVER_ADDRESS}/api/password_reset_confirm/`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json',
                'X-CSRFToken': csrftoken
            },
            body: data
        }).then(resp => {
            if (resp.ok) {
                dispatch(logoutUser());
                dispatch(registerUser());
            } else {
                dispatch(registerError());
            }
            return resp.json();
        }).then(data => {
            console.warn(data);
        }).catch(function (error) {
            console.error(error);
        })
    }
}

const userLoginFetch = user => {
    return dispatch => {
        let data = JSON.stringify(user);
        return fetch(`${SERVER_ADDRESS}/api/token-auth/`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json',
            },
            body: data
        })
            .then(resp => {
                return resp.json()
            })
            .then(data => {
                if (data.token) {
                    localStorage.setItem("token", data.token);
                    dispatch(loginUser(data.user));
                } else {
                    dispatch(loginError());
                    console.warn(data);
                }
            }).catch(function (error) {
                console.error(error);
            })
    }
}

const getProfileFetch = () => {
    return dispatch => {
        const token = localStorage.token;
        if (token) {
            return fetch(`${SERVER_ADDRESS}/api/current_user/`, {
                method: "GET",
                headers: {
                    'Content-Type': 'application/json',
                    Accept: 'application/json',
                    'Authorization': `JWT ${token}`
                }
            })
                .then(resp => resp.json())
                .then(data => {
                    if (data.detail) {
                        console.log(data.detail)
                        localStorage.removeItem("token")
                    } else {
                        dispatch(loginUser(data))
                    }
                })
        }
    }
}


const loginUser = userObj => ({
    type: 'LOGIN_USER',
    currentUser: userObj,
    loginError: false
});

const registerUser = () => ({
    type: 'REGISTER_USER',
    registerError: false,
    registerAllowed: false,
    userRegistered: true
});

const loginError = () => ({
    type: 'LOGIN_ERROR',
    loginError: true
});

const registerError = () => ({
    type: 'REGISTER_ERROR',
    registerError: true
});

const logoutUser = () => {
    localStorage.removeItem("token")
    return {
        type: 'LOGOUT_USER'
    }
};

const allowRegistration = token => ({
    type: 'ALLOW_REGISTER',
    registerAllowed: true,
    registrationToken: token
}
);


function getCookie(name) {
    let cookieValue = null;
    if (document.cookie && document.cookie !== '') {
        const cookies = document.cookie.split(';');
        for (let i = 0; i < cookies.length; i++) {
            const cookie = cookies[i].trim();
            // Does this cookie string begin with the name we want?
            if (cookie.substring(0, name.length + 1) === (name + '=')) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;
}

export {
    userLoginFetch,
    getProfileFetch,
    logoutUser,
    userRegisterValidationFetch,
    userRegisterFetch,
    registerError, allowRegistration
}
