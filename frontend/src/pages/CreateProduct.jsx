import { useState } from 'react'
import { Button } from 'primereact/button'
import { useNavigate } from 'react-router-dom'
import { createProduct } from '../api/products'
import { useForm } from 'react-hook-form'

import ShopifyCard from '../components/ShopifyCard'
import VariantsEditor from '../components/VariantsEditor'
import { ProductForm } from '../components/ProductForm'

export default function CreateProduct() {
    const navigate = useNavigate()

    const defaultValues = {
        name: '',
        price: null,
        itemNumber: '',
        brand: '',
        quantity: 0,
        threshold: 0,
        description: '',
        category: {},
    }

    const {
        control,
        formState: { errors },
        handleSubmit,
        reset,
        setValue,
    } = useForm({ defaultValues })

    const onSubmit = (data) => {
        createProduct({
            name: data.name,
            item_number: data.itemNumber,
            category_id: data.category?.id,
            description: data.description,
            price: data.price,
            quantity: data.quantity,
            low_stock_threshold: data.threshold,
        })
        navigate('/products')
        reset()
    }

    return (
        <>
            <h1>Create Product</h1>
            <form onSubmit={handleSubmit(onSubmit)}>
                <ShopifyCard
                    title=""
                    children={<ProductForm control={control} errors={errors} setValue={setValue} />}
                ></ShopifyCard>
                <VariantsEditor />
                <Button type="submit">Create</Button>
            </form>
        </>
    )
}
