import axios from 'axios'

const request = axios.create({
  baseURL: 'https://api-exercise-trello.vercel.app/api/v1/'
})

const get = async (path, option = {}, apiKey) => {
  if (apiKey) {
    if (!option.headers) {
      option.headers = {}
    }
    option.headers['X-Api-Key'] = localStorage.getItem('apiKey')
  }
  const response = await request.get(path, option)
  return response.data
}

const post = async (path, body = {}) => {
  const headers = {
    headers: {
      'X-Api-Key': localStorage.getItem('apiKey')
    }
  }
  const response = await request.post(path, body, headers)
  return response.data
}

export default request
export { get, post }
