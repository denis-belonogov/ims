from app import create_app
from app.routes.product import product
from app.routes.category import category
app = create_app()

app.register_blueprint(product)
app.register_blueprint(category)

if __name__ == "__main__":
    app.run(debug=True)
