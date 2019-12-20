from flask import Flask, render_template, make_response, redirect, request, jsonify
from flask_bootstrap import Bootstrap

app = Flask(__name__)
bootstrap = Bootstrap(app)

name = 'unknown'

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

if __name__ == "__main__":
    app.run(host='0.0.0.0', port=5001, debug=True)
