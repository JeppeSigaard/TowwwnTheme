<?php

add_action('wp_head',function(){


    if (is_singular('patch')){$template = 'page';}
    elseif (is_page() && !is_front_page()){$template = 'page';}
    else{$template = 'app';}


    if('app' === $template){

        global $wp_query; $app_id = ''; $app_type = '';

        if($wp_query->post !== NULL){
            $app_id =  (!is_404()) ? $wp_query->post->ID : '0';
            $app_type = (!is_404()) ? get_post_type($app_id) : '404';
        }

        if(isset($wp_query->query['category'])){
            $app_cat = get_term_by('slug', $wp_query->query['category'], 'category' );
            $app_id = ($app_cat) ? $app_cat->term_id : '0';
            $app_type = 'category';
        }

        // Localized data
        wp_enqueue_script('main-script');
        wp_localize_script( 'main-script', 'app_data', array(

            'logo' => get_theme_mod('logo'),
            'coverimage' => get_theme_mod('cover-image'),
            'text_sections' => get_theme_mod('text_sections'),

            'fbid' => get_theme_mod('facebook_id'),
            'instagram' => get_theme_mod('instagram'),

            'rest_api' => get_theme_mod('rest_api_url'),
            'internal_rest_api' => get_theme_mod('internal_rest_api_url'),

            'ajax_url' => admin_url( 'admin-ajax.php' ),
            'main_path' => site_url(),
            'city' => get_theme_mod('city'),
            'template_uri' => get_template_directory_uri(),

            'type' => $app_type,
            'id' => $app_id,
            'app_name' => (isset($wp_query->query['category'])) ?
              $wp_query->query['category'] : 'no',

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
    wp_register_script( 'docs-script', get_template_directory_uri() . '/docs/assets/script/main-min.js' );
    //wp_enqueue_script( 'swiper', 'https://cdnjs.cloudflare.com/ajax/libs/Swiper/3.4.1/js/swiper.jquery.min.js' );
    // wp_enqueue_script( 'flickityScript', 'https://unpkg.com/flickity@2/dist/flickity.pkgd.min.js' );

    wp_register_script( 'main-script', get_template_directory_uri() . '/app/bundle.js', array(), null, true );

    // Styles
    // wp_enqueue_style( 'swiper-style', 'https://cdnjs.cloudflare.com/ajax/libs/Swiper/3.4.1/css/swiper.min.css' );
    // wp_enqueue_style( 'montserrat', 'https://fonts.googleapis.com/css?family=Montserrat' );
    wp_enqueue_style( 'lato', 'https://fonts.googleapis.com/css?family=Lato:300,400,700' );
    wp_register_style( 'page-style', get_template_directory_uri() . '/docs/assets/style/main.css' );
    // wp_enqueue_style( 'flickityStyle', 'https://unpkg.com/flickity@2/dist/flickity.min.css' );
    // wp_enqueue_style( 'mainStyle', get_template_directory_uri() . '/style/index.css');

});
