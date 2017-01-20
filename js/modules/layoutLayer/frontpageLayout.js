// Front page module
var FrontPageModule = {
    
    // Variables
    settings: {  
        ready: false,
        lc: '',
        loadMoreGetNum: 25,
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
        lc += '<div class="load-more">Indlæs '+this.settings.loadMoreGetNum+' mere</div>'

        this.settings.lc = lc;
        ViewHandler.settings.left_container.html(lc);
        
        // Generates front page
        this.generate_front_page();
        
    },
    
    // Generate front page
    generate_front_page: function( ) {
        
        ViewHandler.closeSingleView();
        ViewControllerModule.disableBackButton();

        // Adds the base front page html to the container
        if ( ViewHandler.settings.poly_view ) {
            ViewHandler.closeSingleView();
        } else {
            ViewHandler.settings.left_container.removeClass('active');
            ViewHandler.settings.right_container.html('').removeClass('active');
        }

        ViewHandler.settings.left_container.html( this.settings.lc );
        $('.eventscontainer').removeClass('lineLayout');
        
        // Binds ui actions
        this.bindUIActions();
        
        // Gets events and locations categories
        EventCalenderModule.renderEventCalender( '.eventscontainer', { getNum: 0, acceptOld: false });
        $('.load-more').trigger('click');
        ViewHandler.bindUIActions();
        this.updateLayoutPosition();
        ViewControllerModule.disableBackButton();

        // Reload view heights
        if(ViewHandler.settings.poly_view){
            setTimeout(function(){
                ViewHandler.reload_view( false );
                ViewHandler.go_to(0);
            },150);
        }
        
        setTimeout(function() {
            $(window).trigger('resize');
        }, 250);

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
                $(window).trigger('resize');
            }, 100);

        }.bind(this));
    },
    
    // Update layout parts position
    updateLayoutPosition: function() {
        setTimeout(function() {
            if ( $('.event-sv-info').length > 0 ) { var esvi_height = $('.event-sv-info').outerHeight(); }
            else { var esvi_height = 141; }

            $('.load-more').css({'height': esvi_height+'px', 'line-height': esvi_height+'px'});
            ViewHandler.settings.left_container.css({'padding-bottom': esvi_height+'px'});
            syncScroll.rescaleContainer();
        }, 150);
    }

}
