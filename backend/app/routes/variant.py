from flask import Blueprint, request, jsonify
from app.db import db
from sqlalchemy.exc import IntegrityError
from app.models.variant import Variant

variant_bp = Blueprint("variants", __name__)


@variant_bp.route("/products/<int:product_id>/variants", methods=["GET"])
def get_variants(product_id):
    variants = db.session.execute(
        db.select(Variant).filter_by(product_id=product_id)
    ).scalars()
    return jsonify([variant.to_dict() for variant in variants]), 200


@variant_bp.route("/variants/<int:variant_id>", methods=["GET"])
def get_variant(variant_id):
    variant = Variant.query.get_or_404(variant_id)
    return jsonify(variant.to_dict()), 200


@variant_bp.route("/variants/", methods=["POST"])
def create_variant():
    data = request.get_json()
    required_fields = ["name", "product_id", "price", "quantity", "attributes"]
    if any(required_field not in data.keys() for required_field in required_fields):
        return jsonify({"message": "Required Field missing"}), 400
    new_variant = Variant(
        name=data["name"],
        product_id=data["product_id"],
        price=data["price"],
        stock=data.get["quantity"],
        attributes=data["attributes"],
    )
    db.session.add(new_variant)
    try:
        db.session.commit()
    except IntegrityError:
        db.session.rollback()
        return jsonify({"message": "Variant already exists"}), 400
    return jsonify(new_variant.to_dict()), 201


@variant_bp.route("/variants/<int:variant_id>", methods=["PUT"])
def update_variant(variant_id):
    data = request.get_json()
    variant = Variant.query.get_or_404(variant_id)
    variant.name = data.get("name", variant.name)
    variant.price = data.get("price", variant.price)
    variant.quantity = data.get("quantity", variant.quantity)
    variant.attributes = data.get("attributes", variant.attributes)
    try:
        db.session.commit()
    except IntegrityError:
        db.session.rollback()
        return jsonify({"message": "Variant already exists"}), 400
    return jsonify(variant.to_dict()), 200


@variant_bp.route("/variants/<int:variant_id>", methods=["DELETE"])
def delete_variant(variant_id):
    variant = Variant.query.get_or_404(variant_id)
    db.session.delete(variant)
    db.session.commit()
    return jsonify({"message": "Variant deleted"}), 204
