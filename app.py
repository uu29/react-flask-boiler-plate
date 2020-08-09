# -*- coding: utf-8 -*- 
from flask import Flask, render_template, redirect, request, session, url_for, send_from_directory, flash, make_response, jsonify, Response, g, Blueprint, json
from flask_restful import reqparse, fields, marshal_with, abort, Api, Resource
from flask_bcrypt import Bcrypt
from flask_cors import CORS
import sys, requests

app = Flask(__name__, static_url_path='', static_folder='./static', template_folder='./static')
api = Api(app)
bcrypt = Bcrypt(app)
CORS(app, resources={r"/api/*": {"origins": "*"}}, supports_credentials=True)

def hello():
    print('hello')

@app.route('/test')
def test():
    print('test')
    return 'test'

@app.route('/api/<string:path>', methods=['GET', 'POST'])
def api(path):
    API_SERVER_URL = 'http://testapi-monitoring.criminalip.com/'
    params = json.loads(request.data)
    headers = {
        'x-api-key': 'ZgYsdLG0ga1UN4E2lOf3527nMToBoImR9IW8J78s',
        'X-Uid': '104680286225602551312',
        'X-Account-Type': 'google',
    }
    response = requests.post(API_SERVER_URL + path, data=params, headers=headers)
    result = json.loads(response.content)
    return jsonify(result)

@app.route('/', defaults={'path': ''}, methods=['GET'])
def catch_all(path):
    print(path)
    g.jinja2_test = '진자 변수 쓰기'
    g.jinja2_test_2 = 'APPLE'
    return render_template('index.html')

@app.errorhandler(404)
def not_found(error):
    return render_template('index.html')

if __name__ == '__main__':
    if len(sys.argv) > 1:
        if sys.argv[1] == 'test':
            app.debug = True
    app.run()
