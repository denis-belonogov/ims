import React, { useState } from 'react'
import { Button } from 'primereact/button'
import { useForm } from 'react-hook-form'

import { createCategory } from '../api/categories'
import TextInput from './TextInput'
import TextAreaInput from './TextAreaInput'

export default function CreateCategoryForm({ categories, setVisible, setValue, setCategories }) {
    const defaultValues = {
        name: '',
        description: '',
    }

    const {
        control,
        formState: { errors },
        handleSubmit,
        reset,
    } = useForm({ defaultValues })

    const onSubmit = async (data) => {
        setVisible(false)
        let category = await createCategory(data.name, data.description)
        let cats = categories
        console.log(category)
        setCategories([...cats, category.data])
        setValue('category', category.data)
        reset()
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <TextInput
                label="Name"
                name="name"
                placeholder="T-Shirt"
                control={control}
                errors={errors}
                rules={{ required: 'Name is required' }}
            />
            <TextAreaInput
                label="Description"
                name="description"
                control={control}
                errors={errors}
                placeholder="Description"
            />
            <div className="card flex justify-content-end">
                <Button className="flex flex-wrap p-fluid" type="submit">
                    Create
                </Button>
            </div>
        </form>
    )
}
