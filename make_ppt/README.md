# データの保存

## 種類

### Cookie　
- 容量：　4KBまで。
- アクセス：　サーバーからも見れるし入れられる。
- 期間：　決められる

### Storage
- 容量：　5MBまで。
- アクセス：　サーバーからは直接扱えない。
- 期間：　localとsessionがある。localは継続、sessionはブラウザ閉じるまで。

1つの物件だけならCookieで間に合うかもしれないが、一人当たり複数物件を持つはずなのでStorageを使う方がいいかもしれない。Cookieはまた別のデータを扱うようにするなどで分ける。


## Cookie

### 設定

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

### 取得

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

### パース

javaScriptのdocument.cookieは文字列として入っているのでパースしてJSONデータとして扱う。

```javaScript
function parseCookie(doc_cookie) {
    var doc_cookie_array = doc_cookie.split("; ");
    var cookie_json = {};

    for (var ck of doc_cookie_array){
        var add_data = ck.split("=");
        cookie_json[add_data[0]] = add_data[1];
    }
    return cookie_json;
}

var cookie = parseCookie(document.cookie);
```

これでJSONデータとなる。

## Storage
javaScropt側ですべて制御する。

### 追加等

```javaScript
var storage = localStorage;

// 追加
storage.setItem('TIC', 'akan');

// 取得
console.log(storage['TIC']);

//削除
storage.removeItem('TIC');
storage.clear();
```

### Pythonへ

JSON形式で送るためにstorageを文字列化してvalueに入れ送る。

```Python
$("#get_storage").on("click", function () {
    $.getJSON($SCRIPT_ROOT + '/get_storage', {storage: JSON.stringify(storage)},
    function(data) {
        console.log(data.storage);
    return false;
      });
});
```

### Pythonで

json.loads()でパースして辞書として扱う。

```Python
@app.route("/get_storage", methods=["GET", "POST"])
def get_storage():
    storage = request.args.get('storage')
    storage_json = json.loads(storage)
    print(storage_json)
    return jsonify({'storage': storage})
```

PythonではStorageをデータベースへ保存する等する処理を書けば良い。


## 再現

### Cookieの場合
cookieに値が入っている場合、読み込み時に対象のjsを起動してcookieを反映させるようにすればいい。具体的には下記のコードをページ読み込み時に実行する。
onclickのトリガーで起動しているものに全て適用すれば状態は再現出来る。

```javaScript
if (document.cookie) {
    var cookie = parseCookie(document.cookie);
    // ここに再現する処理を書く.
}
```

### Storageの場合
Storageかcookieにフラグの情報を取っておいて、それが存在するかどうかで読み込み時にjsを起動してStorageのデータを反映させるようにすればいい。

## 難点

難しいのは、onclick等で描画している操作をdocument.cookieから同様に呼び出すことができるように、うまく全て関数化すること。

