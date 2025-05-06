from flask import Blueprint, request, jsonify
from app.db import db
from sqlalchemy.exc import IntegrityError
from app.models.variant_option import VariantOption


variant_option_bp = Blueprint("variant_option", __name__)


@variant_option_bp.route("/variants/types/<int:type_id>/options", methods=["GET"])
def get_variant_options(type_id):
    variant_options = db.session.execute(
        db.select(VariantOption).filter_by(variant_type_id=type_id)
    ).scalars()
    return (
        jsonify([variant_option.to_dict() for variant_option in variant_options]),
        200,
    )


@variant_option_bp.route("/variants/options/<int:option_id>", methods=["GET"])
def get_variant_option(option_id):
    variant_option = VariantOption.query.get_or_404(option_id)
    return jsonify(variant_option.to_dict()), 200


@variant_option_bp.route("/variants/options", methods=["POST"])
def create_variant_option():
    data = request.get_json()
    new_variant_option = VariantOption(
        name=data["name"], variant_type_id=data["variant_type_id"]
    )
    db.session.add(new_variant_option)
    try:
        db.session.commit()
    except IntegrityError:
        db.session.rollback()
        return jsonify({"message": "Variant Option already exists"}), 400
    return jsonify(new_variant_option.to_dict()), 201


@variant_option_bp.route("/variants/options/<int:option_id>", methods=["PUT"])
def update_variant_option(option_id):
    data = request.get_json()
    variant_option = VariantOption.query.get_or_404(option_id)
    variant_option.name = data["name"]
    db.session.commit()
    return jsonify(variant_option.to_dict()), 200


@variant_option_bp.route("/variants/options/<int:option_id>", methods=["DELETE"])
def delete_variant_option(option_id):
    variant_option = VariantOption.query.get_or_404(option_id)
    db.session.delete(variant_option)
    db.session.commit()
    return jsonify({"message": "Variant Option deleted"}), 204
