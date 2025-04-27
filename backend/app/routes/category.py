from flask import Blueprint, jsonify, request
from app.models.category import Category
from app.db import db
category = Blueprint('categories', __name__)


@category.route('/categories', methods=['GET'])
def get_categories():
    categories = Category.query.all()
    return jsonify([category.to_dict() for category in categories]), 200


@category.route('/categories/<int:category_id>', methods=['GET'])
def get_category(category_id):
    category = Category.query.get_or_404(category_id)
    return jsonify(category.to_dict()), 200


@category.route('/categories', methods=['POST'])
def create_category():
    data = request.get_json()
    new_category = Category(
        name=data['name'],
        description=data.get('description', '')
    )
    db.session.add(new_category)
    db.session.commit()
    return jsonify(new_category.to_dict()), 201
