
// Click effects of the modal.
$("#card_list").on("click", "#get_report", function (e) {

    let card = document.getElementById("card_1").firstChild
                .firstChild.firstChild.childNodes;
    let card_data = getReportData(card);
    
    localStorage.setItem('report_card', JSON.stringify(card_data));
});

// Get data as json from document.card.
function getReportData(card){
    let card_data_json = {};
    card_data_json['title'] = card[0].firstChild.firstChild.firstChild.value;

    let bodies = card[1].childNodes;
    card_data_json['top_comment'] = bodies[0].firstChild.value;
    card_data_json['comment'] = bodies[2].value;

    let contents = [];
    for (ct of bodies[1].childNodes){
        contents.push(ct.firstChild.firstChild.src.split("/").slice(-1)[0]);
    }

    card_data_json['img_list'] = contents; 

    return card_data_json;
}
