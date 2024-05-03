from services import *

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
    serialize_rules = ("-interactions.user", "-password")

    @property
    def password_hash(self):
        return {"Nuh uh"}
    @password_hash.setter
    def password_hash(self, word):
        password_encrypt = bcrypt.generate_password_hash(word.encode('utf-8'))
        self.password = password_encrypt.decode('utf-8')

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
