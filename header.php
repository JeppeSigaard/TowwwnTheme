<!DOCTYPE html>
<html>
    <head>
        <meta name="viewport" content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
        <meta http-equiv="Content-Type" content="text/html;charset=UTF-8">
        <title><?php bloginfo("name"); ?></title>
        <?php wp_head(); ?>
    </head>
    <body>
       <div class="main-container">
           <div class="header-placeholder"></div>
           <div class="header-container">
                <div id="header">
                    <div class="header-commercials">
                        <div class="swiper-wrapper">
                            <?php $commercials = get_posts(array( 'post_type' => 'commercial', 'numberposts' => -1 ));
                            for ( $i = 0; $i < sizeof( $commercials ); $i++ ) : ?>
                                <div class="swiper-slide">
                                    <div class="overlay"></div>
                                    <img data-src-small="<?php echo get_post_meta($commercials[$i]->ID, 'commercial_tn_small', true); ?>" 
                                         data-src-medium="<?php echo get_post_meta($commercials[$i]->ID, 'commercial_tn_medium', true); ?>"
                                         data-src-large="<?php echo get_post_meta($commercials[$i]->ID, 'commercial_tn_large', true); ?>"
                                         class="slide-img">
                                </div>
                            <?php endfor; ?>
                        </div>
                    </div>
                    <div id="searchcontainer">
                        <label id="searchlabel" for="searchfield">Søg:</label>
                        <img id="searchicon" src="<?php echo get_template_directory_uri() . '/style/assets/icons/search.svg'; ?>">
                        <input id="searchfield" name="searchfield">
                    </div>
                </div>
                <div class="headerbar-placeholder"></div>
                <div id="headerbar">
                    <div class="logo-bg-container">
                        <div class="logo-bg"></div>
                    </div>
                    <div class="logo-container">
                        <img src="<?php echo get_theme_mod('logo'); ?>" class="logo">
                        <div class="city"><?php echo get_theme_mod('city'); ?></div>
                    </div>
                    <div class="menu-show-btns">
                        <img src="<?php echo get_template_directory_uri() . '/style/assets/icons/search-circle.svg' ?>" class="menu-show-img">
                        <img src="<?php echo get_template_directory_uri() . '/style/assets/icons/arrow.svg' 
                        ?>" class="menu-hide-img" >
                    </div>

                    <a href="<?php echo get_theme_mod('facebook_url'); ?>"><div class="beta-warning active">
                        <div class="info">Info<img class="info-arrow-img" src="<?php echo get_template_directory_uri() . "/style/assets/icons/arrow-info.svg"; ?>"></div>
                        <div class="version"><?php echo get_theme_mod('version'); ?></div> 
                        </div></a>
                    <div class="back-button">
                    <img src="<?php echo get_template_directory_uri() . "/style/assets/icons/arrow-close.svg"; ?>" class="back-img" />
                    </div>

                    <div class="socialmedia active"></div>
                </div>
            </div>
