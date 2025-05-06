from sqlalchemy import Column, Integer, String
from sqlalchemy.ext.declarative import declarative_base
from app.db import db  # Use the db instance from Flask-SQLAlchemy

Base = declarative_base()


class Category(db.Model):
    __tablename__ = "categories"

    id = Column(Integer, primary_key=True, autoincrement=True)
    name = Column(String(255), nullable=False, unique=True)
    description = Column(String(500), nullable=True)
    products = db.relationship("Product", back_populates="category")

    def __repr__(self):
        return f"<Category(id={self.id}, name='{self.name}', description='{self.description}')>"

    def to_dict(self):
        return {"id": self.id, "name": self.name, "description": self.description}
