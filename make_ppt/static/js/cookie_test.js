    //var js_cookie = document.add_cookie.js_cookie.value;

if (document.cookie) {
    var doc_cookie = document.cookie;
    doc_cookie = parseCookie(doc_cookie);
    replaceTextCook(doc_cookie);
}

// On click delete.
$("#add_cookie_btn").on("click", function () {
    js_cookie = document.add_cookie.js_cookie.value;
    document.cookie = "js_cookie=" + js_cookie;
    console.log("Add " +  js_cookie + " to cookie.");
    return false;
});

$("#get_cookie").on("click", function () {
    $.getJSON($SCRIPT_ROOT + '/get_cookie', {
      }, function(data) {
        // Recieve data from python as json and json.dumped.
        var cookie = data.cookie;
        console.log(cookie);
        replaceTextCook(cookie);
    return false;
      });
});


$("#get_storage").on("click", function () {
    $.getJSON($SCRIPT_ROOT + '/get_storage', {storage: JSON.stringify(storage)},
    function(data) {
        console.log(data.storage);
    return false;
      });
});

function replaceTextCook(cookie) {
    console.log(cookie);
    var sam = document.getElementById("allcookie");
    sam.textContent = cookie['name'] + ", " + cookie['js_cookie'];
    return false;
};


function parseCookie(doc_cookie) {
    var doc_cookie_array = doc_cookie.split("; ");
    var cookie_json = {};

    for (var ck of doc_cookie_array){
        var add_data = ck.split("=");
        cookie_json[add_data[0]] = add_data[1];
    }
    return cookie_json;
}

var storage = localStorage;

storage.setItem('TIC', 'yaranaakan');
storage.setItem('sshr', '8');
storage.setItem('un', 'ko');

console.log(storage.TIC);

function getStorage(storage) {
    for (var i = 0, len = storage.length; i < len; i++){
        var key = storage.key(i);
        var val = storage[key];
        console.log(key + '_' + val);
    }
}

getStorage(storage);
