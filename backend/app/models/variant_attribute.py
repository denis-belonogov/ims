from sqlalchemy import Column, Integer, ForeignKey
from sqlalchemy.orm import relationship
from app.db import db


class VariantAttribute(db.Model):
    __tablename__ = "variant_attributes"

    id = Column(Integer, primary_key=True, index=True)
    variant_id = Column(Integer, ForeignKey("variants.id"), nullable=False)
    variant_type_id = Column(Integer, ForeignKey("variant_types.id"), nullable=False)
    variant_option_id = Column(
        Integer, ForeignKey("variant_options.id"), nullable=False
    )

    variant = relationship("Variant", back_populates="variant_attributes")
    variant_type = relationship("VariantType")
    variant_option = relationship("VariantOption")

    def __repr__(self):
        return f"<VariantAttribute(id={self.id}, variant={self.variant.to_dict()}, variant_type={self.variant_type.to_dict()}, variant_option={self.variant_option.to_dict()})>"

    def to_dict(self):
        return {
            "id": self.id,
            "variant": self.variant.to_dict(),
            "variant_type": self.variant_type.to_dict(),
            "variant_option": self.variant_option.to_dict(),
        }
