from sqlalchemy import Column, String, Integer, Numeric, ForeignKey, JSON
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import relationship
from app.db import db  # Use the db instance from Flask-SQLAlchemy


class Variant(db.Model):
    __tablename__ = "variants"

    id = Column(Integer, primary_key=True, autoincrement=True)
    product_id = Column(Integer, ForeignKey("products.id"), nullable=False)
    item_number = Column(String(100))
    price = Column(Numeric(10, 2), nullable=False)
    quantity = Column(Integer, nullable=False)
    product = relationship("Product", back_populates="variants")
    attributes = Column(JSON, nullable=False)

    def __repr__(self):
        return f"<Variant(id={self.id}, product={self.product.to_dict()}, item_number={self.item_number}, price={self.price}, quantity={self.quantity})>"

    def to_dict(self):
        return {
            "id": self.id,
            "product": self.product.to_dict(),
            "item_number": self.item_number,
            "price": float(self.price),
            "quantity": self.quantity,
            "attributes": self.attributes,
        }
