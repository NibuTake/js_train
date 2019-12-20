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

function replaceTextCook(cookie) {
    console.log(cookie);
    var sam = document.getElementById("allcookie");
    sam.textContent = cookie['name'] + ", " + cookie['js_cookie'];
    return false;
};


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
