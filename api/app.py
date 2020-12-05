
from functools import wraps
from flask import *
from flask_cors import CORS
import jwt
from os import urandom
from db import *
import hashlib
from base64 import b64encode

app = Flask(__name__)
CORS(app)

secret_key = "dfgjdkghdfkjg"

def hash(password, salt):
	return hashlib.sha512((password+salt).encode('utf-8')).hexdigest()
	pass

def jwtverify(route):
	@wraps(route)
	def wrapper(*args, **kwargs):
		try:
			decoded = jwt.decode(request.headers["Authorization"], secret_key, algorithms="HS256")
			user = decoded["username"]
			print(user)
			return route(*args, **kwargs, user=user)
		except Exception as e:
			print(e)
			return {"status":403}
	
	return wrapper


@app.route("/api", methods=["GET", "POST"])
@jwtverify
def api(user=None):
	print(user)
	print("YOUVE BEEN VERIFIED")
	out = {}
	out["status"] = 200
	out["posts"] = ["hello"]
	return out


@app.route("/auth", methods=["POST"])
def auth():
	data = request.get_json()

	if (data["username"] != "mood") or (data["password"] != "doof"):
		return {'status':401}

	payload = {
			"username":"moody"
	}
	
	encoded = jwt.encode(payload, secret_key, algorithm="HS256").decode("utf-8")
	print("====================")
	print(encoded)
	return {
		"token":encoded,
		"status":200
	}


@app.route("/login", methods=["POST"])
def login():
	data = request.get_json()
	get_user = User.objects(username=data["username"])[0]
	salt = get_user.salt
	if (hash(data["password"], salt) == get_user.hashed_password):
		payload = {"username":get_user.username}
		return {"status":200, "token":jwt.encode(payload, secret_key, algorithm="HS256").decode("utf-8")}
	return {"status":403, "reason":"Incorrect Credentials"}


@app.route("/register", methods=["POST"])
def register():
	data = request.get_json()

	if (User.objects(username = data["username"])):
		return {"status":403, "reason":"Username already exists"}
	else:
		salt = b64encode(urandom(128)).decode("utf-8")
		User(username = data["username"], 
			hashed_password=hash(data["password"], salt), 
			salt=salt).save()

		return {
			"status":200, 
			"token":jwt.encode({"username":data["username"]}, secret_key, algorithm="HS256").decode("utf-8")
		}
	pass

@app.route("/dbtest")
def debug():
	m = User(username="xxxxxxxxxxxxxxxxx", hashed_password="doof", salt="ddd").save()
	return "hello"


if __name__ == "__main__":
	app.run(debug=True, host="0.0.0.0")