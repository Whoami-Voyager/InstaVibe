from services import *
from models import *

with app.app_context():

    print("Deleting data...")
    Post.query.delete()
    User.query.delete()
    Interaction.query.delete()

    print("Creating Users...")
    Tony = User(username="Tony", email='tony@email.com', password='90degree')
    James = User(username="James", email='james@email.com', password='90degree')
    Mike = User(username="Mike", email='mike@email.com', password='90degree')
    users = [Tony, James, Mike]

    print("Creating Posts...")

    Tonysail = Post(caption="sailing", image_url="https://imageio.forbes.com/specials-images/imageserve/6552427075f8cabe3a24d6f1/0x0.jpg", user_id=1)
    Jamesrun = Post(caption="running", image_url="https://cdn.motor1.com/images/mgl/G3nXQV/s3/ferrari-12cilindri.jpg", user_id=2)
    Mikedinner = Post(caption="dinner", image_url="https://65e81151f52e248c552b-fe74cd567ea2f1228f846834bd67571e.ssl.cf1.rackcdn.com/Ferrari/Model%20Pages/F8%20Tributo/08-f8-tributo.jpg", user_id=3)
   
    posts = [Tonysail, Jamesrun, Mikedinner]

    print("Creating Interactions...")

    i1 = Interaction(user=Tony, post=Mikedinner, comment="Nice Car", like=False)
    i2 = Interaction(user=James, post=Tonysail, comment="Ferrari. I Like", like=True)
    i3 = Interaction(user=Mike, post=Jamesrun, comment="Vroom Vroom", like=True)
    interactions = [i1, i2, i3]
    db.session.add_all(users)
    db.session.add_all(posts)
    db.session.add_all(interactions)
    db.session.commit()

    print("Seeding done!")
