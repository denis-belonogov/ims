import CurrencyInput from '../components/CurrencyInput'
import NumberInput from '../components/NumberInput'
import TextInput from '../components/TextInput'
import TextAreaInput from '../components/TextAreaInput'
import { Dropdown } from 'primereact/dropdown'
import { Dialog } from 'primereact/dialog'
import CreateCategoryForm from './CreateCategoryForm'
import { useState, useEffect } from 'react'
import { Controller } from 'react-hook-form'
import { classNames } from 'primereact/utils'

import { fetchCategories } from '../api/categories'

export function ProductForm({ control, errors, setCategory, setValue }) {
    const [categories, setCategories] = useState([])
    const [visible, setVisible] = useState()

    const loadCategories = async () => {
        console.log(categories.data)
        try {
            let categories = await fetchCategories()
            let categories_array = [...categories.data, { name: '+ Add new category', id: -1, description: '' }]
            setCategories(categories_array)
        } catch (err) {
            console.log(err)
        }
    }

    useEffect(() => {
        loadCategories()
    }, [])
    const getFormErrorMessage = (name) => {
        return errors[name] && <small className="p-error font-bold text-left">{errors[name].message}</small>
    }
    return (
        <>
            <TextInput
                label="Name"
                name="name"
                placeholder="T-Shirt"
                control={control}
                errors={errors}
                rules={{
                    required: 'Name is required',
                }}
            />
            <TextAreaInput
                label="Description"
                name="name"
                control={control}
                errors={errors}
                placeholder="Description"
            />
            <div className="flex gap-3 p-fluid">
                <div className="card flex-1 flex flex-column gap-3">
                    <label className={classNames('font-bold text-left mb-2', { 'p-error': errors['category'] })}>
                        Category
                    </label>
                    <Controller
                        name="category"
                        control={control}
                        errors={errors}
                        rules={{}}
                        render={({ field, fieldState }) => (
                            <Dropdown
                                id={field.name}
                                value={field.value}
                                onChange={(e) => {
                                    if (e.value.id === -1) {
                                        setVisible(true)
                                    } else {
                                        field.onChange(e.target.value)
                                    }
                                }}
                                options={categories}
                                optionLabel="name"
                                placeholder="Select a Category"
                                className={classNames({ 'text-left': true, 'p-invalid': fieldState.invalid })}
                            />
                        )}
                    />
                    {getFormErrorMessage('category')}
                    <Dialog
                        header="Create Category"
                        visible={visible}
                        style={{
                            width: '50vw',
                        }}
                        onHide={() => {
                            if (!visible) return
                            setVisible(false)
                        }}
                    >
                        <CreateCategoryForm
                            categories={categories}
                            setVisible={setVisible}
                            setValue={setValue}
                            setCategories={setCategories}
                        />
                    </Dialog>
                </div>
                <TextInput
                    label="Brand"
                    name="brand"
                    placeholder="Brand"
                    className="card flex flex-1 flex-wrap gap-3"
                    control={control}
                    errors={errors}
                    rules={{}}
                />
            </div>
            <div className="flex gap-3 p-fluid">
                <CurrencyInput
                    label="Price"
                    name="price"
                    control={control}
                    errors={errors}
                    rules={{}}
                    className="card flex flex-1 flex-column gap-3"
                />
                <TextInput
                    label="Item Number"
                    name="itemNumber"
                    placeholder="ABC0123456789"
                    className="card flex flex-1 flex-wrap gap-3"
                    control={control}
                    errors={errors}
                    onChange={(e) => {
                        return e.target.value.toUpperCase()
                    }}
                />
            </div>
            <div className="flex flex-wrap gap-3 p-fluid">
                <NumberInput
                    label="Quantity"
                    name="quantity"
                    control={control}
                    errors={errors}
                    className="card flex flex-1 flex-wrap gap-3"
                />
                <NumberInput
                    label="Low Stock Threshold"
                    name="threshold"
                    control={control}
                    errors={errors}
                    className="card flex flex-1 flex-wrap gap-3"
                />
            </div>
        </>
    )
}
