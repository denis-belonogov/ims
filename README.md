# Shopify-Style Inventory Management System

A customizable, full-stack Inventory Management System inspired by Shopify, built for small businesses like beauty salons and custom printing shops.

---

## 🚀 Tech Stack

**Frontend:**
- React
- PrimeReact
- Vite
- Axios

**Backend:**
- Flask
- SQLAlchemy
- Marshmallow
- Flask-CORS

**Database:**
- SQLite (for dev)
- PostgreSQL (for production-ready use)

---

## 📁 Monorepo Structure

```
ims/
├── backend/         # Flask API
│   ├── app/         # App package (models, routes, config)
│   ├── main.py      # Entry point
│   ├── seed.py      # Demo data
│   └── requirements.txt
├── frontend/        # React + PrimeReact UI
│   ├── src/
│   ├── public/
│   └── package.json
├── README.md
└── .gitignore
```

---

## 📦 Features (MVP)

✅ Product and Variant Management  
✅ Inventory Tracking per Variant  
✅ Manual Stock Adjustments with Reason  
✅ SKU Management  
✅ PrimeReact UI (Shopify-inspired)  
🛠️ No auth for MVP — intended for local demo/development use  

---

## 📌 Project Board

You can find ongoing development and planned features in the [GitHub Projects board](https://github.com/YOUR_USERNAME/YOUR_REPO_NAME/projects).

---

## 🛠️ Getting Started

### Backend
```bash
cd backend
python3 -m venv venv
source venv/bin/activate
pip install -r requirements.txt
python main.py
```

### Frontend
```bash
cd frontend
npm install
npm run dev
```

---

## 🌱 Seed the Database

```bash
python seed.py
```

---

## 🧠 Post-MVP Ideas

- User auth & roles
- Multi-location stock tracking
- Barcode scanning
- Inventory dashboard
- Supplier management
- Purchase & sales orders
- Product bundling/composition

---

## 📄 License

MIT License

---

## 👋 Contributions

Issues and pull requests are welcome! Check the feature board or open a discussion.
