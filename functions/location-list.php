<?php

add_shortcode('location_list', function(){
    $locations = get_posts(array(
        'post_type' => 'location',
        'posts_per_page' => -1,
        'orderby' => 'post_name',
        'order' => 'ASC',
    ));

    $alpha = ['a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z','æ','ø','å','0','1','2','3','4','5','6','7','8','9'];
    $i = 0;


    ob_start(); ?>
    <div class="location-list"><ul>
        <li class="letter-list"><span class="letter">a</span>
            <ul>
            <?php

            foreach($locations as $loc) :
            $first_letter = strtolower(substr($loc->post_title,0,1));
            if ($alpha[$i] !== $first_letter) : while ($alpha[$i] !== $first_letter) : $i++; if ( $i > 50){exit;}

            endwhile; ?>
            </ul></li><li class="letter-list"><span class="letter"><?php echo $alpha[$i]; ?></span><ul>
            <?php endif; ?>
            <li><?php echo $loc->post_title ?></li>
            <?php endforeach; ?>
            </ul>
        </li>
        </ul></div>
    <?php return ob_get_clean();
});
