import axios from 'axios'

export const isUniqueHandle = (handle) => {
  axios.get(`/handle/${handle}`)
  .then(profile => {
    return !!profile
  })
}
