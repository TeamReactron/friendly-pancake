import axios from 'axios'

const api = axios.create({
    baseURL: 'http://localhost:4000/api',
})

export const getCountyByID = id => api.get(`/county/${id}`)
export const getAllCounties = () => api.get(`/counties`)
export const getFultonAccident = () => api.get(`/accidents`)
export const queryContyCountMonthly = (county, year) => api.get(`/accidents/${county}/${year}`)
export const queryCountWithParam = (date, county, state, bump, crossing, junction, noExit, stop, trafficSignal) => api.get(`accidents/${date}/${county}/${state}/${bump}/${crossing}/${junction}/${noExit}/${stop}/${trafficSignal}`)



const apis = {
    getCountyByID,
    getAllCounties,
    getFultonAccident,
    queryContyCountMonthly,
    queryCountWithParam
}

export default apis