<?php

add_action('wp_head',function(){
    $template = (is_page() && !is_front_page()) ? 'page' : 'app';

    if('app' === $template){

        global $wp_query; $app_id = ''; $app_type = '';

        if($wp_query->post !== NULL){
            $app_id =  (!is_404()) ? $wp_query->post->ID : '0';
            $app_type = (!is_404()) ? get_post_type($app_id) : '404';
        }

        if(isset($wp_query->query['category'])){
            $app_id = get_cat_ID( $wp_query->query['category'] );
            $app_type = 'category';
        }



        wp_enqueue_script('main-script');
        wp_localize_script( 'main-script', 'app_data', array(
            'ajax_url' => admin_url( 'admin-ajax.php' ),
            'rest_api' => get_theme_mod('rest_api_url'),
            'main_path' => site_url(),
            'template_uri' => get_template_directory_uri(),
            'commercial_image_url' => get_theme_mod('commercial'),
            'commercial_link' => get_theme_mod('commercial_link'),
            'type' => $app_type,
            'id' => $app_id,
        ));
    }
    else{
        wp_enqueue_script('docs-script');
        wp_enqueue_style('page-style');
    }
});

// Enqueues scripts and stylesheets
add_action( 'wp_enqueue_scripts', function() {
     
    /* -----------------------------------------------------*/
    // Base stuff
    
    // Scripts
    // wp_enqueue_script( 'jQuery', 'https://ajax.googleapis.com/ajax/libs/jquery/3.1.1/jquery.min.js' );
    wp_register_script( 'docs-script', get_template_directory_uri() . '/docs/assets/js/main-min.js' );
    wp_enqueue_script( 'swiper', 'https://cdnjs.cloudflare.com/ajax/libs/Swiper/3.4.1/js/swiper.jquery.min.js' );
    // wp_enqueue_script( 'flickityScript', 'https://unpkg.com/flickity@2/dist/flickity.pkgd.min.js' );
    
    wp_register_script( 'main-script', get_template_directory_uri() . '/app/bundle.js', array(), null, true );
    
    // Styles
    wp_enqueue_style( 'swiper-style', 'https://cdnjs.cloudflare.com/ajax/libs/Swiper/3.4.1/css/swiper.min.css' );
    wp_enqueue_style( 'montserrat', 'https://fonts.googleapis.com/css?family=Montserrat' );
    wp_enqueue_style( 'lato', 'https://fonts.googleapis.com/css?family=Lato' );
    wp_register_style( 'page-style', get_template_directory_uri() . '/docs/assets/style/main.css' );
    // wp_enqueue_style( 'flickityStyle', 'https://unpkg.com/flickity@2/dist/flickity.min.css' );
    // wp_enqueue_style( 'mainStyle', get_template_directory_uri() . '/style/index.css');
    
});
