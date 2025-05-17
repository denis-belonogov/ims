import { Controller } from 'react-hook-form'
import { InputNumber } from 'primereact/inputnumber'
import { classNames } from 'primereact/utils'

export default function CurrencyInput({
    label,
    name,
    placeholder = '0,00 €',
    control,
    errors = {},
    rules = {},
    onChange = (e) => {
        return e.target.value
    },
    className = 'card flex flex-column gap-3',
}) {
    const getFormErrorMessage = (name) => {
        return errors[name] && <small className="p-error font-bold text-left">{errors[name].message}</small>
    }
    return (
        <div className={className}>
            <label className={classNames('font-bold text-left mb-2', { 'p-error': errors[name] })}>{label}</label>
            <Controller
                name={name}
                control={control}
                rules={rules}
                render={({ field, fieldState }) => (
                    <InputNumber
                        id={field.name}
                        value={field.value}
                        onChange={(e) => field.onChange(onChange(e))}
                        mode="currency"
                        currency="EUR"
                        locale="de-DE"
                        placeholder={placeholder}
                        className={classNames({ 'p-invalid': fieldState.invalid })}
                    />
                )}
            />
            {getFormErrorMessage(name)}
        </div>
    )
}
