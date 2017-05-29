<?php

add_action('wp_head',function(){
    $template = (is_page() && !is_front_page()) ? 'sub-page' : 'app';

    echo '<script> 
    var rest_api = "' . get_theme_mod('rest_api_url') . '"; 
    var main_path = "' . site_url() . '";
    var city = "' . get_theme_mod('city') . '";
    var template_uri = "' . get_template_directory_uri() . '";
    var commercial_image_url = "'. get_theme_mod('commercial') .'";
    var commercial_link = "'. get_theme_mod('commercial_link') .'";
    var template = "' . $template .  '";
    </script>';
});

// Enqueues scripts and stylesheets
add_action( 'wp_enqueue_scripts', function() {
     
    /* -----------------------------------------------------*/
    // Base stuff
    
    // Scripts
    //wp_enqueue_script( 'jQuery', 'https://ajax.googleapis.com/ajax/libs/jquery/3.1.1/jquery.min.js' );
    wp_enqueue_script( 'swiper', 'https://cdnjs.cloudflare.com/ajax/libs/Swiper/3.4.1/js/swiper.jquery.min.js' );
    //wp_enqueue_script( 'flickityScript', 'https://unpkg.com/flickity@2/dist/flickity.pkgd.min.js' );
    
    wp_enqueue_script( 'main-script', get_template_directory_uri() . '/app/bundle.js', array(), null, true );
    wp_localize_script( 'main-script', 'ajax_obj',
            array( 'ajax_url' => admin_url( 'admin-ajax.php' ) ) );
    
    // Styles
    wp_enqueue_style( 'swiper-style', 'https://cdnjs.cloudflare.com/ajax/libs/Swiper/3.4.1/css/swiper.min.css' );
    wp_enqueue_style( 'montserrat', 'https://fonts.googleapis.com/css?family=Montserrat' );
    wp_enqueue_style( 'lato', 'https://fonts.googleapis.com/css?family=Lato' );
    wp_enqueue_style( 'flickityStyle', 'https://unpkg.com/flickity@2/dist/flickity.min.css' );
    // wp_enqueue_style( 'mainStyle', get_template_directory_uri() . '/style/index.css');
    
});

add_filter('template_redirect', function() {
    global $wp_query;

    if(!isset($_GET['404'])){
        status_header( 200 );
        $wp_query->is_404=false;
    }
});
