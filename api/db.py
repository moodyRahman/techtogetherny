
import mongoengine as mg

mg.connect(host="mongodb+srv://ttny:doof@moody.tjfji.mongodb.net/moody?retryWrites=true&w=majority")


class User(mg.Document):
	username = mg.StringField()
	hashed_password = mg.StringField()
	salt = mg.StringField()

print("loaded db")