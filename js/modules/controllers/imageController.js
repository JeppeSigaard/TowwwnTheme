
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
        
        xhr.open( 'GET', template_uri+'/style/assets/icons/loading.gif' );
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
        }.bind(this));
        
        // Lazy load
        $(window).on('scroll', function() {
            $('[data-image-src]').each(function( iter, elem ) {
                var top = $(this).offset().top - $(this).outerHeight(),
                    bottom = $(this).offset().top;
                
                // If element is in view load image
                if ( top > $(window).scrollTop() && 
                     bottom < $(window).scrollTop() + $(window).innerHeight() &&
                     typeof $(this).attr('data-image-src') !== 'undefined' &&
                     !$(this).hasClass('imgloaded') ) {
                    
                    $(this).addClass('imgloaded');
                    
                    // Puts loading gif in
                    if ( ImageController.settings.loaderReady ) {
                        if ( ImageController.settings.backImages ) {
                            $(this).css( 'background-image', 'url('+template_uri+'/style/assets/icons/loading.gif)' ).addClass('loading'); 
                        } else {
                            $(this).attr( 'src', template_uri+'/style/assets/icons/loading.gif' ).addClass('loading'); 
                        }
                    }
                        
                    // Loads new image
                    var xhr = new XMLHttpRequest();
                    xhr.onload = function() {
                        if ( ImageController.settings.backImages ) {
                            $(this).css( 'background-image', 'url('+$(this).attr('data-image-src')+')' );
                        } else {
                            $(this).attr( 'src', $(this).attr('data-src') );  
                        } $(this).removeAttr( 'data-image-src' ).removeClass('loading');
                    }.bind(this);
                    
                    xhr.open( 'GET', $(this).attr('data-image-src') );
                    xhr.send();
                    
                }
            });
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
                if ( s.state !== 0 ) { 
                    $(this).attr('src', $(this).attr('data-src-large'));
                    s.state = 0;
                }
            } else if ( $(window).innerWidth() > bpMedium ) {
                if ( s.state !== 1 ) {
                    $(this).attr('src', $(this).attr('data-src-medium'));
                    s.state = 1;
                }
            } else {
                if ( s.state !== 2 ) {
                    $(this).attr('src', $(this).attr('data-src-small'));
                    s.state = 2;
                }
            }
        });
    },
    
}