$(function () {
    $('#jquery-ui-sortable').sortable({
        axis: 'y',
        revert: true,
        helper: 'clone',
        update: function (e, ui) {
            // Get the mutable sidebar list as sidebarList.
            var sidebarList = $('#jquery-ui-sortable').sortable('toArray');

            // Get the relative card_list element.
            var myUL = document.getElementById("card_list");

            for (k in sidebarList) {
                // Convert id from card_list_n to card_n.
                var node_name = sidebarList[k].replace('_list', '');
                // Get a node eith node_name.
                var node = document.getElementById(node_name);

                // Replace the relative card_list.
                myUL.appendChild(myUL.removeChild(node))
            }
        }
    });
    $('#jquery-ui-sortable').disableSelection();
});