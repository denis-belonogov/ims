import React from 'react'
import { InputNumber } from 'primereact/inputnumber'

export default function CurrencyInput({ label, value, onChange, className = 'card flex flex-column gap-3' }) {
    return (
        <div className={className}>
            <label className="font-bold text-left mb-2">{label}</label>
            <InputNumber
                inputId="currency-germany"
                value={value}
                onValueChange={onChange}
                mode="currency"
                currency="EUR"
                locale="de-DE"
                placeholder="0,00 €"
            />
        </div>
    )
}
