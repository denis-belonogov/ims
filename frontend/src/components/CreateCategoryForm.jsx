import React, { useState } from 'react'
import { Button } from 'primereact/button'

import { createCategory } from '../api/categories'
import TextInput from './TextInput'
import TextAreaInput from './TextAreaInput'

export default function CreateCategoryForm({ setVisible, loadCategories, setCategory }) {
    const [name, setName] = useState('')
    const [description, setDescription] = useState()

    const onClick = async () => {
        setVisible(false)
        let category = await createCategory(name, description)
        loadCategories()
        setCategory(category.data)
    }

    return (
        <>
            <TextInput label="Name" value={name} onChange={(e) => setName(e.target.value)} placeholder="Cups" />
            <TextAreaInput
                label="Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Description"
            />
            <div className="card flex justify-content-end">
                <Button className="flex flex-wrap p-fluid" type="submit" onClick={onClick}>
                    Create
                </Button>
            </div>
        </>
    )
}
