import React, { useState, useEffect } from 'react'
import { InputText } from 'primereact/inputtext'
import { InputNumber } from 'primereact/inputnumber'

import ShopifyCard from '../components/ShopifyCard'
import { DataTable } from 'primereact/datatable'
import { Column } from 'primereact/column'

function BuildVariantsList(variants) {
    let variants_list = []
    let new_variants = [...variants]
    if (new_variants.length == 0) return variants_list
    if (new_variants.length == 1)
        return new_variants[0].optionValues.map((parent_option) => {
            return { parent: parent_option, name: parent_option }
        })
    for (const parent_option of new_variants[0].optionValues) {
        if (parent_option != '') {
            for (var i = 1; i < new_variants.length; i++) {
                let child_options = new_variants[i]
                let list = child_options.optionValues
                    .filter((v) => v != '')
                    .map((child_option) => {
                        return { parent: parent_option, name: child_option }
                    })
                variants_list = [...variants_list, ...list]
            }
        }
    }

    return variants_list
}

export default function VariantList({ variants }) {
    const [expandedRows, setExpandedRows] = useState([])
    const [variantList, setVariantList] = useState([])
    const [quantity, setQuantity] = useState(0)
    const [price, setPrice] = useState()
    const [itemNumber, setItemNumber] = useState()

    function headerTemplate(data) {
        return (
            <div className="flex">
                <span className="flex-1 ml-2 font-bold line-height-3">{data.parent}</span>
                <InputNumber
                    style={{ height: '40px' }}
                    className="flex-1"
                    inputId="currency-germany"
                    value={price}
                    onValueChange={(e) => setPrice(e.value)}
                    mode="currency"
                    currency="EUR"
                    locale="de-DE"
                    placeholder="0,00 €"
                />
                <InputNumber
                    style={{ height: '40px' }}
                    className="flex-1"
                    value={quantity}
                    onValueChange={(e) => setQuantity(e.value)}
                    placeholder="0"
                    showButtons
                />
                <InputText
                    style={{ height: '40px' }}
                    className="flex-1"
                    value={itemNumber}
                    onChange={(e) => {
                        setItemNumber(e.target.value.toUpperCase())
                    }}
                    placeholder="ABC0123456789"
                />
            </div>
        )
    }

    useEffect(() => {
        setVariantList(BuildVariantsList(variants))
        console.log(variantList)
        console.log(expandedRows)
    }, [variants])
    return (
        <>
            <h2>Variants</h2>
            {variants.length > 0 && (
                <ShopifyCard
                    title=""
                    children={
                        <DataTable
                            value={variantList}
                            rowGroupMode="subheader"
                            groupRowsBy="parent"
                            expandableRowGroups
                            expandedRows={expandedRows}
                            onRowToggle={(e) => setExpandedRows(e.data)}
                            rowGroupHeaderTemplate={headerTemplate}
                            tableStyle={{ minWidth: '50rem' }}
                        >
                            <Column field="name" header="Name" style={{ width: '20%' }}></Column>
                            <Column field="price" header="Price" style={{ width: '20%' }}></Column>
                            <Column field="quantity" header="Quantity" style={{ width: '20%' }}></Column>
                            <Column field="item_number" header="Artikelnummer" style={{ width: '20%' }}></Column>
                        </DataTable>
                    }
                ></ShopifyCard>
            )}
        </>
    )
}
