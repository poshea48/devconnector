import { CLEAR_ERRORS } from './types';

export const clearErrors = () => dispatch => {
  console.log("insided clearErrors")
  return dispatch({
    type: CLEAR_ERRORS,
    payload: {}
  })
}
