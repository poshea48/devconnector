import axios from 'axios';
import { GET_PROFILE, GET_PROFILES, PROFILE_LOADING, GET_ERRORS, CLEAR_CURRENT_PROFILE, SET_CURRENT_USER } from './types';

// GET current profile
export const getCurrentProfile = () => dispatch => {
  console.log("actions")
  dispatch(setProfileLoading())
  axios.get('/api/profile')
    .then(res =>
      dispatch({
        type: GET_PROFILE,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_PROFILE,
        payload: {}
      })
    )
}

// Get profile by handle
export const getProfileByHandle = handle => dispatch => {
  dispatch(setProfileLoading())
  axios
    .get(`/api/profile/handle/${handle}`)
    .then(res =>
      dispatch({
        type: GET_PROFILE,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_PROFILE,
        payload: null
      })
    )
}

// Get profile by user id
export const getProfileByUserId = userId => dispatch => {
  dispatch(setProfileLoading())
  axios
    .get(`/api/profile/user/${userId}`)
    .then(res =>
      dispatch({
        type: GET_PROFILE,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_PROFILE,
        payload: null
      })
    )
}
// create profile
export const createProfile = (profileData, history) => dispatch => {
  axios
  .post('/api/profile', profileData)
  .then(res => history.push('/dashboard'))
  .catch(err =>
    dispatch({
      type: GET_ERRORS,
      payload: err.response.data
    })
  )

}

// Profile Loading
export const setProfileLoading = () => {
  return {
    type: PROFILE_LOADING
  }
}

// clear profile
export const clearCurrentProfile = () => {
  return {
    type: CLEAR_CURRENT_PROFILE
  }
}

// Add experience
export const addExperience = (expData, history) => dispatch => {
  axios
    .post('/api/profile/experience', expData)
    .then(res => history.push('/dashboard'))
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    )
}

// Add education
export const addEducation = (eduData, history) => dispatch => {
  axios
    .post('/api/profile/education', eduData)
    .then(res => history.push('/dashboard'))
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    )
}

// Get profiles
export const getProfiles = () => dispatch => {
  dispatch(setProfileLoading())
  axios
    .get('/api/profile/all')
    .then(res =>
      dispatch({
        type: GET_PROFILES,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_PROFILES,
        payload: null
      })
    )
}

// delete experience
export const deleteExperience = (expId) => dispatch => {
  axios
    .delete(`api/profile/experience/${expId}`)
    .then(res =>
      dispatch({
        type: GET_PROFILE,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    )
}

// delete education
export const deleteEducation = (eduId) => dispatch => {
  axios
    .delete(`api/profile/education/${eduId}`)
    .then(res =>
      dispatch({
        type: GET_PROFILE,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    )
}

export const deleteAccount = () => dispatch => {
  if (window.confirm("Are you sure?  This can NOT be undone")) {
    axios
      .delete('/api/profile')
      .then(res =>
        dispatch({
          type: SET_CURRENT_USER,
          payload: {}
        })
      ).catch(err =>
        dispatch({
          type: GET_ERRORS,
          payload: err.response.data
        })
      )
  }
}

// export const getRepos = username => dispatch => {
//   axios
//     .get(`/api/github/${username}`)
//     .then(res =>
//       dispatch({
//         type: GET_REPOS,
//         payload: res.data
//       })
//     )
//     .catch(err =>
//       dispatch({
//         type: GET_REPOS,
//         payload: []
//       })
//     )
// }
