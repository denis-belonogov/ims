import api from './axiosConfig'

export const fetchProducts = () => api.get('/products')
export const createProduct = (data) => api.post('/products', data)
export const updateProduct = (id, data) => api.put('/products/' + id, data)
export const deleteProduct = (id) => api.delete('/products/' + id)
