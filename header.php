<!DOCTYPE html>
<html>
    <head>
        <meta name="viewport" content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
        <meta http-equiv="Content-Type" content="text/html;charset=UTF-8">
        <title><?php bloginfo("name"); ?></title>
        <?php wp_head(); ?>
        <style> body.loading{height: 100vh; overflow: hidden;}body.loading::after{ content: ''; display: block; position: fixed; top: 0; left: 0; right: 0; bottom: 0; background-color: #f0f0f0; z-index: 1000; background-image: url(<?php echo get_template_directory_uri(); ?>/style/assets/icons/loading.svg); background-position: center; background-size: 62px; background-repeat: no-repeat; } </style>
    </head>
    <body <?php body_class('loading') ?>>
        <?php get_template_part('svg'); ?>
        <div class="main-container">

            <header id="site-header" class="site-header">
                <div class="header-container">
                    <div id="header">
                        <div class="header-commercials">
                            <div class="header-commercial-bullets"></div>
                            <div class="swiper-wrapper">
                                <?php $commercials = get_posts(array( 'post_type' => 'commercial', 'numberposts' => -1 ));
                                foreach($commercials as $com) : ?>
                                   <?php $link = (get_post_meta($com->ID,'link', true)) ? esc_url(get_post_meta($com->ID,'link', true)): '#'; ?>
                                    <a target="_blank" class="swiper-slide" href="<?php echo $link ?>">
                                        <div data-src-small="<?php echo get_post_meta($com->ID, 'commercial_tn_small', true); ?>"
                                             data-src-medium="<?php echo get_post_meta($com->ID, 'commercial_tn_medium', true); ?>"
                                             data-src-large="<?php echo get_post_meta($com->ID, 'commercial_tn_large', true); ?>"
                                             class="slide-img"></div>
                                    </a>
                                <?php endforeach; ?>
                            </div>
                        </div>

                        <!--<form id="searchcontainer" action="/" method="post">
                            <label id="searchlabel" for="searchfield">Søg</label>
                            <svg id="searchicon" viewBox="0 0 32 32"><use xlink:href="#icon-search"></use></svg>
                            <input id="searchfield" name="searchfield" type="text">
                            <?php //wp_nav_menu(array('theme_location' => 'header-menu', 'container' => false, 'fallback_cb' => null)) ?>
                        </form>-->
                    </div>
                    <div id="headerbar">
                        <div class="logo-bg-container">
                            <div class="logo-bg"></div>
                        </div>
                        <a href="<?php echo get_bloginfo('url'); ?>" class="logo-container">
                            <svg class="logo" viewBox="0 0 200 70"><use xlink:href="#towwwn-logo"></use></svg>
                            <div class="city"><?php echo get_theme_mod('city'); ?></div>
                        </a>
                        <div id="menu-show-btns" id="menu-show-btns">
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
            </header>
