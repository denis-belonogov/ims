from flask import Flask
from flask_cors import CORS
from flask_migrate import Migrate
from app.models.product import Product
from app.models.variant import Variant
from .db import db
from .config import Config

migrate = Migrate()


def create_app():
    app = Flask(__name__)
    app.config.from_object(Config)

    CORS(app)
    db.init_app(app)
    migrate.init_app(app, db)

    with app.app_context():
        db.create_all()

    # Register routes later here
    return app
