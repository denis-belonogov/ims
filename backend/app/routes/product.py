from flask import Blueprint, jsonify, request
from app.models.product import Product

product = Blueprint('products', __name__)


@product.route('/products', methods=['GET'])
def get_products():
    products = Product.query.all()
    return jsonify([product.to_dict() for product in products]), 200


@product.route('/products/<int:product_id>', methods=['GET'])
def get_product(product_id):
    product = Product.query.get_or_404(product_id)
    return jsonify(product.to_dict()), 200


@product.route('/products', methods=['POST'])
def create_product():
    data = request.get_json()
    new_product = Product(
        name=data['name'],
        sku=data['sku'],
        category_id=data['category_id'],
        brand=data['brand'],
        description=data.get('description', ''),
        image_url=data.get('image_url', ''),
        price=data['price'],
        quantity=data['quantity'],
        low_stock_threshold=data.get('low_stock_threshold', 10)
    )
    new_product.save()
    return jsonify(new_product.to_dict()), 201
