from flask import Blueprint, request, jsonify
from app.db import db
from sqlalchemy.exc import IntegrityError
from app.models.variant_attribute import VariantAttribute


variant_attribute_bp = Blueprint("variant_attribute", __name__)


@variant_attribute_bp.route("/variants/<int:variant_id>/attributes", methods=["GET"])
def get_variant_attributes(variant_id):
    variant_attributes = db.session.execute(
        db.select(VariantAttribute).filter_by(variant_id=variant_id)
    ).scalars()
    return (
        jsonify(
            [variant_attribute.to_dict() for variant_attribute in variant_attributes]
        ),
        200,
    )


@variant_attribute_bp.route("/variants/<int:variant_id>/attributes", methods=["POST"])
def create_variant_attribute(variant_id):
    data = request.get_json()
    if db.session.execute(
        db.select(VariantAttribute).filter(
            VariantAttribute.variant_id == variant_id,
            VariantAttribute.variant_type_id == data["variant_type_id"],
        )
    ).scalar_one_or_none():
        return jsonify({"message": "Attribute of this type already exists"}), 400
    new_variant_attribute = VariantAttribute(
        variant_id=variant_id,
        variant_type_id=data["variant_type_id"],
        variant_option_id=data["variant_option_id"],
    )
    db.session.add(new_variant_attribute)
    db.session.commit()
    return jsonify(new_variant_attribute.to_dict()), 201


@variant_attribute_bp.route("/variants/attributes/<int:attribute_id>", methods=["PUT"])
def update_variant_attribute(attribute_id):
    data = request.get_json()
    variant_attribute = VariantAttribute.query.get_or_404(attribute_id)
    variant_attribute.variant_type_id = data["variant_type_id"]
    variant_attribute.variant_option_id = data["variant_option_id"]
    db.session.commit()
    return jsonify(variant_attribute.to_dict()), 200


@variant_attribute_bp.route(
    "/variants/attributes/<int:attribute_id>", methods=["DELETE"]
)
def delete_variant_attribute(attribute_id):
    variant_attribute = VariantAttribute.query.get_or_404(attribute_id)
    db.session.delete(variant_attribute)
    db.session.commit()
    return jsonify({"message": "Variant Attribute deleted"}), 200
