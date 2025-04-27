from sqlalchemy import Column, String, Integer, Boolean, DateTime, Numeric, ForeignKey
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import relationship
from app.db import db  # Use the db instance from Flask-SQLAlchemy
from datetime import datetime

Base = declarative_base()


class Variant(db.Model):
    __tablename__ = 'variants'

    id = Column(Integer, primary_key=True, autoincrement=True)
    # Foreign key to Product table
    # product_id = Column(Integer, ForeignKey('products.id'), nullable=False)
    name = Column(String(255), nullable=False)
    sku = Column(String(100), unique=True, nullable=False)
    price = Column(Numeric(10, 2), nullable=False)
    quantity = Column(Integer, nullable=False)
    low_stock_threshold = Column(Integer, nullable=False, default=10)

    # product = relationship("Product", back_populates="variants")

    def __repr__(self):
        return f"<Variant(id={self.id}, product_id={self.product_id}, name={self.name}, sku={self.sku}, price={self.price}, quantity={self.quantity})>"
