import axios from 'axios'

const request = axios.create({
  baseURL: 'https://api-exercise-sopi.vercel.app/api/v1/'
})

const get = async (path, options = {}) => {
  const response = await request.get(path, options)
  return response.data
}

export default request
export { get }
