<!DOCTYPE html>
<html <?php language_attributes(); ?>>
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
    <title><?php wp_title(' · ', true, 'right') ?></title>
    <?php wp_head(); ?>
</head>
<body <?php body_class(); ?>>
    <?php get_template_part('svg'); ?>
    <?php while (have_posts()) : the_post(); ?>
    <header class="docs-header">
        <div class="header-logo">
            <svg viewBox="0 0 200 70"><use xlink:href="#towwwn-logo"></use></svg>
            <span>Docs.</span>
        </div>
    </header>
    <div class="docs-content">
        <main>
            <div class="inner">
                <article>
                    <header class="article-header"><h1><?php the_title(); ?></h1></header>
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
        </aside>
    </div>
    <?php endwhile; ?>
    <footer class="docs-footer"></footer>
    <?php wp_footer(); ?>
</body>
</html>
