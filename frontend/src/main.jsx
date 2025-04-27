import 'primereact/resources/themes/lara-light-indigo/theme.css' // or any other theme
import 'primereact/resources/primereact.min.css'
import 'primeicons/primeicons.css'
import './index.css'
import { BrowserRouter } from 'react-router-dom'

import React from 'react'
import ReactDOM from 'react-dom/client'

import App from './App.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
    <BrowserRouter>
        <React.StrictMode>
            <App />
        </React.StrictMode>
    </BrowserRouter>
)
