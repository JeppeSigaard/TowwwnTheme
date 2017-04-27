
// Image Controller Module
var ImageController = {

    // Settings
    settings: {
        backImages: true,
        loaderReady: false,
        state: -1,
        large_ready: false,
        medium_ready: false,
        small_ready: false,
        size_large: 1400,
        size_medium: 950,
        size_small: 500,
    },

    // Init
    init: function() {

        // Loads loader gif
        var xhr = new XMLHttpRequest();
        xhr.onload = function() {
            ImageController.settings.loaderReady = true;
        }

        xhr.open( 'GET', template_uri+'/style/assets/icons/loading.svg' );
        xhr.send();

        // Loads in image at correct size to header
        this.headerImgControl();

        // Loads rest of header image
        $('.slide-img').each(function( iter, elem ) {

            // Gets large img
            var xhr = new XMLHttpRequest();
            xhr.open( 'GET', $(this).attr('data-src-large') );
            xhr.send();

            // Gets medium img
            xhr = new XMLHttpRequest();
            xhr.open( 'GET', $(this).attr('data-src-medium') );
            xhr.send();

            // Gets small img
            xhr = new XMLHttpRequest();
            xhr.open( 'GET', $(this).attr('data-src-small') )
            xhr.send();

        });

        // Loads other images
        $(window).trigger('scroll');

        // Binds ui actions
        this.bindUIActions();

    },

    // Bind ui actions
    bindUIActions: function() {

        // Checks if header image needs changing
        $(window).on('resize', function() {
            this.headerImgControl();
            this.lazyLoad();
        }.bind(this));

        // Lazy load
        $(window).on('scroll', function() {
            this.lazyLoad();
        }.bind(this));
    },


    isInView : function(obj){
        var docViewTop = $(window).scrollTop();
        var docViewBottom = docViewTop + $(window).height();

        var elemTop = obj.offset().top;
        var elemBottom = elemTop + obj.height();

        return ((elemBottom <= docViewBottom) && (elemTop >= docViewTop));
    },

    // Lazy load
    lazyLoad : function(){
        $('[data-image-src]').each(function( iter, elem ) {
            var elem = $(this),
                imgSrc = elem.attr('data-image-src'),
                Src = elem.attr('data-src');

            // If element is in view load image
            if ( ImageController.isInView(elem) && !elem.hasClass('loading') ) {


                elem.addClass('imgloaded');

                // Puts loading gif in
                if ( ImageController.settings.loaderReady ) {
                    if ( ImageController.settings.backImages ) {
                        elem.css( 'background-image', 'url('+template_uri+'/style/assets/icons/loading.svg)' ).addClass('loading');
                    } else {
                        elem.attr( 'src', template_uri+'/style/assets/icons/loading.svg' ).addClass('loading');
                    }
                }

                // Loads new image
                var xhr = new XMLHttpRequest();
                xhr.onload = function() {
                    if ( ImageController.settings.backImages ) {
                        elem.css( 'background-image', 'url('+imgSrc+')' );
                    } else {
                        elem.attr( 'src', Src );
                    } elem.removeAttr( 'data-image-src' ).removeClass('loading');
                }.bind(this);

                xhr.open( 'GET', imgSrc );
                xhr.send();

            }
        });
    },

    // Header img control
    headerImgControl: function() {
        var s = this.settings,
            bpLarge = s.size_medium + ( s.size_large - s.size_medium ) / 2,
            bpMedium = s.size_small + ( s.size_medium - s.size_small ) / 2;
        // Loads in image at correct size to header
        $('.slide-img').each(function( iter, elem ) {
            if ( $(window).innerWidth() > bpLarge ) {
                $(this).css('background-image', 'url('+$(this).attr('data-src-large')+')');
            } else if ( $(window).innerWidth() > bpMedium ) {
                $(this).css('background-image', 'url('+$(this).attr('data-src-medium')+')');
            } else {
                $(this).css('background-image', 'url('+$(this).attr('data-src-small')+')');
            }
        });
    },

}
