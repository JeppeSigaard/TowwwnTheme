<!DOCTYPE html>
<html>
    <head>
        <meta name="viewport" content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
        <meta http-equiv="Content-Type" content="text/html;charset=UTF-8">
        <title><?php wp_title(' · ', true, 'right') ?></title>
        <?php wp_head(); ?>
        <style> body.loading{height: 100vh; overflow: hidden;}body.loading::after{ content: ''; display: block; position: fixed; top: 0; left: 0; right: 0; bottom: 0; background-color: #f0f0f0; z-index: 1000; background-image: url(<?php echo get_template_directory_uri(); ?>/style/assets/icons/loading.svg); background-position: center; background-size: 62px; background-repeat: no-repeat; } </style>
    </head>
    <body <?php body_class('loading') ?>>
        <?php get_template_part('svg'); ?>
        <div class="main-container">

            <header id="site-header" class="site-header">
                <div class="header-container">
                    <div id="headerbar">
                        <a class="logo" href="<?php bloginfo('url'); ?>">
                            <svg viewBox="0 0 32 32">
                                <use xlink:href="#towwwn-logo">
                                </use>
                            </svg>
                        </a>
                        <a href="<?php echo get_bloginfo('url'); ?>" class="logo-container">
                            <div class="city"><?php echo get_theme_mod('city'); ?></div>
                        </a>

                        <div id="top-nav-icons">
                            <div class="nav-search nav-elem">
                                <svg viewBox="0 0 32 32">
                                    <use xlink:href="#icon-search"></use>
                                </svg>
                            </div>
                            <div class="nav-events nav-elem">
                                <svg viewBox="0 0 32 32">
                                    <use xlink:href="#icon-event"></use>
                                </svg>
                            </div>
                            <div class="nav-locations nav-elem">
                                <svg viewBox="0 0 32 32">
                                    <use xlink:href="#icon-location"></use>
                                </svg>
                            </div>
                            <a class="nav-info nav-elem" href="<?php bloginfo('url'); ?>/docs/">
                                <svg viewBox="0 0 32 32">
                                    <use xlink:href="#icon-info">
                                    </use>
                                </svg>
                            </a>
                        </div>
                    </div>
                </div>
            </header>
