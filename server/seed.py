from services import *

with app.app_context():

    print("Deleting data...")
    Post.query.delete()
    User.query.delete()
    Interaction.query.delete()

    print("Creating Users...")
    Tony = User(username="Tony", email='tony@email.com', password='password')
    James = User(username="James", email='james@email.com', password='password')
    Mike = User(username="Mike", email='mike@email.com', password='password')
    users = [Tony, James, Mike]

    print("Creating Posts...")

    Tonysail = Post(caption="sailing", image_url="sailingurl", user_id=1)
    Jamesrun = Post(caption="running", image_url="runningurl", user_id=2)
    Mikedinner = Post(caption="dinner", image_url="dinnerurl", user_id=3)
   
    posts = [Tonysail, Jamesrun, Mikedinner]

    print("Creating Interactions...")

    i1 = Interaction(user=Tony, post=Tonysail, comment="comment", like=False)
    i2 = Interaction(user=James, post=Jamesrun, comment="comment", like=True)
    i3 = Interaction(user=Mike, post=Mikedinner, comment="comment", like=True)
    interactions = [i1, i2, i3]
    db.session.add_all(users)
    db.session.add_all(posts)
    db.session.add_all(interactions)
    db.session.commit()

    print("Seeding done!")
