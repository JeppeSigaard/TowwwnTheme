// Front page module
var FrontPageModule = {
    
    // Variables
    settings: {  
        ready: false,
        lc: '',
    },
    
    // Init
    init: function() {  
        
        // Generates left container content
        var lc = '<div id="eventsbar">';
        lc += '<div id="eventslayoutbtns">';
        lc += '<img class="blocklayoutbtn" src="'+template_uri+'/style/assets/icons/blockLayout.PNG" />';
        lc += '<img class="linelayoutbtn" src="'+template_uri+'/style/assets/icons/lineLayout.PNG" /></div>';
        lc += '<div class="monthSelector"></div>';
        lc += '</div><div class="picker"></div>';
        
        lc += '<div class="eventscontainer"></div>';
        this.settings.lc = lc;
        $('.left-container').html(lc);
        
        // Generates front page
        this.generate_front_page();
        
    },
    
    // Generate front page
    generate_front_page: function( ) {
        
        // Adds the base front page html to the container
        $('.left-container').removeClass('active');
        $('.left-container').html( this.settings.lc );
        $('.right-container').html('').removeClass('active');
        $('.eventscontainer').removeClass('lineLayout');
        
        // Binds ui actions
        this.bindUIActions();
        
        // Gets events and locations categories
        EventCalenderModule.renderEventCalender( '.eventscontainer', { getNum: 55, acceptOld: false });
        ViewHandler.bindUIActions();

        // Reload view heights
        if(ViewHandler.settings.poly_view){
            setTimeout(function(){
                $('.left-container').css('height', 'auto');
                $('.right-container').css('height', '0');
                $('.content-container').flickity('reloadCells');
                $('.left-container, .right-container').css('height', $('.content-container .flickity-viewport').height());
                $(window).trigger('scroll');
                ViewHandler.go_to(0);
            },150);
        }

        // Annnnnd its ready
        this.settings.ready = true;
    
    },
    
    // Bind UI Actions
    bindUIActions: function() {
        
        if ( !this.settings.ready ) {
            $('.logo-container').on( 'click', function() {
                this.generate_front_page();
                $('#searchfield').val('');
            }.bind( this ));
        }
        
        $('.blocklayoutbtn').on( 'click', function() {
            $('.eventscontainer').removeClass('lineLayout'); 
            if(ViewHandler.settings.poly_view){
                setTimeout(function(){
                    $('.left-container').css('height', 'auto');
                    $('.right-container').css('height', '0');
                    $('.content-container').flickity('reloadCells');
                    $('.left-container, .right-container').css('height', $('.content-container .flickity-viewport').height());
                    $(window).trigger('scroll');
                    ViewHandler.go_to(0);
                },150);
            }
        });
        
        $('.linelayoutbtn').on( 'click', function() {
            $('.eventscontainer').addClass('lineLayout');
            if(ViewHandler.settings.poly_view){
                setTimeout(function(){
                    $('.left-container').css('height', 'auto');
                    $('.right-container').css('height', '0');
                    $('.content-container').flickity('reloadCells');
                    $('.left-container, .right-container').css('height', $('.content-container .flickity-viewport').height());
                    $(window).trigger('scroll');
                    ViewHandler.go_to(0);
                },150);
            }
        });
        
        $('.monthSelector').monthPicker({
            'appendSelector': '.picker',
        }, function( elem ) {

            $('.eventscontainer').html( '' );
            EventCalenderModule.renderEventCalender( '.eventscontainer', { getNum: 150, acceptOld: false, from: elem[0].month_from, to: elem[0].month_to });
            if(ViewHandler.settings.poly_view){
                setTimeout(function(){
                    $('.left-container').css('height', 'auto');
                    $('.right-container').css('height', '0');
                    $('.content-container').flickity('reloadCells');
                    $('.left-container, .right-container').css('height', $('.content-container .flickity-viewport').height());
                    $(window).trigger('scroll');
                },150);
            }

        }.bind(this));
    },
    
}
