from sqlalchemy import Column, Integer, String
from app.db import db
from sqlalchemy.orm import relationship


class VariantType(db.Model):
    __tablename__ = "variant_types"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, nullable=False, unique=True)
    variant_options = relationship("VariantOption", back_populates="variant_type")

    def __repr__(self):
        return f"<VariantType(id={self.id}, name='{self.name}')>"


def to_dict(self):
    return {
        "id": self.id,
        "name": self.name,
        "variant_options": self.variant_options.to_dict(),
    }
