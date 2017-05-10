$(function() {

    // Layout buttons
    $('.blocklayoutbtn').on('click', function() {
        $('.eventscontainer').removeClass('lineLayout');
    });

    $('.linelayoutbtn').on('click', function() {
        $('.eventscontainer').addClass('lineLayout');
    });

});
