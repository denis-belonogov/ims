import React from 'react'
import { InputText } from 'primereact/inputtext'

export default function TextInput({ label, value, onChange, placeholder, className = 'card flex flex-column gap-3' }) {
    return (
        <div className={className}>
            <label className="font-bold text-left mb-2">{label}</label>
            <InputText value={value} placeholder={placeholder} onChange={onChange} />
        </div>
    )
}
