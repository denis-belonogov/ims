import React, { useState } from 'react'
import { InputText } from 'primereact/inputtext'
import { Button } from 'primereact/button'

import { InputTextarea } from 'primereact/inputtextarea'
import { createCategory } from '../api/categories'

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
            <div className="card flex flex-wrap gap-3 p-fluid">
                <label className="font-bold block mb-2">Name</label>
                <InputText
                    className="rounded-2xl"
                    placeholder="Cups"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
            </div>
            <div className="card flex flex-column gap-3 p-fluid">
                <label className="font-bold text-left block mb-2">Description</label>
                <InputTextarea value={description} autoResize onChange={(e) => setDescription(e.target.value)} />
            </div>
            <div className="card flex justify-content-end">
                <Button className="flex flex-wrap p-fluid" type="submit" onClick={onClick}>
                    Create
                </Button>
            </div>
        </>
    )
}
