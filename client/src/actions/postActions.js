import axios from 'axios';
import { GET_POSTS, GET_POST, POST_LOADING, ADD_POST, DELETE_POST, GET_ERRORS, LIKE_POST, UNLIKE_POST, ADD_COMMENT, GET_COMMENTS } from './types';

// get posts
export const getPosts = () => dispatch => {
  dispatch(setPostLoading())
  axios
    .get('/api/posts')
    .then(res =>
      dispatch({
        type: GET_POSTS,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_POSTS,
        payload: null
      })
    )
}

// Get post
export const getPost = postId => dispatch => {
  dispatch(setPostLoading())
  axios
    .get(`/api/posts/${postId}`)
    .then(res =>
      dispatch({
        type: GET_POST,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_POST,
        payload: null
      })
    )
}
// Add Post
export const addPost = postData => dispatch => {
  axios
    .post('/api/posts', postData)
    .then(res => {
      return dispatch({
        type: ADD_POST,
        payload: res.data
      })
    }

    )
    .catch(err => {
      return dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    }

    )
}

// Like post
export const likePost = postId => dispatch => {
  axios
    .post(`/api/posts/like/${postId}`)
    .then(res =>
      dispatch({
        type: LIKE_POST,
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

// Remove Like
export const removeLike = postId => dispatch => {
  axios
    .post(`/api/posts/unlike/${postId}`)
    .then(res =>
      dispatch({
        type: UNLIKE_POST,
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

export const addComment = (postId, comment) => dispatch => {
  axios
    .post(`/api/posts/comment/${postId}`, comment)
    .then(res =>
      dispatch({
        type: ADD_COMMENT,
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
// get all comments and add to post.comments

export const getComments = postId => dispatch => {
  console.log(postId)
  axios
    .get(`/api/posts/comments/${postId}`)
    .then(res => {
      return dispatch({
        type: GET_COMMENTS,
        payload: res.data
      })
    })
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    )
}

export const deletePost = postId => dispatch => {
  axios
    .delete(`/api/posts/${postId}`)
    .then(post =>
      dispatch({
        type: DELETE_POST,
        payload: postId
      })
    )
    .catch(err => console.log(err))
}

export const setPostLoading = () => {
  return {
    type: POST_LOADING
  }
}
