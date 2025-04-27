import React from 'react'
import ProductList from '../components/ProductList'
import { Button } from 'primereact/button'
import { useNavigate } from 'react-router-dom'

const Products = () => {
    return (
        <div>
            <h1>Products Page</h1>

            <ProductList />
        </div>
    )
}

export default Products
