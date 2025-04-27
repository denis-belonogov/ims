from .category import Category
from sqlalchemy import Column, Integer, String, Float, ForeignKey, Text
from sqlalchemy.ext.declarative import declarative_base
from app.db import db
Base = declarative_base()


class Product(db.Model):
    __tablename__ = 'products'

    id = Column(Integer, primary_key=True, autoincrement=True, unique=True)
    name = Column(String(255), nullable=False, unique=True)
    item_number = Column(String(100), nullable=True, unique=False)
    category_id = Column(Integer, ForeignKey("categories.id"), nullable=False)
    brand = Column(String(100), nullable=True)
    description = Column(Text, nullable=True)
    image_url = Column(String(255), nullable=True)
    price = Column(Float, nullable=False)
    quantity = Column(Integer, nullable=False)
    low_stock_threshold = Column(Integer, nullable=False, default=0)

    # Define relationships if needed
    category = db.relationship("Category")

    def __repr__(self):
        return f"<Product(id={self.id}, name={self.name}, item_number={self.item_number}, brand={self.brand}, price={self.price}, quantity={self.quantity}), category={self.category}>"

    def to_dict(self):
        return {
            "id": self.id,
            "name": self.name,
            "item_number": self.item_number,
            "brand": self.brand,
            "description": self.description,
            "image_url": self.image_url,
            "price": self.price,
            "quantity": self.quantity,
            "low_stock_threshold": self.low_stock_threshold,
            "category": self.category.to_dict()
        }
