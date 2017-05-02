<?php

if (!function_exists('smamo_inner_img')){
    function smamo_inner_img($post_id = false) {
        global $post, $posts;
        if ($post_id){$post = get_post($post_id);}
        $first_img = '';

        $output = preg_match_all('/<img.+src=[\'"]([^\'"]+)[\'"].*>/i', $post->post_content, $matches);
        if (isset($matches[1]) && isset($matches[1][0])){
            $first_img = $matches[1][0];
        }

        if(empty($first_img)) {$first_img = false;}

        return $first_img;
    }
}

add_action('wp_head','towwwn_og_meta');
function towwwn_og_meta(){

    global $post;
    if($post){
        // Billede
        $meta_img = false;
        $image_url = wp_get_attachment_image_src( get_post_thumbnail_id($post->ID), 'large' );

        if ($image_url && isset($image_url[0])){
            $meta_img = $image_url[0];
        }

        if (!$meta_img){
            $meta_img = get_post_meta($post->ID, 'imgurl', true);
        }

        if (!$meta_img){
            $meta_img = get_post_meta($post->ID, 'picture', true);
        }

        if (!$meta_img){
            $meta_img = get_post_meta($post->ID, 'parentpicture', true);
        }

        if (!$meta_img){
            $meta_img = smamo_inner_img($post->ID);
        }

        if (!$meta_img || is_home() || is_front_page()){
            $meta_img = get_header_image();
        }

        // Beskrivelse
        $meta_description =  wp_trim_words(wp_strip_all_tags($post->post_excerpt), $num_words = 30, $more = ' ...');
        if (!$meta_description){
            $meta_description =  wp_trim_words(wp_strip_all_tags($post->post_content), $num_words = 30, $more = ' ...');
        }

        if (!$meta_description){
            $meta_description = wp_trim_words(wp_strip_all_tags(get_post_meta($post->ID, 'description', true)), $num_words = 30, $more = ' ...');
        }

        if (!$meta_description){
            $meta_description = wp_trim_words(wp_strip_all_tags(get_post_meta($post->ID, 'about', true)), $num_words = 30, $more = ' ...');
        }

        if (!$meta_description){
            if(is_archive() || is_category()){
                $meta_description = wp_trim_words(wp_strip_all_tags(category_description()), $num_words = 30, $more = ' ...');
            }
        }

        if(!$meta_description || is_home() || is_front_page()){
            $meta_description = wp_trim_words(get_bloginfo('description'), $num_words = 30, $more = ' ...');
        }

        // Link
        $meta_url = get_the_permalink();
        if (!$meta_url || is_home() || is_front_page()){
            $meta_url = get_bloginfo('url');
        }

        // Type
        $meta_type = 'article';
        $meta_start_date = null;


        if ('event' == get_post_type($post->ID)){
            $meta_type = 'article';
        }

        if ('location' == get_post_type($post->ID)){
            $meta_type = 'article';
        }

        if(is_archive()){
            $meta_type = 'archive';
        }
        elseif(is_home() || is_front_page()){
            $meta_type = 'website';
        }

        echo '<meta itemprop="name" content="'. $post->post_title .'">';
        echo '<meta property="og:title" content="'. $post->post_title .'">';
        echo '<meta property="og:site_name" content="'. get_bloginfo('title') .'">';

        if ($meta_description) :

            echo '<meta name="description" content="'.  $meta_description .'">';
            echo '<meta itemprop="description" content="'.  $meta_description .'">';
            echo '<meta property="og:description" content="'.  $meta_description  .'">';

        endif;

        if ($meta_img) :

            echo '<meta itemprop="image" content="'. $meta_img .'">';
            echo '<meta property="og:image" content="'. $meta_img .'">';

        endif;

        echo '<meta property="og:type" content="'. $meta_type .'">';
        echo '<meta property="og:url" content="'. $meta_url .'">';

        if(get_theme_mod('facebook_app_id')){
            echo '<meta property="fb:app_id" content="'. get_theme_mod('facebook_app_id') .'">';
        }
    }
}
