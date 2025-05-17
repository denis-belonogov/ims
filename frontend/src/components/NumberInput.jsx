import { InputNumber } from 'primereact/inputnumber'
import { classNames } from 'primereact/utils'
import { Controller } from 'react-hook-form'

export default function NumberInput({
    label,
    name,
    placeholder = 0,
    control,
    errors = {},
    rules = {},
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
                        onChange={(e) => field.onChange(e.value)}
                        placeholder={placeholder}
                        showButtons
                        className={classNames({ 'p-invalid': fieldState.invalid })}
                    />
                )}
            />
            {getFormErrorMessage(name)}
        </div>
    )
}
