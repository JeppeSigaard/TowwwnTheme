
// Heya
jQuery.prototype.initMonthPicker = function( options, callback ) {
    
    // Params
    var appendSelector = null;
    if ( typeof options.appendSelector !== 'undefined' && options.appendSelector !== null ) appendSelector = options.appendSelector;
    
    var years = null;
    if ( typeof options.years !== 'undefined' && options.years !== null ) years = options.years;
    
    // Other vars
    var months = {
        '-1': 'Alle måneder',
        '0': 'Januar',
        '1': 'Februar',
        '2': 'Marts',
        '3': 'April',
        '4': 'Maj',
        '5': 'Juni',
        '6': 'Juli',
        '7': 'August',
        '8': 'September',
        '9': 'Oktober',
        '10': 'November',
        '11': 'December',
    }
    
    var elem = $(this),
        pickerClass = 'monthPicker_selector',
        pickerHtml = '<div class="'+pickerClass+'">';
    
    for ( var key in months ) {
        pickerHtml += '<div class="month" data-key="'+key+'">'+months[key]+'</div>';
    } pickerHtml += '</div>';
    
    // Adds html to elem itself
    elem.html( 'Alle måneder &#9947;' );
    
    // Appends on click
    elem.click( function() {
        if ( $(this).hasClass('pickerActive') ) {
            
            // Removes Month picker
            $('.'+pickerClass).remove();
            $(this).removeClass('pickerActive'); 
            
        } else {
            
            // Appends picker to defined selector or body
            if ( appendSelector !== null ) $(appendSelector).append( pickerHtml );
            else $('body').append( pickerHtml );
            $(this).addClass('pickerActive'); 
            
            // Picker functionality
            $('.'+pickerClass+' .month').click( function() {
                
                elem.html( months[$(this).attr('data-key')]+' &#9947;' ); 
                if ( parseInt($(this).attr('data-key')) === -1 ) {
                    elem[0].month_from = new Date().getTime();
                    elem[0].month_to = new Date(3000, 01).getTime();
                } else {
                    elem[0].month_from = new Date(2017, parseInt($(this).attr('data-key'))).getTime();
                    elem[0].month_to = new Date(2017, parseInt($(this).attr('data-key'))+1).getTime();
                } callback( elem );
                
            });
            
        }
    }.bind(elem, pickerClass));

}