import { POST_LOADING, GET_POST, GET_POSTS, ADD_POST, DELETE_POST, LIKE_POST, UNLIKE_POST, ADD_COMMENT, GET_COMMENTS } from '../actions/types'

const initialState = {
  posts: [],
  post: {},
  loading: false
}

function updatePosts(posts, newPost) {
  return posts.map(post => {
    if (post._id === newPost._id) {
      return {
        ...post,
        ...newPost
      }
    } else {
      return post
    }
  })
}

export default (state = initialState, action) => {
  switch (action.type) {
    case POST_LOADING:
      return {
        ...state,
        loading: true
      }
    case GET_POSTS:
      return {
        ...state,
        posts: action.payload,
        loading: false
      }
    case GET_POST:
      return {
        ...state,
        post: action.payload,
        loading: false
      }
    case ADD_POST:
      return {
        ...state,
        posts: [action.payload, ...state.posts]
      }
    case DELETE_POST:
      return {
        ...state,
        posts: state.posts.filter(post => post._id !== action.payload)
      }
    case LIKE_POST:
      return {
        ...state,
        posts: updatePosts(state.posts, action.payload)
      }
    case UNLIKE_POST:
      return {
        ...state,
        posts: updatePosts(state.posts, action.payload)
      }
    case ADD_COMMENT:
      return {
        ...state,
        post: action.payload
      }
    case GET_COMMENTS:
      return {
        ...state,
        post: {...state.post, comments: action.payload}
      }
    default:
      return state
  }
}
