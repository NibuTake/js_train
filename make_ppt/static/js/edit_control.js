// Global objects.
var choice = "File";
var change_modal_id;
var modal_val;
var modal_f_name;

let folder_list = ['demand', 'energy', 'additional'];
localStorage.setItem("folder_list", JSON.stringify(folder_list));

folder_json = {'demand': {'img': ['sample1', 'sample2']},
               'energy': {'img': ['sample1', 'sample2', 'sample3']}
              }

localStorage.setItem("folder", JSON.stringify(folder_json));

// File list.
function getFilelistFromServer(img_path){
$.getJSON($SCRIPT_ROOT + '/get_file_list', {img_path
      }, function(data) {
        // Recieve data from python as json and json.dumped.
        var file_list = data.file_list;

        let modal_select = document.getElementById("modal_filename");
        $("#modal_filename").empty();
        console.log(modal_select.childNodes);
        for (var ch of file_list){
            var option = document.createElement("option");
            var text = document.createTextNode(ch);
            option.appendChild(text);
            modal_select.appendChild(option);
        }

    return false;
});
}

// Click effects of the modal.
$("#card_list").on("click", /page_\d-card_\d*/, function (e) {
    let button_id = e.target.id;
    let result = button_id.match(/page_\d-card_\d*/);
    console.log(button_id);

    if (result != null) {
        // Change sample text.
        //let cont = document.getElementById("modal-name");
        //cont.textContent = button_id;

        // Get ID from button_id.
        let page_num = button_id.match(/page_\d*/)[0].split("_")[1];
        let card_num = button_id.match(/card_\d*/)[0].split("_")[1];
        change_modal_id = `card_img_${page_num}_${card_num}`;

        let modal_title = document.getElementById("modal_title");
        let folder = document.getElementById(`folder_name_page_${page_num}-card_${card_num}`);
        modal_f_name = $('option:selected', folder).text();
        modal_title.textContent = modal_f_name;
        getFilelistFromServer(modal_f_name);

        // Initialize modal top image.
        let base = document.getElementById(change_modal_id).src.split("/").slice(-1)[0];
        changeCardlImg("modal-img", base, modal_f_name);
    }
});


// Save modal change.
$("#save_modal_change").on("click", function (){
    console.log("Save");
    changeCardlImg(change_modal_id, modal_val, modal_f_name);
    return false;
});

// Change modal image while selecting.
$('#modal_filename').change(function(e) {
    modal_val = $('option:selected', this).text();
    console.log("modal_val  " + modal_val);
    changeCardlImg("modal-img", modal_val, modal_f_name);
   });

// Change card image.
function changeCardlImg(card_id, modal_val, f_name){
        let new_src = `/static/img/${f_name}/${modal_val}`;
        document.getElementById(card_id).src = new_src;
        return false;
    }

