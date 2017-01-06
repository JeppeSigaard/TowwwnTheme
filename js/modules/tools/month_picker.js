
// Heya
jQuery.prototype.monthPicker = function( options, callback ) {

    if ( options.remove === true ) {
        // Removes Month picker
        $('.'+pickerClass).removeClass('active');
        $(this).removeClass('pickerActive');
        setTimeout(function() {
            $('.'+pickerClass).remove();
        }, 150);
    }
    
    // Params
    var appendSelector = null;
    if ( typeof options.appendSelector !== 'undefined' && options.appendSelector !== null ) appendSelector = options.appendSelector;
    
    var years = null;
    if ( typeof options.years !== 'undefined' && options.years !== null ) years = options.years;
    
    // Other vars
    var months = {
        '0': 'Jan',
        '1': 'Feb',
        '2': 'Mar',
        '3': 'Apr',
        '4': 'Maj',
        '5': 'Jun',
        '6': 'Jul',
        '7': 'Aug',
        '8': 'Sep',
        '9': 'Okt',
        '10': 'Nov',
        '11': 'Dec',
    }
    
    var elem = $(this),
        pickerClass = 'monthPicker_selector',
        pickerHtml = '<div class="'+pickerClass+'">',
        previousSelctions = [];
    
    for ( var key in months ) {
        pickerHtml += '<div class="month" data-key="'+key+'" id="'+key+'">'+months[key]+'</div>';
    } pickerHtml += '</div>';
    
    // Adds html to elem itself
    elem.html( 'Alle <div class="pickerArrow"></div>' );
    
    // Appends on click
    elem.click( function() {
        if ( $(this).hasClass('pickerActive') ) {
            
            // Removes Month picker
            $('.'+pickerClass).removeClass('active');
            $(this).removeClass('pickerActive');
            setTimeout(function() {
                $('.'+pickerClass).remove();
            }, 150);
            
        } else {

            // Appends picker to defined selector or body
            if ( appendSelector !== null ) $(appendSelector).append( pickerHtml );
            else $('body').append( pickerHtml );
            $(this).addClass('pickerActive'); 
            $('.'+pickerClass).flickity({
                cellAlign: 'center',
                prevNextButtons: false,
                pageDots: false,
                contain: true,
            });

            $('.'+pickerClass).addClass('active');
            if ( previousSelctions.length === 1 ) {
                $('.'+pickerClass+' #'+previousSelctions[0]).addClass('active');
            } else if ( previousSelctions.length > 1 ) {
                $('.'+pickerClass+' #'+previousSelctions[0]).addClass('active-left');
                $('.'+pickerClass+' #'+previousSelctions[previousSelctions.length-1]).addClass('active-right');
                for ( var i = 1; i < previousSelctions.length-1; i++ ) {
                    $('.'+pickerClass+' #'+previousSelctions[i]).addClass('active-middle');
                }
            }
            
            // Picker functionality
            var clickPoint = null;
            $('.'+pickerClass+' .month').click( function() {
                $('.'+pickerClass+' .month').removeClass('active');
                $('.'+pickerClass+' .month').removeClass('active-left');
                $('.'+pickerClass+' .month').removeClass('active-middle');
                $('.'+pickerClass+' .month').removeClass('active-right');
                previousSelctions = [];

                var ncpMonth = parseInt($(this).attr('data-key'));
                var from = new Date(2017, ncpMonth).getTime();
                var to = new Date(2017, ncpMonth+1).getTime();

                if ( clickPoint !== null ) {
                    if ($(this).attr('data-key') === clickPoint.attr('data-key')) {
                        clickPoint.removeClass('active');
                        elem[0].month_from = new Date().getTime();
                        elem[0].month_to = new Date(3000, 1).getTime();
                        clickPoint = null;
                        elem.html( 'Alle <div class="pickerArrow"></div>' );
                        callback( elem ); return;
                    }

                    var ocpMonth = parseInt(clickPoint.attr('data-key'));
                    var fromPoint = 0, toPoint = 0;
                    if ( new Date( 2017, ocpMonth ).getTime() < new Date ( 2017, ncpMonth ) ) {
                        from = new Date( 2017, ocpMonth ).getTime(); fromPoint = ocpMonth;
                        to = new Date( 2017, ncpMonth+1 ).getTime(); toPoint = ncpMonth;
                        clickPoint.addClass('active-left');
                        $(this).addClass('active-right')
                    } else {
                        from = new Date( 2017, ncpMonth ).getTime(); fromPoint = ncpMonth;
                        to = new Date( 2017, ocpMonth+1 ).getTime(); toPoint = ocpMonth;
                        $(this).addClass('active-left');
                        clickPoint.addClass('active-right')
                    }

                    elem.html( months[fromPoint]+' - '+months[toPoint] + '<div class="pickerArrow"></div>' );

                    for ( var i = fromPoint+1; i < toPoint; i++ ) {
                        $('.'+pickerClass+' #'+i).addClass('active-middle');
                    }

                    clickPoint = null;
                } else {
                    clickPoint = $(this);
                    $(this).addClass('active');
                    elem.html( months[$(this).attr('data-key')] + '<div class="pickerArrow"></div>' );
                }

                for ( var i = fromPoint; i < toPoint+1; i++ ) {
                    previousSelctions.push( i );
                }

                elem[0].month_from = from;
                elem[0].month_to = to;
                callback( elem );
                
            });
            
        }
    }.bind(elem, pickerClass));

}
