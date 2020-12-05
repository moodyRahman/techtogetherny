
from mongoengine import *

connect(host="mongodb+srv://ttny:doof@moody.tjfji.mongodb.net/moody?retryWrites=true&w=majority")


class User(Document):
	username = StringField()
	hashed_password = StringField()
	salt = StringField()

print("loaded db")