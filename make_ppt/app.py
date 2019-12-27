from flask import Flask, render_template, make_response, redirect, request, jsonify, url_for
from flask_bootstrap import Bootstrap

import json
import os

app = Flask(__name__)
bootstrap = Bootstrap(app)

name = 'unknown'

path = 'C://Users/morinibu/github/js_train/make_ppt'

@app.route("/")
def hello():
    return "Hello World " + name


@app.route("/index")
def index():
    return render_template("index.html")

@app.route("/cookie_pie")
def cocckie_pie(name):
    if request.cookies.get('name'):
        name = request.cookies.get('name')
        print('get cookie')
        print(name)
    return render_template("cookie_pie.html", name=name)

@app.route("/get_uname", methods=['POST', 'GET'])
def get_uname():
    
    if request.method == 'POST':
        name = request.form['username']
        print(name)
    elif request.cookies.get('name'):
        name = request.cookies.get('name')
        print('get cookie')
        print(name)
    response = make_response(render_template("cookie_pie.html", name=name))
    response.set_cookie('name', name)
    return response

@app.route("/get_cookie")
def get_cookie():
    cookie = request.cookies

    return jsonify({'cookie': cookie})

@app.route("/get_storage", methods=["GET", "POST"])
def get_storage():
    storage = request.args.get('storage')
    storage_json = json.loads(storage)
    print(storage_json)
    return jsonify({'storage': storage})

@app.route("/get_file_list", methods=["GET", "POST"])
def get_file_list():
    img_path = request.args.get('img_path')
    file_list = os.listdir(path + "/static/img/{}".format(img_path))
    return jsonify({'file_list': file_list})

if __name__ == "__main__":
    app.run(host='0.0.0.0', port=5001, debug=True)
