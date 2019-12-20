# Cookie

Flask、javaScriptのどちらからも扱える。

## 設定

- Flaskから扱う場合

```python
from flask import Flask, render_template, make_response, redirect, request, jsonify

@app.route("/cookie_pie", methods=['POST', 'GET'])
def cookie_sample():
    name = "sample"
    response = make_response(render_template("cookie_pie.html", name=name))
    response.set_cookie('name', name)
    return response
```

Flaskから保存する場合、render_templateをラップしたresponseにセットしなければならないので、render_templateによるhtml描画が必須となる。
動的にcookieを保存する場合は、下記のjavaScriptによるものが必要。


- javaScriptから扱う場合

```javaScript
$("#add_cookie_btn").on("click", function () {
    js_cookie = "hoge";
    document.cookie = "js_cookie=" + js_cookie;
    return false;
});
```

javaScriptから保存する場合、document.cookieに格納すれば良い。動的に操作した値はこちらで保存する方が簡単。

## 取得

- Flask

```python
cookie_ = request.cookies.get('name')
```

request以下に入っている。

- javaScipt

```javaScript
cookie_ = document.cookie
```

document以下に入っている。

## パース

javaScriptのdocument.cookieは文字列として入っているのでパースしてJSONデータとして扱う。

```javaScript
function parseCookie(doc_cookie) {
    var cookie_key = [];
    var cookie_value = [];
    var doc_cookie_array = doc_cookie.split("; ");

    for (var ck of doc_cookie_array){
        var add_data = ck.split("=");
        cookie_key.push(add_data[0]);
        cookie_value.push(add_data[1]);
    }

    var cookie_json = {};

    for (k in doc_cookie_array){
        cookie_json[cookie_key[k]] = cookie_value[k];
    }
    return cookie_json; 
}

var cookie = parseCookie(document.cookie);
```

これでJSONデータとなる。

## 再現

- 再現方法
cookieに値が入っている場合、読み込み時に対象のjsを起動してcookieを反映させるようにすればいい。具体的には下記のコードをページ読み込み時に実行する。
onclickのトリガーで起動しているものに全て適用すれば状態は再現出来る。

```javaScript
if (document.cookie) {
    var cookie = parseCookie(document.cookie);
    // ここに再現する処理を書く.
}
```

難しいのは、onclick等で描画している操作をdocument.cookieから同様に呼び出すことができるように、うまく全て関数化すること。


