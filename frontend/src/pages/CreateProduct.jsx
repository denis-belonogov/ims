import React, { useState, useEffect } from 'react'
import { InputText } from 'primereact/inputtext'
import { InputNumber } from 'primereact/inputnumber'
import { Dropdown } from 'primereact/dropdown'
import { Button } from 'primereact/button'
import { useNavigate } from 'react-router-dom'
import VariantList from '../components/VariantList'

import { InputTextarea } from 'primereact/inputtextarea'
import CreateCategoryForm from '../components/CreateCategoryForm'
import { fetchCategories } from '../api/categories'
import { createProduct } from '../api/products'
import CurrencyInput from '../components/CurrencyInput'
import NumberInput from '../components/NumberInput'
import TextInput from '../components/TextInput'
import TextAreaInput from '../components/TextAreaInput'

import { Dialog } from 'primereact/dialog'

import ShopifyCard from '../components/ShopifyCard'
import VariantsEditor from '../components/VariantsEditor'

export default function CreateProduct() {
    const navigate = useNavigate()
    const [name, setName] = useState()
    const [price, setPrice] = useState()
    const [itemNumber, setItemNumber] = useState()
    const [brand, setBrand] = useState()
    const [quantity, setQuantity] = useState(0)
    const [threshold, setThreshold] = useState(0)
    const [description, setDescription] = useState()
    const [category, setCategory] = useState()
    const [visible, setVisible] = useState()
    const [categories, setCategories] = useState([])

    const loadCategories = async () => {
        console.log(categories.data)
        try {
            let categories = await fetchCategories()
            let categories_array = [...categories.data, { name: '+ Add new category', id: 'new' }]
            setCategories(categories_array)
        } catch (err) {
            console.log(err)
        }
    }
    useEffect(() => {
        loadCategories()
    }, [])

    const handleCategoryChange = (e) => {
        if (e.value.id === 'new') {
            setVisible(true)
        } else {
            setCategory(e.value.name)
        }
    }

    return (
        <>
            <h1>Create Product</h1>
            <ShopifyCard
                title=""
                children={
                    <>
                        <TextInput
                            label="Name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="T-Shirt"
                        />
                        <TextAreaInput
                            label="Description"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            placeholder="Description"
                        />
                        <div className="flex gap-3 p-fluid">
                            <div className="card flex-1 flex flex-column gap-3">
                                <label className="font-bold text-left mb-2">Category</label>
                                <Dropdown
                                    value={category}
                                    onChange={handleCategoryChange}
                                    options={categories}
                                    optionLabel="name"
                                    placeholder="Select a Category"
                                    className="text-left"
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
                            <TextInput
                                label="Brand"
                                value={brand}
                                onChange={(e) => setBrand(e.target.value)}
                                placeholder="Brand"
                                className="card flex flex-1 flex-wrap gap-3"
                            />
                        </div>
                        <div className="flex gap-3 p-fluid">
                            <CurrencyInput
                                label="Price"
                                value={price}
                                onChange={(e) => setPrice(e.value)}
                                className="card flex flex-1 flex-column gap-3"
                            />
                            <TextInput
                                label="Item Number"
                                value={itemNumber}
                                onChange={(e) => setItemNumber(e.target.value.toUpperCase())}
                                placeholder="ABC0123456789"
                                className="card flex flex-1 flex-wrap gap-3"
                            />
                        </div>
                        <div className="flex flex-wrap gap-3 p-fluid">
                            <NumberInput
                                label="Quantity"
                                value={quantity}
                                onChange={(e) => setQuantity(e.value)}
                                className="card flex flex-1 flex-wrap gap-3"
                            />
                            <NumberInput
                                label="Low Stock Threshold"
                                value={threshold}
                                onChange={(e) => setThreshold(e.value)}
                                className="card flex flex-1 flex-wrap gap-3"
                            />
                        </div>
                    </>
                }
            ></ShopifyCard>
            <VariantsEditor />
            <Button
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
        </>
    )
}
