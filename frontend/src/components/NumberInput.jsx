import React from 'react'
import { InputNumber } from 'primereact/inputnumber'

export default function IntegerInput({
    label,
    value,
    onChange,
    placeholder = 0,
    className = 'card flex flex-column gap-3',
}) {
    return (
        <div className={className}>
            <label className="font-bold text-left mb-2">{label}</label>
            <InputNumber value={value} showButtons placeholder={placeholder} onChange={onChange} />
        </div>
    )
}
