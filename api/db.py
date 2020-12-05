
from mongoengine import *

connect(host="")


class User(Document):
    name = StringField()
    password = StringField()

print("loaded db")