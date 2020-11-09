import { FoxApiService } from "../services";

const foxApi = new FoxApiService();
const SERVER_ADDRESS = `${window.location.origin}`;

const userRegisterValidationFetch = (registerToken) => {
  return (dispatch) => {
    const url = `${SERVER_ADDRESS}/api/validate_register_token/`;
    const send_data = { token: registerToken };
    foxApi
      .post(url, send_data)
      .then(() => {
        dispatch(allowRegistration(registerToken));
      })
      .catch(function (error) {
        console.error(error);
        dispatch(forbidRegistration());
      });
  };
};

const userRegisterFetch = (credentials) => {
  return (dispatch) => {
    let data = JSON.stringify(credentials);
    const csrftoken = getCookie("csrftoken");
    return fetch(`${SERVER_ADDRESS}/api/password_reset_confirm/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        "X-CSRFToken": csrftoken,
      },
      body: data,
    })
      .then((resp) => {
        if (resp.ok) {
          dispatch(logoutUser());
          dispatch(registerUser());
        } else {
          // pass
        }
        return resp.json();
      })
      .then((data) => {
        console.warn(data);
        if (data.password) {
          const message = data.password[0];
          dispatch(registerError(message));
        }
      })
      .catch(function (error) {
        console.error(error);
      });
  };
};

const userLoginFetch = (user) => {
  return (dispatch) => {
    let data = JSON.stringify(user);
    return fetch(`${SERVER_ADDRESS}/api/token-auth/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: data,
    })
      .then((resp) => {
        return resp.json();
      })
      .then((data) => {
        if (data.token) {
          localStorage.setItem("token", data.token);
          dispatch(loginUser(data.user));
        } else {
          dispatch(loginError());
          console.warn(data);
        }
      })
      .catch(function (error) {
        console.error(error);
      });
  };
};

const getProfileFetch = () => {
  return async (dispatch) => {
    const token = localStorage.token;
    if (token) {
      return await fetch(`${SERVER_ADDRESS}/api/current_user/`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `JWT ${token}`,
        },
      })
        .then((resp) => resp.json())
        .then((data) => {
          if (data.detail) {
            dispatch(logoutUser());
            return Promise.reject(data);
          } else {
            dispatch(loginUser(data));
            return Promise.resolve(data);
          }
        });
    } else {
      dispatch(logoutUser());
      return Promise.reject("User is not logged in");
    }
  };
};

const loginUser = (userObj) => ({
  type: "LOGIN_USER",
  currentUser: userObj,
  loginError: false,
  registerAllowed: true,
});

const registerUser = () => ({
  type: "REGISTER_USER",
  registerError: false,
  registerAllowed: false,
});

const loginError = () => ({
  type: "LOGIN_ERROR",
  loginError: true,
});

const registerError = (message = "") => ({
  type: "REGISTER_ERROR",
  registerError: true,
  errorMessage: message,
});

const logoutUser = () => {
  localStorage.removeItem("token");
  return {
    type: "LOGOUT_USER",
  };
};

const allowRegistration = (token) => ({
  type: "ALLOW_REGISTER",
  registerAllowed: true,
  registrationToken: token,
  registerError: false,
});
const forbidRegistration = () => ({
  type: "FORBID_REGISTER",
  registerAllowed: false,
});

function getCookie(name) {
  let cookieValue = null;
  if (document.cookie && document.cookie !== "") {
    const cookies = document.cookie.split(";");
    for (let i = 0; i < cookies.length; i++) {
      const cookie = cookies[i].trim();
      // Does this cookie string begin with the name we want?
      if (cookie.substring(0, name.length + 1) === name + "=") {
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
  registerError,
  allowRegistration,
};
