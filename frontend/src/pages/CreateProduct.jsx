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

import { Dialog } from 'primereact/dialog'

import ShopifyCard from '../components/ShopifyCard'

const CreateProduct = () => {
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
    const [variants, setVariants] = useState([])
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
                    </>
                }
            ></ShopifyCard>
            <ShopifyCard
                title=""
                children={
                    <>
                        {variants.map((variant, index) => (
                            <div className="shopify-inner-card" key={index}>
                                <div className="flex flex-wrap gap-3 p-fluid" key={index}>
                                    <div className="card flex-1 flex flex-wrap gap-3" key={index}>
                                        {' '}
                                        <label htmlFor="currency-germany" className="font-bold block mb-2">
                                            Option Type
                                        </label>
                                        <div className="input-with-delete">
                                            <InputText
                                                value={variant.optionName}
                                                placeholder="Type"
                                                onChange={(e) => {
                                                    let new_variants = [...variants]
                                                    new_variants[index].optionName = e.target.value
                                                    setVariants(new_variants)
                                                }}
                                            />
                                            <Button
                                                className="p-button-outlined p-button-danger custom-delete-button"
                                                type="submit"
                                                icon="pi pi-trash"
                                                onClick={() => {
                                                    let new_variants = [...variants]
                                                    new_variants.splice(index, 1)
                                                    setVariants(new_variants)
                                                }}
                                            ></Button>
                                        </div>
                                        <label htmlFor="currency-germany" className="font-bold block mb-2">
                                            Attributes
                                        </label>
                                        {variant.optionValues.map((value, valIndex) => (
                                            <div className="input-with-delete" key={valIndex}>
                                                <InputText
                                                    key={valIndex}
                                                    value={value}
                                                    className="custom-input"
                                                    placeholder="Attribute"
                                                    onChange={(e) => {
                                                        let new_variants = [...variants]
                                                        new_variants[index].optionValues[valIndex] = e.target.value
                                                        setVariants(new_variants)
                                                    }}
                                                />
                                                <Button
                                                    className="p-button-outlined p-button-danger custom-delete-button"
                                                    type="submit"
                                                    icon="pi pi-trash"
                                                    onClick={() => {
                                                        let new_variants = [...variants]
                                                        new_variants[index].optionValues.splice(valIndex, 1)
                                                        setVariants(new_variants)
                                                    }}
                                                ></Button>
                                            </div>
                                        ))}
                                        <Button
                                            className="p-button-outlined p-button-secondary custom-add-option-button"
                                            type="submit"
                                            icon="pi pi-plus"
                                            onClick={() => {
                                                let new_variants = [...variants]
                                                new_variants[index].optionValues = [
                                                    ...new_variants[index].optionValues,
                                                    '',
                                                ]
                                                setVariants(new_variants)
                                            }}
                                        >
                                            Add Attribute
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        ))}
                        <div className="flex flex-wrap gap-3 p-fluid">
                            <div className="card flex-1 flex flex-wrap gap-3">
                                <Button
                                    className="p-button-outlined p-button-secondary custom-add-option-button"
                                    type="submit"
                                    icon="pi pi-plus"
                                    onClick={() => {
                                        setVariants([...variants, { optionName: '', optionValues: [''] }])
                                    }}
                                >
                                    Add Variant
                                </Button>
                            </div>
                        </div>
                        <VariantList variants={variants} />
                    </>
                }
            ></ShopifyCard>

            <Button
                className="p-fluid"
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

export default CreateProduct
