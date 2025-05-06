from flask import Blueprint, request, jsonify
from app.models.variant_type import VariantType
from app.db import db
from sqlalchemy.exc import IntegrityError

variant_type_bp = Blueprint("variant_type", __name__)


@variant_type_bp.route("/variants/types", methods=["GET"])
def get_variant_types():
    variant_types = VariantType.query.all()
    return jsonify([variant_type.to_dict() for variant_type in variant_types]), 200


@variant_type_bp.route("/variants/types/<int:variant_id>", methods=["GET"])
def get_variant_type(variant_id):
    variant_type = VariantType.query.get_or_404(variant_id)
    return jsonify(variant_type.to_dict()), 200


@variant_type_bp.route("/variants/types", methods=["POST"])
def create_variant_type():
    data = request.get_json()
    new_variant_type = VariantType(name=data["name"])
    db.session.add(new_variant_type)
    try:
        db.session.commit()
    except IntegrityError:
        db.session.rollback()
        return (jsonify({"message": "Variant Type already exists"}), 400)
    return jsonify(new_variant_type), 201


@variant_type_bp.route("/variants/types/<int:variant_id>", methods=["PUT"])
def update_variant_type(variant_id):
    data = request.get_json()
    variant_type = VariantType.query.get_or_404(variant_id)
    variant_type["name"] = data["name"]
    return jsonify(variant_type.to_dict()), 200


@variant_type_bp.route("/variants/types/<int:variant_id>", methods=["DELETE"])
def delete_variant_type(variant_id):
    variant_type = VariantType.query.get_or_404(variant_id)
    db.session.delete(variant_type)
    db.session.commit()
    return jsonify({"message": "Variant Type deleted"}), 204
