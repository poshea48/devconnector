// Register User
import axios from 'axios';
import { GET_ERRORS, SET_CURRENT_USER } from './types';
import setAuthToken from '../utils/setAuthToken';
import jwt_decode from 'jwt-decode';

export const registerUser = (userData, history) => dispatch => {
  axios
    .post('/api/users/register', userData)
    .then(res => history.push('/login'))
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    )

  return {
    type: GET_ERRORS,
    payload: userData
  }
}

// login - Get user token
export const loginUser = userData => dispatch => {
  axios
    .post('/api/users/login', userData)
    .then(res => {
      // save token to local storage
      const { token } = res.data;
      localStorage.setItem(`jwtTokenDev`, token)
      // set token to auth header
      setAuthToken(token);
      // decode token to get user data
      const decoded = jwt_decode(token);
      // Set current user
      dispatch(setCurrentUser(decoded))
    })
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    )
}

// log user out
export const logoutUser = () => dispatch => {
  // Remove token from localStorage
  localStorage.removeItem('jwtTokenDev')
  // Remove auth header for future requests
  setAuthToken(false)
  // Set current user to {} which will also set isAuthenticated to false
  dispatch(setCurrentUser({}))
}

// Set Logged in user
export const setCurrentUser = decoded => {
  return {
    type: SET_CURRENT_USER,
    payload: decoded
  }
}

// Clear Errors
// export const clearErrors = () => {
//   console.log("authActions")
//   return {
//     type: CLEAR_ERRORS,
//     payload: {}
//   }
// }
