import { Routes, Route } from 'react-router-dom'
import './App.css'
import Products from './pages/Products'
import CreateProduct from './pages/CreateProduct'

function App() {
    return (
        <main className="main-content">
            <Routes>
                <Route path="/products" element={<Products />} />
                <Route path="/products/new" element={<CreateProduct />} />
            </Routes>
        </main>
    )
}

export default App
