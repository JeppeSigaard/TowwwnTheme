<?php

add_shortcode('location_list', function(){
    $locations = get_posts(array(
        'post_type' => 'location',
        'posts_per_page' => -1,
        'orderby' => 'post_title',
        'order' => 'ASC',
    ));

    $alpha = array(
        'A','B','C','D','E','F','G','H','I','J',
        'K','L','M','N','O','P','Q','R','S','T',
        'U','V','W','X','Y','Z','Æ','Ø','Å',
        '0','1','2','3','4','5','6','7','8','9'
    );
    $i = 0;


    ob_start(); ?>
    <div class="location-list"><ul>
        <?php foreach($alpha as $letter) :
        $c = 0;
        foreach($locations as $l) {
            if (strpos($l->post_title, $letter) === 0) {
                $c++;
            }
        }
        if ($c > 0 ) : ?>
        <li class="letter-list"><span class="letter"> <?php echo $letter ?></span>
            <ul>
                <?php foreach($locations as $l) : if (strpos($l->post_title,$letter) === 0) : ?>
                <li><?php echo $l->post_title ?></li>
                <?php endif; endforeach; ?>
            </ul>
        </li>
        <?php endif; endforeach; ?>
    </ul></div>
    <?php return ob_get_clean();
});


add_shortcode('location_num', function(){
    $loc = wp_count_posts('location');
    return '<span class="location-num">'. $loc->publish .'</span>';
});

add_shortcode('event_num', function(){
    $events = wp_count_posts('event');
    return '<span class="event-num">'. $events->publish .'</span>';
});

add_shortcode('event_num_future', function(){

    $posts = get_posts( array(
        'post_type' => 'event',
		'posts_per_page' => -1,
        'meta_query' => array(
            array(
                'key' => 'start_time',
                'value' => date('Y-m-d\TH:i:s'),
                'compare' => '>',
                'type' => 'DATETIME',
            ),
        ),
	) );

    $i = 0;
    foreach($posts as $p){$i++;}
    return '<span class="event-num-future">'. $i .'</span>';
});
