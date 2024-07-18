"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""

import schedule
import time
import requests
from flask import Flask, request, jsonify, url_for, Blueprint, send_from_directory
from api.models import db, Users
from api.utils import generate_sitemap, APIException
from flask_cors import CORS
from flask_migrate import Migrate
from flask_swagger import swagger
from flask_jwt_extended import JWTManager, create_access_token, jwt_required, get_jwt_identity

from werkzeug.security import generate_password_hash, check_password_hash
import re

api = Blueprint('api', __name__)

# Allow CORS requests to this API
CORS(api)

def validate_email(email):
    return re.match(r'^[\w\.-]+@[a-zA-Z\d\.-]+\.[a-zA-Z]{2,}$', email)

def validate_password(password):
    return (len(password) >= 8 and any(char.isdigit() for char in password)
            and any(char.isupper() for char in password) and
            any(char.islower() for char in password))

def validate_username(username):
    return re.match(r'^[a-zA-Z0-9]{3,}$', username)

@api.route('/signup', methods=['POST'])
def create_user():

    email = request.json.get('email')
    password = request.json.get('password')
    username = request.json.get('username')

    if not email:
        return jsonify({'error': 'Email is required'}, 400)
    if not password:
        return jsonify({'error': 'Password is required'}, 400)
    if not username:
        return jsonify({'error': 'Username is required'}, 400)
    
    if not validate_email(email):
        return jsonify({'error': 'Invalid email format'}, 400)
    if not validate_password(password):
        return jsonify({'error': 'Password does not meet criteria'}, 400)
    if not validate_username(username):
        return jsonify({'error': 'Invalid username format'}, 400)

    existing_email = Users.query.filter_by(email=email).first()
    if existing_email:
        return jsonify({'error': 'Email already in use'}, 400)
    
    existing_username = Users.query.filter_by(username=username).first()
    if existing_username:
        return jsonify({'error': 'Username already in use'}, 400)
    
    hashed_password = generate_password_hash(password)
    new_user = Users(email=email, username=username, password=hashed_password, is_active=False)

    db.session.add(new_user)
    db.session.commit()

    access_token = create_access_token(identity=new_user.id)
    return jsonify(access_token=access_token, success=True), 200

@api.route('/login', methods=['POST'])
def authenticate_user():
    email = request.json.get('email')
    username = request.json.get('username')
    print('email:' + email) if email else print('email: None')
    print('username:' + username) if username else print('username: None')
    password = request.json.get('password')
    user_by_email = Users.query.filter_by(email=email).first()
    user_by_username = Users.query.filter_by(username=username).first()
    user = user_by_email if user_by_email else user_by_username
    print(user.serialize())
    if not user or not check_password_hash(user.password, password):
        return jsonify({"error": "Invalid credentials"}, 400)
    
    access_token = create_access_token(identity=user.id)
    return jsonify(access_token=access_token, success=True), 200

@api.route('/protected', methods=['GET'])
@jwt_required()
def protected():
    current_user_id = get_jwt_identity()
    user = Users.query.get(current_user_id)
    return jsonify(user_info=user.serialize()), 200

@api.route('/fetch_popular_games', methods=['GET'])
def fetch_popular_games():
    url = "https://api.igdb.com/v4/games"
    payload = "fields name, cover, rating, rating_count, first_release_date;\r\nwhere rating_count > 200 & first_release_date > 1641016861;\r\nsort rating desc;"
    headers = {
        'Client-ID': 'o2vtxnf4vau6e9hwsuhhyr2lw2btkw',
        'Authorization': 'Bearer 2rbb0z08nr6000468k9j76f4dmrqkp',
        'Content-Type': 'application/json',
        'Cookie': '__cf_bm=V8lg5oo1Wce.P0qaKsEq5Pn5ooZ6ScdRlZr9BYUN.Lw-1719431149-1.0.1.1-QMXeuEauQdEr1Dm3kZ1bcgQ_jNZCO9kI9_T.u.GB1Y.__dOuimKseZdlPuJynzA97_xmnothzBGhCnj6HMgrWw'
    }
    response = requests.request("POST", url, headers=headers, data=payload)
    ids = ""
    for game in response.json():
        ids += str(game['cover']) + ','
    ids = ids[:-1]

    url = "https://api.igdb.com/v4/covers"
    payload = "fields id, image_id;\r\nwhere id = ("+ ids +");"
    response2 = requests.request("POST", url, headers=headers, data=payload)
    games = []
    for game in response.json():
        for cover in response2.json():
            if game['cover'] == cover['id']:
                game['image_id'] = cover['image_id']
                games.append(game)
                break

    return jsonify(games), 200

@api.route('/search', methods=['POST'])
def search():
    url = "https://api.igdb.com/v4/games"
    searchTerm = request.json.get('searchTerm')
    payload = "fields name, cover, rating, rating_count, first_release_date;\r\nsearch \"" + searchTerm + "\";\r\nwhere cover != null & version_parent = null & parent_game = null;\r\nlimit 50;"
    headers = {
        'Client-ID': 'o2vtxnf4vau6e9hwsuhhyr2lw2btkw',
        'Authorization': 'Bearer 2rbb0z08nr6000468k9j76f4dmrqkp',
        'Content-Type': 'application/json',
        'Cookie': '__cf_bm=V8lg5oo1Wce.P0qaKsEq5Pn5ooZ6ScdRlZr9BYUN.Lw-1719431149-1.0.1.1-QMXeuEauQdEr1Dm3kZ1bcgQ_jNZCO9kI9_T.u.GB1Y.__dOuimKseZdlPuJynzA97_xmnothzBGhCnj6HMgrWw'
    }
    response = requests.request("POST", url, headers=headers, data=payload)
    print(response.json())
    ids = ""
    for game in response.json():
        ids += str(game['cover']) + ','
    ids = ids[:-1]

    url = "https://api.igdb.com/v4/covers"
    payload = "fields id, image_id;\r\nwhere id = ("+ ids +");"
    response2 = requests.request("POST", url, headers=headers, data=payload)

    games = []
    for game in response.json():
        for cover in response2.json():
            if game['cover'] == cover['id']:
                game['image_id'] = cover['image_id']
                games.append(game)
                break

    return jsonify(games), 200

@api.route('/fetch_game/<int:game_id>', methods=['GET'])
def fetch_game(game_id):
    url = "https://api.igdb.com/v4/games"
    payload = "fields name, rating, rating_count, first_release_date, summary, genres, platforms, screenshots;\r\nwhere id = " + str(game_id) + ";"
    headers = {
        'Client-ID': 'o2vtxnf4vau6e9hwsuhhyr2lw2btkw',
        'Authorization': 'Bearer 2rbb0z08nr6000468k9j76f4dmrqkp',
        'Content-Type': 'application/json',
        'Cookie': '__cf_bm=V8lg5oo1Wce.P0qaKsEq5Pn5ooZ6ScdRlZr9BYUN.Lw-1719431149-1.0.1.1-QMXeuEauQdEr1Dm3kZ1bcgQ_jNZCO9kI9_T.u.GB1Y.__dOuimKseZdlPuJynzA97_xmnothzBGhCnj6HMgrWw'
    }
    response = requests.request("POST", url, headers=headers, data=payload)

    url = "https://api.igdb.com/v4/covers"
    payload = "fields image_id;\r\nwhere game = ("+ str(game_id) +");"
    # headers are the same as above, won't override
    print(payload)
    response2 = requests.request("POST", url, headers=headers, data=payload)

    url = "https://api.igdb.com/v4/artworks"
    payload = "fields image_id;\r\nwhere game = "+ str(game_id) +";"
    # headers are the same as above, won't override
    response3 = requests.request("POST", url, headers=headers, data=payload)

    url = "https://api.igdb.com/v4/screenshots"
    payload = "fields image_id;\r\nwhere game = "+ str(game_id) +";"
    # headers are the same as above, won't override
    response4 = requests.request("POST", url, headers=headers, data=payload)

    game = response.json()[0]
    game['cover_id'] = response2.json()[0]['image_id']
    game['artworks'] = response3.json()
    game['screenshots'] = response4.json()

    return jsonify(game), 200