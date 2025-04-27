import api from './axiosConfig'

export const fetchCategories = () => api.get('/categories')
export const createCategory = (n, d) => api.post('/categories', { name: n, description: d })
