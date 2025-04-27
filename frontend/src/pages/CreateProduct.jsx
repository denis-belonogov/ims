import React, { useState, useEffect } from 'react'
import { InputText } from 'primereact/inputtext'
import { InputNumber } from 'primereact/inputnumber'
import { Dropdown } from 'primereact/dropdown'
import { Button } from 'primereact/button'
import { useNavigate } from 'react-router-dom'

import { InputTextarea } from 'primereact/inputtextarea'
import CreateCategoryForm from '../components/CreateCategoryForm'
import { fetchCategories } from '../api/categories'
import { createProduct } from '../api/products'

import { Dialog } from 'primereact/dialog'

import { Card } from 'primereact/card'

const CreateProduct = () => {
    const navigate = useNavigate()
    const [name, setName] = useState()
    const [price, setPrice] = useState()
    const [itemNumber, setItemNumber] = useState()
    const [brand, setBrand] = useState()
    const [quantity, setQuantity] = useState()
    const [threshold, setThreshold] = useState()
    const [description, setDescription] = useState()
    const [category, setCategory] = useState()
    const [visible, setVisible] = useState()
    const [categories, setCategories] = useState([])

    const loadCategories = async () => {
        console.log(categories.data)
        try {
            let categories = await fetchCategories()
            console.log(categories.data)
            let categories_array = [...categories.data, '+ Add new category']
            setCategories(categories_array)
        } catch (err) {
            console.log(err)
        }
    }
    useEffect(() => {
        loadCategories()
    }, [])

    const handleCategoryChange = (e) => {
        if (e.value === '+ Add new category') {
            setVisible(true)
        } else {
            setCategory(e.value)
        }
    }

    return (
        <>
            <Card className="mb-2" title="Create Product">
                <div className="card flex flex-wrap gap-3 p-fluid">
                    <label className="font-bold block mb-2">Name</label>
                    <InputText
                        className="rounded-2xl"
                        placeholder="T-Shirt"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                </div>

                <div className="card flex flex-column gap-3 p-fluid">
                    <label className="font-bold text-left block mb-2">Description</label>

                    <InputTextarea
                        value={description}
                        autoResize
                        placeholder="Description"
                        onChange={(e) => setDescription(e.target.value)}
                    />
                </div>
                <div className="flex flex-wrap gap-3 p-fluid">
                    <div className="card flex-1 flex flex-wrap gap-3 p-fluid">
                        <label className="font-bold block mb-2">Category</label>
                        <Dropdown
                            value={category}
                            onChange={handleCategoryChange}
                            options={categories}
                            optionLabel="name"
                            placeholder="Select a Category"
                            className="w-full text-left"
                        />
                        <Dialog
                            header="Create Category"
                            visible={visible}
                            style={{ width: '50vw' }}
                            onHide={() => {
                                if (!visible) return
                                setVisible(false)
                            }}
                        >
                            <CreateCategoryForm
                                setVisible={setVisible}
                                loadCategories={loadCategories}
                                setCategory={setCategory}
                            />
                        </Dialog>
                    </div>
                    <div className="card flex flex-1 flex-wrap gap-3 p-fluid">
                        <label htmlFor="currency-germany" className="font-bold block mb-2">
                            Brand
                        </label>
                        <InputText
                            value={brand}
                            onChange={(e) => {
                                setBrand(e.target.value)
                            }}
                            placeholder="Brand"
                        />
                    </div>
                </div>
                <div className="flex flex-wrap gap-3 p-fluid">
                    <div className="card flex flex-1 flex-wrap gap-3 p-fluid">
                        <label htmlFor="currency-germany" className="font-bold block mb-2">
                            Price
                        </label>
                        <InputNumber
                            inputId="currency-germany"
                            value={price}
                            onValueChange={(e) => setPrice(e.value)}
                            mode="currency"
                            currency="EUR"
                            locale="de-DE"
                            placeholder="0,00 €"
                        />
                    </div>{' '}
                    <div className="card flex flex-1 flex-wrap gap-3 p-fluid">
                        <label htmlFor="currency-germany" className="font-bold block mb-2">
                            Item Number
                        </label>
                        <InputText
                            value={itemNumber}
                            onChange={(e) => {
                                setItemNumber(e.target.value.toUpperCase())
                            }}
                            placeholder="ABC0123456789"
                        />
                    </div>
                </div>

                <div className="flex flex-wrap gap-3 p-fluid">
                    <div className="card flex-1 flex flex-wrap gap-3">
                        <label className="font-bold block mb-2">Quantity</label>
                        <InputNumber
                            className="p-fluid"
                            value={quantity}
                            onValueChange={(e) => setQuantity(e.value)}
                            placeholder="0"
                            showButtons
                        />
                    </div>
                    <div className="card flex flex-1 flex-wrap gap-3">
                        <label className="font-bold block mb-2">Low Stock Threshold</label>
                        <InputNumber
                            className="p-fluid"
                            value={threshold}
                            onValueChange={(e) => setThreshold(e.value)}
                            placeholder="0"
                            showButtons
                        />
                    </div>
                </div>
                <Button
                    className="p-fluid"
                    type="submit"
                    onClick={() => {
                        createProduct({
                            name: name,
                            item_number: itemNumber,
                            category_id: category.id,
                            description: description,
                            price: price,
                            quantity: quantity,
                            low_stock_threshold: threshold,
                        })
                        navigate('/products')
                    }}
                >
                    Create
                </Button>
            </Card>
        </>
    )
}

export default CreateProduct
