// On click delete on a card.
$("#card_list").on("click", /page_\d-card_\d*/, function (e) {
    var button_id = e.target.id;
    var result = button_id.match(/page_\d-card_\d*/);

    if (result != null) {
        // Get last num.
        console.log(button_id);
        var cont = document.getElementById("modal-name");
        cont.textContent = button_id;


    }
});