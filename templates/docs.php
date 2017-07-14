<!DOCTYPE html>
<html <?php language_attributes(); ?>>
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
    <title><?php wp_title(' · ', true, 'right') ?></title>
    <?php wp_head(); ?>
</head>
<body <?php body_class(); ?>>
    <div class="container">
        <?php get_template_part('svg'); ?>
        <?php while (have_posts()) : the_post(); ?>
        <header class="docs-header">
            <div class="header-logo">
                <a href="<?php bloginfo('url') ?>/docs/">
                    <svg viewBox="0 0 32 32"><use xlink:href="#towwwn-logo-17"></use></svg>
                    <span>Docs.</span>
                </a>
            </div>
            <nav class="header-bar-nav">
                <a class="header-bar-nav-icon" href="<?php bloginfo('url') ?>">
                    <svg viewBox="0 0 32 32"><use xlink:href="#towwwn-logo-17"></use></svg>
                </a>
                <a class="header-bar-nav-icon" href="<?php echo get_theme_mod('facebook_url'); ?>">
                    <svg viewBox="0 0 32 32"><use xlink:href="#icon-facebook"></use></svg>
                </a>
            </nav>
        </header>
        <div class="docs-content">
            <main>
                <div class="inner">
                    <article>
                        <?php
                        $patch_version_name = '';
                        if ('patch' === get_post_type(get_the_ID())){
                            $patch_version = get_post_meta($id,'patch_version', true);

                            $major = (isset($patch_version['major'])) ? $patch_version['major'] : '0';
                            $minor = (isset($patch_version['minor'])) ? $patch_version['minor'] : '0';
                            $patch = (isset($patch_version['patch'])) ? $patch_version['patch'] : '0';

                            $patch_version_name = $major.'.'.$minor.'.'.$patch. ' : ';

                        }
                        ?>
                        <header class="article-header"><h1><?php echo $patch_version_name; the_title(); ?></h1></header>
                        <div class="article-content"><?php the_content(); ?></div>
                        <footer class="article-footer"></footer>
                    </article>
                </div>
            </main>
            <aside>
               <div class="inner">
                    <?php wp_nav_menu(array('theme_location' => 'sub-page-menu','container' => 'div', 'container_class' => 'menu', 'menu_class' => 'side-menu-ul',
                                'fallback_cb' => null)); ?>
               </div>
               <div class="inner flat">
                   <p><strong>Towwwn by SmartMonkey</strong><br>
                   Vestergade 24, 1.<br>5700 Svendborg</p>
                   <p><a href="mailto:hej@smartmonkey.dk">hej@smartmonkey.dk</a><br>
                   <a href="tel:+45 40 40 91 97">+45 40 40 91 97</a></p>
               </div>
            </aside>
        </div>
        <?php endwhile; ?>
        <footer class="docs-footer"></footer>
        <?php wp_footer(); ?>
    </div>
</body>
</html>
