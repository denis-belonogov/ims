import React from 'react'
import { InputTextarea } from 'primereact/inputtextarea'

export default function TextAreaInput({
    label,
    value,
    onChange,
    placeholder,
    className = 'card flex flex-column gap-3',
}) {
    return (
        <div className={className}>
            <label className="font-bold text-left mb-2">{label}</label>
            <InputTextarea value={value} autoResize placeholder={placeholder} onChange={onChange} />
        </div>
    )
}
