// Header Module
var HeaderModule = {
    
    // Vars
    settings: {
        menu_ready: false,
        breakpoint: 0,
        views: [],
    },
    
    // Init
    init: function() {
<<<<<<< HEAD
        var header_commercials = new Swiper ('.header-commercials', {
            direction: 'horizontal',
            loop: true,
            autoplay: 4500, //ms
            autoplayDisableOnInteraction: false,
=======
        var commercial_swiper = new Swiper ('.commercial-container', {
            direction: 'horizontal',
            loop: true,
            prevButton: '.prevButton',
            nextButton: '.nextButton',
>>>>>>> origin/no-sync-scroll
        });

        this.bindUIActions();
    },
    
    // Bind ui actions
    bindUIActions: function() {
        
        // Adds classes to menu ( Like active, fixed, etc )
        this.settings.menu_ready = false;
        $(window).on('scroll', function() {
            $('.header-container').removeClass( 'active' );
            $('.menu-show-btns').removeClass( 'active' );

            this.settings.breakpoint = $('#header').height() + $('#header').position().top;
            if ( $(window).scrollTop() >= this.settings.breakpoint ) {
                $('.header-container').addClass( 'fixed' );
                $('.header-placeholder').addClass( 'fixed' );
                $('.menu-show-btns').addClass( 'show' );
                $('.event-singleview').addClass( 'fixed' );
                this.settings.menu_ready = true;
            } else {
                $('.header-container').removeClass( 'fixed' );
                $('.header-placeholder').removeClass( 'fixed' );
                $('.menu-show-btns').removeClass( 'show' );
                $('.event-singleview').removeClass( 'fixed' );
                this.settings.menu_ready = false;
            }
            
            if ( $(window).innerWidth() <= 640 ) {
                $('.header-container').addClass( 'fixed' );
                $('.header-placeholder').addClass( 'fixed' );
                $('.menu-show-btns').addClass( 'show' );
                $('.event-singleview').addClass( 'fixed' );
                this.settings.menu_ready = true;
            }

        }.bind(this));
        $(window).trigger('scroll');

        $(window).on('resize', function() {
            $(this).trigger('scroll');
        });
        
        // Checks for key press on space
        $('.menu-show-btns').on('click', this.show_menu.bind(this));
        $(window).on('keydown', function(e) {
            if ( $(window).scrollTop() > $('#header').height() 
                && !$('.header-container').hasClass( 'active' )
                && e.keyCode === 32 ) {

                e.preventDefault();
                $('#searchfield').focus();
                this.show_menu();

            } else if (  $(window).scrollTop() > $('#header').height()
                         && $('.header-container').hasClass('active')
                         && e.keyCode === 32 ) {

                if ( $('#searchfield').val() === '' || $('#searchfield').val() === ' ' ) {
                    e.preventDefault();
                    $('#searchfield').val( '' );
                    this.show_menu();
                }
            }
        }.bind(this));
        
    },
    
    // Show menu ( Drop down look-a-like )
    show_menu: function() {
          if ( this.settings.menu_ready ) {
            if ( $('.menu-show-btns').hasClass( 'active' ) ) {
                $('.menu-show-btns').removeClass( 'active' );
                $('.header-container').removeClass( 'active' );
            } else {
                $('.menu-show-btns').addClass( 'active' );
                $('.header-container').addClass( 'active' );    
            }
        }
    },
    
}
