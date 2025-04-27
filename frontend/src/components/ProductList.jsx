import React, { useEffect, useReducer } from 'react'
import { DataTable } from 'primereact/datatable'
import { Column } from 'primereact/column'
import { fetchProducts, updateProduct } from '../api/products'
import { Button } from 'primereact/button'
import { useNavigate } from 'react-router-dom'

import { Panel } from 'primereact/panel'

import 'primeicons/primeicons.css'
const reducer = (state, action) => {
    switch (action.type) {
        case 'set':
            return action.payload.map((product) => ({
                ...product,
                initial: product.quantity, // Set initial = current when loading
                hasChanges: false,
            }))

        case 'increment': {
            return state.map((product) => {
                if (product.id === action.id) {
                    const new_qty = product.quantity + 1
                    return {
                        ...product,
                        quantity: new_qty,
                        hasChanges: new_qty !== product.initial,
                    }
                } else return product
            })
        }
        case 'decrement':
            return state.map((product) => {
                if (product.id === action.id) {
                    const new_qty = Math.max(0, product.quantity - 1)
                    return {
                        ...product,
                        quantity: new_qty,
                        hasChanges: new_qty !== product.initial,
                    }
                } else return product
            })

        case 'undo':
            return state.map((product) => ({
                ...product,
                quantity: product.initial,
                hasChanges: false,
            }))

        case 'accept': {
            return state.map((product) => {
                if (product.hasChanges) {
                    updateProduct(product.id, { quantity: product.quantity })
                }
                return {
                    ...product,
                    initial: product.quantity,
                    hasChanges: false,
                }
            })
        }
        default:
            return state
    }
}

const ProductList = () => {
    const navigate = useNavigate()
    const [products, dispatch] = useReducer(reducer, [])
    useEffect(() => {
        const loadProducts = async () => {
            try {
                const p = await fetchProducts()
                dispatch({ type: 'set', payload: p.data })
            } catch (err) {
                console.log(err)
            }
        }

        loadProducts()
    }, [])

    const priceBodyTemplate = (product) => {
        return product.price.toLocaleString('de-DE', { style: 'currency', currency: 'EUR' })
    }

    const categoryBodyTemplate = (product) => {
        return product.category.name
    }

    const quantityTemplate = (product) => {
        return (
            <div className="flex p-ai-center">
                <Button className="but" icon="pi pi-pencil" onClick={() => ({})} />
                <div className="test">{product.quantity}</div>{' '}
                <div className="vertical-button">
                    <Button
                        onClick={() => {
                            dispatch({ type: 'increment', id: product.id })
                        }}
                    >
                        +
                    </Button>
                    <Button
                        onClick={() => {
                            dispatch({ type: 'decrement', id: product.id })
                        }}
                    >
                        -
                    </Button>
                </div>
            </div>
        )
    }
    return (
        <div>
            <DataTable value={products} tableStyle={{ minWidth: '50rem' }}>
                <Column field="id" header="Id" />
                <Column field="name" header="Name" />
                <Column field="item_number" header="Artikelnummer" />
                <Column field="category" header="Category" body={categoryBodyTemplate} />
                <Column field="price" header="Price" body={priceBodyTemplate} />
                <Column field="brand" header="Brand" />
                <Column field="quantity" header="Quantity" body={(rowData) => quantityTemplate(rowData)} />
            </DataTable>
            <Button
                label="Add Product"
                icon="pi pi-plus"
                className="mt-2 p-button-success flex justify-content-end"
                onClick={() => navigate('/products/new')}
            />
            {products.some((p) => {
                console.log(products)
                return p.hasChanges
            }) && (
                <Panel className="unsaved-banner">
                    <div
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            margin: 'auto',
                            padding: '1rem',
                        }}
                    >
                        <i className="pi pi-info-circle" style={{ marginRight: '0.5rem' }} />
                        <p className="m-0">You have unsaved changes</p>
                        <Button label="Undo" severity="danger" raised onClick={() => dispatch({ type: 'undo' })} />
                        <Button
                            label="Save"
                            severity="success"
                            style={{ marginLeft: '0.5rem' }}
                            raised
                            onClick={() => dispatch({ type: 'accept' })}
                        />
                    </div>
                </Panel>
            )}
        </div>
    )
}

export default ProductList
