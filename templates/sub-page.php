<div class="content-container poly-view" id="page-content">
    <section class="container-section left-container">
        <div class="sync-outer">
            <div class="sync-inner">
                <div class="content">
                    <div class="sub-page-menu">
                        <?php wp_nav_menu(array(
                            'theme_location' => 'sub-page-menu',
                            'container' => false,
                            'fallback_cb' => null)
                        ); ?>
                    </div>
                </div>
            </div>
        </div>
    </section>
    <section class="container-section right-container">
        <div class="sync-outer">
            <div class="sync-inner">
                <div class="content">
                    <?php while(have_posts()) : the_post(); ?>
                    <article class="sub-page-article">
                        <header class="sub-page-header">
                            <h1><?php the_title(); ?></h1>
                        </header>
                        <section class="sub-page-content">
                            <?php the_content(); ?>
                        </section>
                        <footer class="sub-page-footer"></footer>
                    </article>
                    <?php endwhile; ?>
                </div>
            </div>
        </div>
    </section>
</div>
