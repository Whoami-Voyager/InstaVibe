from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import MetaData
from sqlalchemy.orm import validates
from sqlalchemy.ext.associationproxy import association_proxy
from sqlalchemy_serializer import SerializerMixin

metadata = MetaData(
    naming_convention={
        "fk": "fk_%(table_name)s_%(column_0_name)s_%(referred_table_name)s",
    }
)

db = SQLAlchemy(metadata=metadata)


class User(db.Model, SerializerMixin):
    __tablename__ = "users"

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String)
    email = db.Column(db.String)
    password = db.Column(db.String)

    # add relationship
    interactions = db.relationship(
        "Interaction", backref="user", cascade="all, delete"
    )

    # add serialization rules
    serialize_rules = ("-interactions.user",)

    def __repr__(self):
        return f"<User {self.username}>"


class Post(db.Model, SerializerMixin):
    __tablename__ = "posts"

    id = db.Column(db.Integer, primary_key=True)
    image_url = db.Column(db.String)
    caption = db.Column(db.String)
    user_id = db.Column(db.Integer, db.ForeignKey("users.id"))

    # add relationship
    interactions = db.relationship(
        "Interaction", backref="post", cascade="all, delete"
    )

    # add serialization rules
    serialize_rules = ("-interactions.post",)

    def __repr__(self):
        return f"<Post {self.caption}, {self.image_url}>"


class Interaction(db.Model, SerializerMixin):
    __tablename__ = "interactions"

    id = db.Column(db.Integer, primary_key=True)
    comment = db.Column(db.String, nullable=False)
    like = db.Column(db.Boolean, default=False, nullable=False)

    # add relationships
    user_id = db.Column(db.Integer, db.ForeignKey("users.id"))
    post_id = db.Column(db.Integer, db.ForeignKey("posts.id"))

    # add serialization rules
    serialize_rules = (
        "-user.interactions",
        "-post.interactions",
    )
    
    def __repr__(self):
        return f"<Interactions ${self.comment}, ${self.like}>"
