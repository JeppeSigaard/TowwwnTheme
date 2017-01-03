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
        lc += '<div class="picker"></div></div>';
        
        lc += '<div class="eventscontainer"></div>';
        this.settings.lc = lc;
        $('.left-container').html(lc);
        
        // Generates front page
        this.generate_front_page()
        
    },
    
    // Generate front page
    generate_front_page: function() {
        
        // Adds the base front page html to the container
        $('.left-container').removeClass('active');
        $('.right-container').html('').removeClass('active');
        $('.eventscontainer').removeClass('lineLayout');
        
        if ( !this.settings.ready ) {
        
            // Gets events and locations categories
            EventCalenderModule.renderEventCalender( '.eventscontainer', { getNum: 49, acceptOld: false });
            ViewHandler.bindUIActions();

            // Binds ui actions
            this.bindUIActions();
        
            // Annnnnd its ready
            this.settings.ready = true;
            
        }
    
    },
    
    // Bind UI Actions
    bindUIActions: function() {
        
        if ( !this.settings.ready ) {
            $('.logo-container').on( 'click', function() {
                this.generate_front_page();
                $(window).scrollTop(0);
                $('#searchfield').val('');
                this.bindUIActions();
            }.bind( this ));
        }
        
        $('.blocklayoutbtn').on( 'click', function() {
            $('.eventscontainer').removeClass('lineLayout'); 
        });
        
        $('.linelayoutbtn').on( 'click', function() {
            $('.eventscontainer').addClass('lineLayout');
        });
        
        $('.monthSelector').initMonthPicker({
            'appendSelector': '.picker',
        }, function( elem ) {
            $('.eventscontainer').html( '' );
            EventCalenderModule.renderEventCalender( '.eventscontainer', { getNum: 49, acceptOld: false, from: elem[0].month_from, to: elem[0].month_to });
        }.bind(this));
    },
    
}