from sqlalchemy import Column, Integer, String, ForeignKey
from sqlalchemy.orm import relationship
from .variant_type import VariantType
from app.db import db


class VariantOption(db.Model):
    __tablename__ = "variant_options"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, nullable=False)
    variant_type_id = Column(Integer, ForeignKey("variant_types.id"), nullable=False)
    variant_type = relationship("VariantType", back_populates="variant_options")


def to_dict(self):
    return {
        "id": self.id,
        "name": self.name,
        "variant_type": self.variant_type.to_dict(),
    }
