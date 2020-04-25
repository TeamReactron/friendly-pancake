import axios from 'axios'

const api = axios.create({
    baseURL: 'http://localhost:4000/api',
})

export const getCountyByID = id => api.get(`/county/${id}`)
export const getAllCounties = () => api.get(`/counties`)
export const getFultonAccident = () => api.get(`/accidents`)

const apis = {
    getCountyByID,
    getAllCounties,
    getFultonAccident,
}

export default apis