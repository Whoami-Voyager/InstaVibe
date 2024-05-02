#!/usr/bin/env python3
from models import db, User, Post, Interaction
from flask_migrate import Migrate
from flask import Flask, request, make_response
from flask_restful import Api, Resource
import os

BASE_DIR = os.path.abspath(os.path.dirname(__file__))
DATABASE = os.environ.get("DB_URI", f"sqlite:///{os.path.join(BASE_DIR, 'app.db')}")

app = Flask(__name__)
app.config["SQLALCHEMY_DATABASE_URI"] = DATABASE
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False
app.json.compact = False

migrate = Migrate(app, db)

db.init_app(app)

api = Api(app)


@app.route("/")
def index():
    return "<h1>Project</h1>"

class PostClass(Resource):
    def get(self):
        posts = [
            post.to_dict(rules=("-interactions",))
            for post in Post.query.all()
        ]
        return make_response(posts, 200)
    
    def post(self):
        try:
            new_post = Post(
                caption=request.get_json()["caption"],
                image_url=request.get_json()["image_url"],
                user_id=request.get_json()["user_id"],
            )
            db.session.add(new_post)
            db.session.commit()

            return make_response(new_post.to_dict(), 201)
        except ValueError:
            return make_response({"errors": ["validation errors"]}, 400)


api.add_resource(PostClass, "/posts")


class PostById(Resource):
    def get(self, id):
        post = Post.query.filter_by(id=id).one_or_none()

        if post is not None:
            return make_response(post.to_dict(), 200)
        else:
            return make_response({"error": "Post not found"}, 404)

    def delete(self, id):
        post = Post.query.filter_by(id=id).one_or_none()

        if post is None:
            return make_response({"error": "Post not found"}, 404)

        db.session.delete(post)
        db.session.commit()
        return make_response({}, 204)
    
    def patch(self, id):
        post = Post.query.filter_by(id=id).one_or_none()

        if post is None:
            return make_response({"error": "Post not found"}, 404)
        
        data = request.get_json()
        if 'caption' in data:
            post.caption = data['caption']
        if 'image_url' in data:
            post.image_url = data['image_url']
        
        db.session.commit()
        return make_response(post.to_dict(), 200)


api.add_resource(PostById, "/post/<int:id>")


class UserClass(Resource):
    def get(self):
        users = [
            user.to_dict(only=("id", "username", "email"))
            for user in User.query.all()
        ]
        return make_response(users, 200)
    
    def post(self):
        try:
            new_user = User(
                username=request.get_json()["username"],
                email=request.get_json()["email"],
                password=request.get_json()["password"],
            )
            db.session.add(new_user)
            db.session.commit()

            return make_response(new_user.to_dict(), 201)
        except ValueError:
            return make_response({"errors": ["validation errors"]}, 400)
    


api.add_resource(UserClass, "/users")

class UserById(Resource):
    def get(self, id):
        user = User.query.filter_by(id=id).one_or_none()

        if user is not None:
            return make_response(user.to_dict(), 200)
        else:
            return make_response({"error": "User not found"}, 404)

    def delete(self, id):
        user = User.query.filter_by(id=id).one_or_none()

        if user is None:
            return make_response({"error": "User not found"}, 404)

        db.session.delete(user)
        db.session.commit()
        return make_response({}, 204)
    
    def patch(self, id):
        user = User.query.filter_by(id=id).one_or_none()

        if user is None:
            return make_response({"error": "User not found"}, 404)
        
        data = request.get_json()
        if 'username' in data:
            user.username = data['username']
        if 'email' in data:
            user.email = data['email']
        if 'password' in data:
            user.password = data['password']
        
        db.session.commit()
        return make_response(user.to_dict(), 200)



api.add_resource(UserById, "/user/<int:id>")



class Interactions(Resource):
    def post(self):
        try:
            newInteraction = Interaction(
                comment=request.get_json()["comment"],
                like=request.get_json()["like"],
                user_id=request.get_json()["user_id"],
                post_id=request.get_json()["post_id"],
            )
            db.session.add(newInteraction)
            db.session.commit()

            return make_response(newInteraction.to_dict(), 201)
        except ValueError:
            return make_response({"errors": ["validation errors"]}, 400)
    


api.add_resource(Interactions, "/interactions")

if __name__ == "__main__":
    app.run(port=5555, debug=True)