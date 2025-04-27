from flask import Blueprint, jsonify, request
from app.models.product import Product
from app.db import db

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
        item_number=data.get('item_number', ''),
        category_id=data['category_id'],
        brand=data.get('brand', ''),
        description=data.get('description', ''),
        image_url=data.get('image_url', ''),
        price=data.get('price', 0),
        quantity=data['quantity'],
        low_stock_threshold=data.get('low_stock_threshold', 0)
    )
    db.session.add(new_product)
    db.session.commit()
    return jsonify(new_product.to_dict()), 201


@product.route('/products/<int:product_id>', methods=['POST'])
def update_product(product_id):
    data = request.get_json()
    product = Product.query.get_or_404(product_id)
    product.name = data.get('name', product.name)
    product.item_number = data.get('item_number', product.item_number)
    product.category_id = data.get('category_id', product.category_id)
    product.brand = data.get('brand', product.brand)
    product.description = data.get('description', product.description)
    product.image_url = data.get('image_url', product.image_url)
    product.price = data.get('price', product.price)
    product.quantity = data.get('quantity', product.quantity)
    product.low_stock_threshold = data.get(
        'low_stock_threshold', product.low_stock_threshold)
    db.session.commit()
    return jsonify(product.to_dict()), 200
