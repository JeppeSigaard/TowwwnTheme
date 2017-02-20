// Front page module
var FrontPageModule = {
    
    // Variables
    settings: {  
        ready: false,
        lc: '',
        loadMoreGetNum: 25,
    },
    
    // Init
    init: function( tmp ) {
        
        // Generates left container content
        var lc = '<div id="eventsbar">';
        lc += '<div id="eventslayoutbtns">';
        lc += '<img class="blocklayoutbtn" src="'+template_uri+'/style/assets/icons/blockLayout.PNG" />';
        lc += '<img class="linelayoutbtn" src="'+template_uri+'/style/assets/icons/lineLayout.PNG" /></div>';
        lc += '<div class="monthSelector"></div>';
        lc += '</div><div class="picker"></div>';
        
        lc += '<div class="eventscontainer"></div>';
        
        if ( tmp ) {
            lc += '<div class="load-more">Indlæser flere elementer...</div>'
        } else {
            lc += '<div class="load-more">Indlæs '+this.settings.loadMoreGetNum+' mere</div>'
        }

        this.settings.lc = lc;
        if ( tmp ) ViewHandler.settings.event_calender.html(lc);

        // Generates front page
        this.generate_front_page( tmp );
        
    },
    
    // Generate front page
    generate_front_page: function( tmp ) {
        
        if ( tmp ) {
            ViewHandler.closeSingleView();
            ViewControllerModule.disableBackButton();

            // Adds the base front page html to the container
            if ( ViewHandler.settings.poly_view ) {
                ViewHandler.closeSingleView();
            } else {
                ViewHandler.settings.event_calender.removeClass('active');
                // ViewHandler.settings.right_container.html('').removeClass('active');
            }

            $('.eventscontainer').removeClass('lineLayout');
        }

        ViewHandler.settings.event_calender.html( this.settings.lc );
        
        // Binds ui actions
        this.bindUIActions();
        
        // Gets events and locations categories
        EventCalenderModule.renderEventCalender( '.eventscontainer', { getNum: 0, acceptOld: false });
        $('.load-more').trigger('click');
        if ( tmp ) $('.load-more').html( 'Indlæser flere elementer...' );
        ViewHandler.bindUIActions();
        this.updateLayoutPosition();
        ViewControllerModule.disableBackButton();

        // Annnnnd its ready
        this.settings.ready = true;

    },
    
    // Bind UI Actions
    bindUIActions: function() {

        if ( !this.settings.ready ) {
            $('.logo-container').on( 'click', function(e) {
                if($('body').hasClass('app')){
                    e.preventDefault();
                }
                this.generate_front_page();
                $('#searchfield').val('');
            }.bind( this ));
        }
        
        $(document).on('click', '.event', function() {
            this.updateLayoutPosition();
        }.bind(this));

        $('.load-more').on('click', function() {
            var rest = EventCalenderModule.loadMore( this.settings.loadMoreGetNum );
            if ( rest > this.settings.loadMoreGetNum ) rest = this.settings.loadMoreGetNum;
            if ( rest > 0 ) { $('.load-more').html( 'Indlæs '+rest+' mere' ); }
            else { $('.load-more').html( 'Alt indhold indlæst' ); }
            
            setTimeout(function() {
                $(window).trigger('scroll');
                syncScroll.rescaleContainer();
            }, 150);
        }.bind(this));

          /*
        var can_load_on_scroll = true
        $(window).on('scroll', function(){
            if (0 > $('.load-more').offset().top - $(window).scrollTop() - $(window).height() && can_load_on_scroll){
                can_load_on_scroll = false;
                $('.load-more').trigger('click');
                setTimeout(function(){
                     can_load_on_scroll = true;
                },2000);
            }
        });
        */

        $('.blocklayoutbtn').on( 'click', function() {
            $('.eventscontainer').removeClass('lineLayout'); 
            ViewHandler.reload_view( true );
        });
        
        $('.linelayoutbtn').on( 'click', function() {
            $('.eventscontainer').addClass('lineLayout');
            ViewHandler.reload_view( true );
        });
        
        $('.monthSelector').monthPicker({
            'appendSelector': '.picker',
        }, function( elem ) {

            $('.eventscontainer').html( '' );
            EventCalenderModule.renderEventCalender( '.eventscontainer', { getNum: 0, acceptOld: true, from: elem[0].month_from, to: elem[0].month_to });
            var loadResponse = EventCalenderModule.loadMore( 25 );
            if ( loadResponse === -1 ) {
                $('.eventscontainer').html( '<div class="error">Ingen elementer fundet</div>' );
            } this.updateLayoutPosition();

            setTimeout(function() {
                syncScroll.rescaleContainer();
            }, 100);

        }.bind(this));
    },
    
    // Update layout parts position
    updateLayoutPosition: function() {
    },

}
