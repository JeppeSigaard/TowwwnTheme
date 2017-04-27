$(function() {
    $('.blocklayoutbtn').on('click', function() {
        if ($('#eventscontainer').hasClass('lineLayout')) {
            $('#eventscontainer').removeClass('lineLayout');
        }
    });

    $('.linelayoutbtn').on('click', function() {
        if (!$('#eventscontainer').hasClass('lineLayout')) {
            $('#eventscontainer').addClass('lineLayout');
        }
    });
});
