
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
    
    var years = [
        '2016',
        '2017',
        '2018'
    ]

    var elem = $(this),
        pickerClass = 'monthPicker_selector',
        pickerHtml = '<div class="'+pickerClass+'">',
        previousSelctions = [],
        clickPoint = null;
    
    for ( var year in years ) {
        for ( var key in months ) {
            pickerHtml += '<div class="month" data-key="'+key+'" id="'+years[year]+'-'+key+'"><div class="monthTitle">'+months[key]+'</div>';
            pickerHtml += '<div class="yearTitle" data-key="'+years[year]+'">'+years[year]+'</div></div>';
        }
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
            $('.'+pickerClass+' .month').click( function() {
                $('.'+pickerClass+' .month').removeClass('active');
                $('.'+pickerClass+' .month').removeClass('active-left');
                $('.'+pickerClass+' .month').removeClass('active-middle');
                $('.'+pickerClass+' .month').removeClass('active-right');
                previousSelctions = [];

                var ncpMonth = parseInt($(this).attr('data-key'));
                var ncpYear = parseInt($('.yearTitle', this).attr('data-key'))
                var from = new Date(ncpYear, ncpMonth).getTime();
                var to = new Date(ncpYear, ncpMonth+1).getTime();

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
                    var ocpYear = parseInt($('.yearTitle', clickPoint).attr('data-key'));
                    var fromPoint = 0, toPoint = 0, fromYear = 0, toYear = 0;
                    if ( new Date( ocpYear, ocpMonth ).getTime() < new Date ( ncpYear, ncpMonth ).getTime() ) {
                        from = new Date( ocpYear, ocpMonth ).getTime(); fromPoint = ocpMonth; fromYear = ocpYear;
                        to = new Date( ncpYear, ncpMonth+1 ).getTime(); toPoint = ncpMonth; toYear = ncpYear;
                        clickPoint.addClass('active-left');
                        $(this).addClass('active-right')
                    } else {
                        from = new Date( ncpYear, ncpMonth ).getTime(); fromPoint = ncpMonth; fromYear = ncpYear;
                        to = new Date( ocpYear, ocpMonth+1 ).getTime(); toPoint = ocpMonth; toYear = ocpYear;
                        $(this).addClass('active-left');
                        clickPoint.addClass('active-right');
                    }

                    elem.html( months[fromPoint]+' '+fromYear+' - '+months[toPoint]+' '+toYear+'<div class="pickerArrow"></div>' );
                    clickPoint = null;

                } else {
                    clickPoint = $(this);
                    $(this).addClass('active');
                    elem.html( months[$(this).attr('data-key')]+' '+$('.yearTitle').attr('data-key')+'<div class="pickerArrow"></div>' );
                    previousSelctions.push( $('.yearTitle',this).attr('data-key')+'-'+$(this).attr('data-key') );
                }

                for ( var iy = fromYear; iy < toYear+1; iy++ ) {
                    for ( var i = fromPoint; i < toPoint+1; i++ ) {
                        previousSelctions.push( iy+'-'+i );
                    }
                }

                if ( fromYear !== 'undefined' && toYear !== 'undefined' ) {
                    if ( parseInt(fromYear) !== parseInt(toYear) ) {
                        for ( var month = fromPoint+1; month < 12; month++ ) {
                            $('#'+fromYear+'-'+month).addClass('active-middle');
                        }

                        for ( var month = 0; month < toPoint; month++ ) {
                            $('#'+toYear+'-'+month).addClass('active-middle');
                        }

                        for ( var year = fromYear+1; year < toYear; year++ ) {
                            for ( var month = 0; month < 12; month++ ) {
                                $('#'+year+'-'+month).addClass('active-middle');
                            }
                        }
                    } else {
                        for ( var month = fromPoint+1; month < toPoint; month++ ) {
                            $('#'+fromYear+'-'+month).addClass('active-middle');
                        }
                    }
                }

                elem[0].month_from = from;
                elem[0].month_to = to;
                callback( elem );
                
            });
            
        }
    }.bind(elem, pickerClass));

}
