<!DOCTYPE html>
<html>
    <head>
        <meta name="viewport" content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
        <title><?php bloginfo("name"); ?></title>
        <?php wp_head(); ?>
    </head>
    <body>
       <div class="main-container">
           <div class="header-placeholder"></div>
           <div class="header-container">
                <div id="header">
                    <div class="commercial-container">
                        <div class="swiper-wrapper">
                           <div class="swiper-slide"></div>
                            <?php $commercials = get_theme_mod('header_commercials');
                            for ($i = 0; $i < sizeof($commercials); $i++ ) : ?>
                                <div class="swiper-slide">
                                    <!--<a href="<?php echo $commercials[$i]['commercial_link'] ?>" >-->
                                        <div class="img-container" style="background-image:url(<?php
                                            echo wp_get_attachment_url( $commercials[$i]['commercial_img'] ); ?>);">
                                        </div>
                                    <!--</a>-->
                                </div>
                            <?php endfor; ?>
                        </div>
                        <div class="swiper-pagination"></div>
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

                    <div class="beta-warning active">
                        <div class="info">Info</div>
                        <div class="version"><?php echo get_theme_mod('version'); ?></div> 
                    </div>
                    <div class="back-button">
                    <img src="<?php echo get_template_directory_uri() . "/style/assets/icons/left-pointing-arrow.svg"; ?>" class="back-img" />
                    </div>

                    <div class="socialmedia active"></div>
                </div>
            </div>
