import jwt
from flask import *
from functools import wraps

secret_key = "dfgjdkghdfkjg"

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
			return {"status":403, "reason":"Bad Token"}
	
	return wrapper