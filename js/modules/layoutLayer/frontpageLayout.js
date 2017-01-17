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
        $('.left-container').html(lc);
        
        // Generates front page
        this.generate_front_page();
        
    },
    
    // Generate front page
    generate_front_page: function( ) {
        
        ViewHandler.closeSingleView();
        ViewControllerModule.disableBackButton();

        // Adds the base front page html to the container
        $('.left-container').removeClass('active');
        $('.left-container').html( this.settings.lc );
        $('.right-container').html('').removeClass('active');
        $('.eventscontainer').removeClass('lineLayout');
        
        // Binds ui actions
        this.bindUIActions();
        
        // Gets events and locations categories
        EventCalenderModule.renderEventCalender( '.eventscontainer', { getNum: 0, acceptOld: false });
        $('.load-more').trigger('click');
        ViewHandler.bindUIActions();

        // Reload view heights
        if(ViewHandler.settings.poly_view){
            ViewHandler.reload_view( true );
            setTimeout(function(){
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
        
        $(document).on('click', '.event', function() {
            this.updateLayoutPosition();
        }.bind(this));

        $('.load-more').on('click', function() {
            var rest = EventCalenderModule.loadMore( this.settings.loadMoreGetNum );
            if ( rest > this.settings.loadMoreGetNum ) rest = this.settings.loadMoreGetNum;
            if ( rest > 0 ) { $('.load-more').html( 'Indlæs '+rest+' mere' ); }
            else { $('.load-more').html( 'Alt indhold indlæst' ); }
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
            EventCalenderModule.renderEventCalender( '.eventscontainer', { getNum: 20, acceptOld: true, from: elem[0].month_from, to: elem[0].month_to });
            ViewHandler.closeSingleView();
            ViewHandler.reload_view( true );
            this.updateLayoutPosition();

        }.bind(this));
    },
    
    // Update layout parts position
    updateLayoutPosition: function() {
        if ( !$('.left-container').hasClass('all-loaded') ) {
            setTimeout(function() {
                var esvi_height = $('.event-sv-info').outerHeight();
                $('.load-more').css({'height': esvi_height+'px', 'line-height': esvi_height+'px'});
                $('.left-container').css({'padding-bottom': esvi_height+'px'});
                ViewHandler.reload_view( false );
            }, 150);
        } else {
            $('.left-container').css({'padding-bottom': '0px'});
        }
    }

}
