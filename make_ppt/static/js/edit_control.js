// Global objects.
var choice = "File";
var change_modal_id;
var modal_val;


// File list.
$.getJSON($SCRIPT_ROOT + '/get_file_list', {
      }, function(data) {
        // Recieve data from python as json and json.dumped.
        var file_list = data.file_list;

        var modal_select = document.getElementById("modal_filename");
        for (var ch of file_list){
            var option = document.createElement("option");
            var text = document.createTextNode(ch);
            option.appendChild(text);
            modal_select.appendChild(option);
        }

    return false;
});


// Click effects of the modal.
$("#card_list").on("click", /page_\d-card_\d*/, function (e) {
    let button_id = e.target.id;
    let result = button_id.match(/page_\d-card_\d*/);
    console.log(button_id);

    if (result != null) {
        // Change sample text.
        let cont = document.getElementById("modal-name");
        cont.textContent = button_id;

        // Get ID from button_id.
        let page_num = button_id.match(/page_\d*/)[0].split("_")[1];
        let card_num = button_id.match(/card_\d*/)[0].split("_")[1];
        change_modal_id = `card_img_${page_num}_${card_num}`;

        // Initialize modal top image.
        let base = document.getElementById(change_modal_id).src.split("/").slice(-1)[0];
        changeCardlImg("modal-img", base);
    }
});


// Save modal change.
$("#save_modal_change").on("click", function (){
    console.log("Save");
    changeCardlImg(change_modal_id, modal_val);
    return false;
});

// Change modal image while selecting.
$('#modal_filename').change(function() {
    modal_val = $('option:selected').text();
    changeCardlImg("modal-img", modal_val);
   });

// Change card image.
function changeCardlImg(card_id, modal_val){
        let new_src = "./static/img/Rorschach/" + modal_val;
        document.getElementById(card_id).src = new_src;
        return false;
    }

