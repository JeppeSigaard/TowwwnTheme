// Header Module
var HeaderModule = {
    
    // Vars
    settings: {
        menu_ready: false,
        breakpoint: 0,
        views: [],
        startScroll: $(window).scrollTop(),
        canCollapse : true,
    },
    
    // Init
    init: function() {
        
        var swiperSlides = $('.header-commercials').find('.swiper-slide').length;
        if ( swiperSlides > 1 ) {
            var header_commercials = new Swiper ('.header-commercials', {
                direction: 'horizontal',
                loop: true,
                autoplay: 9000, //ms
                autoplayDisableOnInteraction: false,
                pagination: '.header-commercial-bullets',
                paginationType : 'bullets',
                paginationClickable : true,
            });
        }

        this.setMenuPosition();
        this.bindUIActions();
    },
    
    // Bind ui actions
    bindUIActions: function() {
        
        // Set menu position
        this.settings.menu_ready = false;

        if ( $(window).innerWidth() <= 640 ) {
            $('.header-container').hide().addClass( 'fixed' ).show();
            $('.menu-show-btns').addClass( 'show' );
        }

        $(window).on('scroll', function() {
            this.setMenuPosition();
        }.bind(this));

        $(window).on('resize', function() {
            this.setMenuPosition();
        }.bind(this));

        
        // Checks for key press on space
        $('.menu-show-btns').on('click', this.show_menu.bind(this));
        $(window).on('keydown', function(e) {
            if ( $(window).scrollTop() > $('#header').height() 
                && !$('.header-container').hasClass( 'active' )
                && e.keyCode === 32 ) {

                e.preventDefault();
                $('#searchfield').select();
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
    
    setMenuPosition: function(){
        if ( Math.abs( $(window).scrollTop() - this.settings.startScroll ) > 10 && this.settings.canCollapse) {
            $('.header-container').removeClass( 'active' );
            $('.menu-show-btns').removeClass( 'active' );

            this.settings.breakpoint = $('#header').height() + $('#header').position().top;
            if ( $(window).scrollTop() >= this.settings.breakpoint ) {
                $('.header-container').hide().addClass( 'fixed' ).show();
                $('.menu-show-btns').addClass( 'show' );
                this.settings.menu_ready = true;
            } else {
                $('.header-container').hide().removeClass( 'fixed' ).show();
                $('.menu-show-btns').removeClass( 'show' );
                this.settings.menu_ready = false;
            }

            if ( $(window).innerWidth() <= 640 ) {
                $('.header-container').hide().addClass( 'fixed' ).show();
                $('.menu-show-btns').addClass( 'show' );
                this.settings.menu_ready = true;
            }
        }
    },

    // Show menu ( Drop down look-a-like )
    show_menu: function( forceHide ) {

        if(typeof forceHide === 'undefined'){forceHide = false;}

        if ( this.settings.menu_ready ) {


            if ( $('.menu-show-btns').hasClass( 'active' ) || forceHide === true && this.settings.canForceHide) {
                $('.menu-show-btns').removeClass( 'active' );
                $('.header-container').removeClass( 'active' );

            } else {
                this.settings.startScroll = $(window).scrollTop();
                $('#searchfield').select();
                $('.menu-show-btns').addClass( 'active' );
                $('.header-container').addClass( 'active' );
                this.settings.canCollapse = false;
                setTimeout(function(){this.settings.canCollapse = true;}.bind(this),400);
            }
        }
    },
    
}
