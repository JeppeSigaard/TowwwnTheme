<!DOCTYPE html>
<html>
    <head>
        <meta name="viewport" content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
        <meta http-equiv="Content-Type" content="text/html;charset=UTF-8">
        <title><?php bloginfo("name"); ?></title>
        <?php wp_head(); ?>
    </head>
    <body>
        <?php get_template_part('svg'); ?>
        <div class="main-container">
            <div class="header-placeholder"></div>
            <div class="header-container">
                <div id="header">
                    <div class="header-commercials">
                        <div class="swiper-wrapper">
                            <?php $commercials = get_posts(array( 'post_type' => 'commercial', 'numberposts' => -1 ));
                            foreach($commercials as $com) : ?>
                                <div class="swiper-slide">
                                    <div class="overlay"></div>
                                    <img data-src-small="<?php echo get_post_meta($com->ID, 'commercial_tn_small', true); ?>"
                                         data-src-medium="<?php echo get_post_meta($com->ID, 'commercial_tn_medium', true); ?>"
                                         data-src-large="<?php echo get_post_meta($com->ID, 'commercial_tn_large', true); ?>"
                                         class="slide-img">
                                </div>
                            <?php endforeach; ?>
                        </div>
                    </div>
                    <div id="searchcontainer">
                        <label id="searchlabel" for="searchfield">Søg</label>
                        <svg id="searchicon" viewBox="0 0 32 32"><use xlink:href="#icon-search"></use></svg>
                        <input id="searchfield" name="searchfield">
                    </div>
                </div>
                <div class="headerbar-placeholder"></div>
                <div id="headerbar">
                    <div class="logo-bg-container">
                        <div class="logo-bg"></div>
                    </div>
                    <div class="logo-container">
                        <svg class="logo" viewBox="0 0 200 70"><use xlink:href="#towwwn-logo"></use></svg>
                        <div class="city"><?php echo get_theme_mod('city'); ?></div>
                    </div>
                    <div class="menu-show-btns">
                        <svg class="menu-show-img" viewBox="0 0 32 32"><use xlink:href="#icon-search-circle" ></use></svg>
                        <svg class="menu-hide-img" viewBox="0 0 32 32"><use xlink:href="#icon-show-menu" ></use></svg>
                    </div>

                    <a href="<?php echo get_theme_mod('facebook_url'); ?>"><div class="beta-warning active">
                        <div class="info">Info
                            <svg class="info-arrow-img" viewBox="0 0 32 32"><use xlink:href="#icon-info-arrow"></use></svg>
                        </div>
                        <div class="version"><?php echo get_theme_mod('version'); ?></div> 
                        </div></a>
                    <div class="back-button">
                    <svg viewBox="0 0 32 32" class="back-img"><use xlink:href="#icon-left-arrow"></use></svg>
                    </div>

                    <div class="socialmedia active"></div>
                </div>
            </div>
