import { Card } from 'primereact/card'

export default function ShopifyCard({ title, children }) {
    return (
        <Card title={title} className="shopify-card">
            {children}
        </Card>
    )
}
