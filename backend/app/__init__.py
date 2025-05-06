from flask import Flask
from flask_cors import CORS
from flask_migrate import Migrate
from app.models.variant_attribute import VariantAttribute
from app.models.variant_option import VariantOption
from app.models.variant_type import VariantType
from app.models.product import Product
from app.models.variant import Variant
from app.models.category import Category
from .db import db
from .config import Config

from app.routes.product import product_bp
from app.routes.category import category_bp
from app.routes.variant_type import variant_type_bp
migrate = Migrate()


def create_app():
    app = Flask(__name__)
    app.config.from_object(Config)

    app.register_blueprint(product_bp)
    app.register_blueprint(category_bp)
    app.register_blueprint(variant_type_bp)

    CORS(app)
    db.init_app(app)
    migrate.init_app(app, db)

    with app.app_context():
        db.create_all()

    # Register routes later here
    return app
