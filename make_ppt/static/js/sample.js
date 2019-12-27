console.log('Load');

var card_count = 1;
var re = new RegExp('/delete_card_\d/');


// Append card.
function makecard(k) {
    // Card.
    var card = document.createElement("div");
    card.classList.add("card");
    card.id = "card_" + k;


    // Header.
    var card_header = document.createElement("div");
    card_header.classList.add("card-header");

    var p2 = document.createElement("h3");
    const text2 = document.createTextNode("Title" + k);
    p2.appendChild(text2);

    card_header.appendChild(p2);


    // Body.
    var card_body = document.createElement("div");
    card_body.classList.add("card-body");

    var p1 = document.createElement("p");
    const text1 = document.createTextNode("テスト");
    p1.appendChild(text1);
    card_body.appendChild(p1);


    // Delete buttun.
    var card_del_buttun = document.createElement("a");

    card_del_buttun.classList.add("btn");
    card_del_buttun.classList.add("btn-primary");

    card_del_buttun.id = "delete_card_" + k;
    card_del_buttun.href = "#";

    const buttun_tx = document.createTextNode("Delete");
    card_del_buttun.appendChild(buttun_tx);


    // Card img
    var card_img = document.createElement("img");
    card_img.classList.add("card-img-top")
    card_img.src = "./static/img/Rorschach/rs" + k + ".jpg";

    // Append.
    card.appendChild(card_header);
    card_header.appendChild(card_del_buttun);
    card.appendChild(card_img);
    card.appendChild(card_body);

    document.getElementById('card_list').appendChild(card);
    // var snapshot = new XMLSerializer().serializeToString(document);

}

// Append mutable side bar.
function makecard_list(k) {
    var ui_li = document.createElement("li");
    var ui_a = document.createElement("a");
    const text = document.createTextNode("Page " + k);

    ui_li.classList.add("ui-state-default");
    ui_li.id = "card_list_" + k;

    ui_a.classList.add("nav-link");
    ui_a.href = "#card_" + k;
    ui_a.appendChild(text);
    ui_li.appendChild(ui_a);

    document.getElementById('jquery-ui-sortable').appendChild(ui_li);
}

// On click with id=make_card.
document.getElementById("make_card").onclick = function () {
    makecard(card_count);
    makecard_list(card_count);
    card_count += 1;
    console.log(card_count);
};

// On click delete.
$("#delete_card").on("click", function () {
    if (card_count > 1) {
        $("#card_" + (card_count - 1)).remove();
        $("#card_list_" + (card_count - 1)).remove();
        console.log("delete " + (card_count - 1));
        card_count -= 1;
    }
    else {
        console.log('None');
    }
});

// On click delete on a card.
$("#card_list").on("click", /delete_/, function (e) {
    var card_id = e.target.id;
    var result = card_id.match(/delete_card_\d*/);

    if (result != null) {
        // Get last num.
        var del_num = result[0].split('_').slice(-1)[0];

        $("#card_" + del_num).remove();
        $("#card_list_" + del_num).remove();
    }
});
