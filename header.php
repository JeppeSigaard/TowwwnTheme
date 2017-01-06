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
                    <div class="beta-warning"> 
                        <div class="info">Info</div>
                        <div class="version"><?php echo get_theme_mod('version'); ?></div> 
                    </div>
                    <div class="socialmedia">
                        <a href="<?php echo get_theme_mod('facebook_url'); ?>" class="fb_link" >
                            <img src="<?php echo get_template_directory_uri() . '/style/assets/icons/facebook.svg' ?>" class="fb_img" />
                        </a>
                    </div>
                </div>
            </div>
