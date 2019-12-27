function make_card(page_num, type_number, title, img_path_list){
    // Main container.
    var container = document.createElement("div");
    container.classList.add("container-fluid", "mt-5");
    container.id= "card_" + page_num;

    var row = document.createElement("div");
    row.classList.add("row", "wow", "fadeIn");

    var col = document.createElement("div");
    col.classList.add("col-md-12", "mb-4");

    // Main Card.
    var card = document.createElement("div");
    card.classList.add("card");

    // --Card Header.
    var card_header = document.createElement("div");
    card_header.classList.add("card-header");

    var header_row = document.createElement("div");
    header_row.classList.add("row");

    var header_col_left = document.createElement("div");
    header_col_left.classList.add("col-10");

    var header_col_right = document.createElement("div");
    header_col_right.classList.add("col-2");

    var header_button = document.createElement("button");
    header_button.classList.add("btn", "btn-primary");
    header_button.type = "button";
    header_button.textContent = "GET";
    header_button.id = "get_report";

    var title_col = document.createElement("input");
    title_col.classList.add("form-control", "form-control-lg");
    title_col.value = title;

    // --Card Body.
    var card_body = document.createElement("div");
    card_body.classList.add("card-body");

    var top_form_group = document.createElement("div");
    top_form_group.classList.add("form-group");

    var top_comment = document.createElement("textarea");
    top_comment.classList.add("form-control");
    top_comment.id = "top_comment";
    top_comment.rows = "2";
    top_comment.placeholder = "トップコメント";
    
    // --Card Body --Content.
    var content = content_type(page_num, type_number, img_path_list);

    var bottom_comment = document.createElement("textarea");
    bottom_comment.classList.add("form-control");
    bottom_comment.id = "bottom_comment";
    bottom_comment.rows = "3";
    bottom_comment.placeholder = "コメント";

    // Assemble all elements.   
    container.appendChild(row);
    row.appendChild(col);
    col.appendChild(card);
    card.appendChild(card_header);

    card_header.appendChild(header_row);
    header_row.appendChild(header_col_left);
    header_row.appendChild(header_col_right);
    header_col_left.appendChild(title_col);
    header_col_right.appendChild(header_button);

    card.appendChild(card_body);
    card_body.appendChild(top_form_group);
    top_form_group.appendChild(top_comment);
    card_body.appendChild(content);
    card_body.appendChild(bottom_comment);

    document.getElementById('card_list').appendChild(container);

};

var img_path_list_summary = ["Rorschach/rs1.jpg", 'Rorschach/rs2.jpg'];
var img_path_list_summary = ["Rorschach/rs1.jpg", 'Rorschach/rs2.jpg',
"Rorschach/rs3.jpg", 'Rorschach/rs4.jpg'];


make_card(1, 2, "Sample", img_path_list_summary);
make_card(2, 4, "Test", img_path_list_summary);


// Make content part.
function make_content(page_num, card_num, row_num, file_name_path) {
    var cont_11 = document.createElement("div");
    cont_11.classList.add(`col-md-${row_num}`);

    var box_shadow = document.createElement("div");
    box_shadow.classList.add("card", "mb-4", "box-shadow");

    var img = document.createElement("img");
    img.classList.add("card-img-top");
    img.src = "./static/img/" + file_name_path;
    img.alt = "Crad image cap";
    img.id = `card_img_${page_num}_${card_num}`;

    var editor_body = document.createElement("div");
    editor_body.classList.add("card-body");

    var editor = document.createElement("div");
    editor.classList.add("d-flex", "justify-content-between", "align-items-center");
    var btn_group = document.createElement("div");
    btn_group.classList.add("btn-group");
    var edit_buttn = document.createElement("button");
    edit_buttn.classList.add("btn", "btn-sm", "btn-outline-secondary");
    edit_buttn.textContent = "Edit";
    edit_buttn.id = `page_${page_num}-card_${card_num}`;
    edit_buttn.type = "button";
    edit_buttn.dataset.toggle = "modal";
    edit_buttn.dataset.target = "#exampleModal";

    var folder_selector = document.createElement("form");
    folder_selector.name = "folder_select";
    var f_selector_select = document.createElement("select");
    f_selector_select.classList.add("form-control");
    f_selector_select.id = `folder_name_page_${page_num}-card_${card_num}`;

    for (op of JSON.parse(localStorage.folder_list)){
        var f_option = document.createElement("option");
        f_option.textContent = op;
        f_selector_select.appendChild(f_option);
    }
    folder_selector.appendChild(f_selector_select);

    editor_body.appendChild(editor);
    editor.appendChild(folder_selector);
    editor.appendChild(btn_group);
    btn_group.appendChild(edit_buttn);
    
    cont_11.appendChild(box_shadow);
    box_shadow.appendChild(img);
    box_shadow.appendChild(editor_body);

    return cont_11;
}

// Convert type_number to content_len.
function typeNumberToLength(type_number) {
    var content_len;
    if (type_number == 1) {
        content_len = 12;
    }
    else if (type_number == 2) {
        content_len = 6;
    }
    else if (type_number == 4) {
        content_len = 5;
    }
    else if (type_number == 8) {
        content_len = 3;
    }
    else if (type_number == 10) {
        content_len = 2;
    }
    return content_len; 
}

// Make contents Type.
function content_type(page_num, type_number, img_path_list) {
    var content_len = typeNumberToLength(type_number);
    var content = document.createElement("div");
    content.classList.add("row");

    if (type_number == 4 || type_number == 10){
        var block_1 = document.createElement("div");
        block_1.classList.add("row", "justify-content-center");

        var block_2 = document.createElement("div");
        block_2.classList.add("row", "justify-content-center");

        content.appendChild(block_1);
        content.appendChild(block_2);

        for (i=0; i<type_number/2; i++){
            block_1.appendChild(make_content(page_num, i+1, content_len, img_path_list[i]));
        }
        for (i=type_number/2; i<type_number; i++){
            block_2.appendChild(make_content(page_num, i+1, content_len, img_path_list[i]));
        }
    }

    else {
        for (i=0; i<type_number; i++){
            content.appendChild(make_content(page_num, i+1, content_len, img_path_list[i]));
        }
    }

    return content; 
}
