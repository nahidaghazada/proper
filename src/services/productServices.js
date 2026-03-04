import { instance } from "./instance"

const getAllProducts = async () => {
    const res = await instance.get('/product')
    return res.data
}

const getProductById = async (id) => {
    const res = await instance.get(`/product/${id}`)
    return res.data
}

const addProduct = async (productData) => {
  const res = await instance.post('/product', productData)
  return res.data
}

const updateProduct = async (id, updatedData) => {
  const res = await instance.put(`/product/${id}`, updatedData)
  return res.data
}

const deleteProduct = async (id) => {
  const res = await instance.delete(`/product/${id}`)
  return res.data
}

export { getAllProducts, getProductById, addProduct, updateProduct, deleteProduct }