import React, { useState } from 'react'
import { InputText } from 'primereact/inputtext'
import { Button } from 'primereact/button'
import VariantList from './VariantList'

import ShopifyCard from './ShopifyCard'

export default function VariantsEditor() {
    const [variants, setVariants] = useState([])
    return (
        <ShopifyCard
            title=""
            children={
                <>
                    {variants.map((variant, index) => (
                        <div className="shopify-inner-card" key={index}>
                            <div className="flex flex-wrap gap-3 p-fluid" key={index}>
                                <div className="card flex-1 flex flex-wrap gap-3" key={index}>
                                    <label htmlFor="currency-germany" className="font-bold block mb-2">
                                        Option Type
                                    </label>
                                    <div className="input-with-delete">
                                        <InputText
                                            value={variant.optionName}
                                            placeholder="Type"
                                            onChange={(e) => {
                                                let new_variants = [...variants]
                                                new_variants[index].optionName = e.target.value
                                                setVariants(new_variants)
                                            }}
                                        />
                                        <Button
                                            className="p-button-outlined p-button-danger custom-delete-button"
                                            type="submit"
                                            icon="pi pi-trash"
                                            onClick={() => {
                                                let new_variants = [...variants]
                                                new_variants.splice(index, 1)
                                                setVariants(new_variants)
                                            }}
                                        ></Button>
                                    </div>
                                    <label htmlFor="currency-germany" className="font-bold block mb-2">
                                        Attributes
                                    </label>
                                    {variant.optionValues.map((value, valIndex) => (
                                        <div className="input-with-delete" key={valIndex}>
                                            <InputText
                                                key={valIndex}
                                                value={value}
                                                className="custom-input"
                                                placeholder="Attribute"
                                                onChange={(e) => {
                                                    let new_variants = [...variants]
                                                    new_variants[index].optionValues[valIndex] = e.target.value
                                                    setVariants(new_variants)
                                                }}
                                            />
                                            <Button
                                                className="p-button-outlined p-button-danger custom-delete-button"
                                                type="submit"
                                                icon="pi pi-trash"
                                                onClick={() => {
                                                    let new_variants = [...variants]
                                                    new_variants[index].optionValues.splice(valIndex, 1)
                                                    setVariants(new_variants)
                                                }}
                                            ></Button>
                                        </div>
                                    ))}
                                    <Button
                                        className="p-button-outlined p-button-secondary custom-add-option-button"
                                        type="submit"
                                        icon="pi pi-plus"
                                        onClick={() => {
                                            let new_variants = [...variants]
                                            new_variants[index].optionValues = [...new_variants[index].optionValues, '']
                                            setVariants(new_variants)
                                        }}
                                    >
                                        Add Attribute
                                    </Button>
                                </div>
                            </div>
                        </div>
                    ))}
                    <div className="flex flex-wrap gap-3 p-fluid">
                        <div className="card flex-1 flex flex-wrap gap-3">
                            <Button
                                className="p-button-outlined p-button-secondary custom-add-option-button"
                                type="submit"
                                icon="pi pi-plus"
                                onClick={() => {
                                    setVariants([...variants, { optionName: '', optionValues: [''] }])
                                }}
                            >
                                Add Variant
                            </Button>
                        </div>
                    </div>
                    <VariantList variants={variants} />
                </>
            }
        ></ShopifyCard>
    )
}
