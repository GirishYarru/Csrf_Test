# Shamelessly copied from http://flask.pocoo.org/docs/quickstart/

from flask import Flask
#from flask import request,redirect, url_for,session
from flask import jsonify
import re
from flask_cors import CORS
from TokenManager import *
from flask import Flask, render_template,redirect, url_for,request,session, make_response
import os
import random, string
#from __future__ import unicode_literals

import hmac
import os

from hashlib import sha1
from datetime import datetime, timedelta

app = Flask(__name__)
cors = CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'
app.secret_key = os.urandom(100)
TIME_FORMAT = '%Y%m%d%H%M%S'
TIME_LIMIT = timedelta(minutes=30)
SECRET_KEY = b'6dc1787668c64c939929c17683d7cb74'


countries = [
    {"id": 1, "name": "Thailand", "capital": "Bangkok", "area": 513120},
    {"id": 2, "name": "Australia", "capital": "Canberra", "area": 7617930},
    {"id": 3, "name": "Egypt", "capital": "Cairo", "area": 1010408},
]
tokenMngr = SessionSecureForm()
def generate_csrf_token( csrf_context):
    if SECRET_KEY is None:
        raise Exception('must set SECRET_KEY in a subclass of this form for it to work')
    if csrf_context is None:
        raise TypeError('Must provide a session-like object as csrf context')

    #session = getattr(csrf_context, 'session', csrf_context)

   # if 'csrf' not in session:
        #session['csrf'] = sha1(os.urandom(64)).hexdigest()
    session['csrf'] = sha1(os.urandom(64)).hexdigest()

    #csrf_token.csrf_key = session['csrf']
    if TIME_LIMIT:
        expires = (datetime.now() + TIME_LIMIT).strftime(TIME_FORMAT)
        print('======================')
        print ('==========  session[csrf] ======= ',session['csrf'])
        print (expires)
        csrf_build = '%s%s' % (session['csrf'], expires)
        print('======csrf_build === ',csrf_build)
    else:
        expires = ''
        csrf_build = session['csrf']

    hmac_csrf = hmac.new(SECRET_KEY, csrf_build.encode('utf8'), digestmod=sha1)
    return '%s##%s' % (expires, hmac_csrf.hexdigest())
class InvalidUsage(Exception):
    status_code=400
    def __init__(self,message,status_code=None,payload=None):
        Exception.__init__(self)
        self.message=message
        if status_code is not None:
            self.status_code = status_code
        self.payload = payload
    def to_dict(self):
        rv = dict(self.payload or ())
        rv['message'] = self.message
        return rv

def _find_next_id():
    return max(country["id"] for country in countries) + 1

@app.after_request
def after_request(response):
#     # white_origin= ['http://localhost:4200/']
#    // if request.headers['HTTP_ORIGIN'] in white_origin:
    # response.headers['Access-Control-Allow-Origin'] = request.headers['HTTP_ORIGIN'] 
    response.headers['Access-Control-Allow-Methods'] = 'PUT,GET,POST,DELETE'
    response.headers['allow_credentials'] = 'True'
    response.headers['Access-Control-Allow-Credentials'] = 'true'
    response.headers['Access-Control-Allow-Headers'] = 'Content-Type,Set-Cookie'
    

    return response

@app.get("/getcountries")
def get_countries():
    client = jsonify(countries)
    #client.set_cookie("X-CSRF",'testttttttttt')
    csrf_token = generate_csrf_token('csrf_context')
    client.set_cookie('X-CSRF-TOKEN',csrf_token,secure=False,path='/',httponly=False,samesite=None)
    #client.set_cookie('X-CSRF-TOKEN',csrf_token,httponly=False)
    return client

@app.post("/countries")
def add_country():
    if request.is_json:
        country = request.get_json()
        country["id"] = _find_next_id()
        #tokenMngr.validate_csrf_token(request.get('X-CSRF-HEADER'))
        countries.append(country)
        return country, 201
    return {"error": "Request must be JSON"}, 415



       
    

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=81)

