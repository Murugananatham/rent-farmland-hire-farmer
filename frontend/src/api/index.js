import axios from 'axios'

const api = axios.create({
    baseURL: 'http://localhost:3003/api',
})


export const getAllDetails = () => api.get(`/land-details`)


const apis = {
    getAllDetails,
}

export default apis