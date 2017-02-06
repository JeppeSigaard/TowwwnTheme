<?php

$temp_paths = array(
    'sub-page'  => is_page() && !is_front_page(),
    'app'   => is_front_page() || is_search() || is_home() || is_singular() || is_archive() || is_tax(),
    '404'   => is_404(),
);

$f = true;
$GLOBALS['template'] = null;
foreach($temp_paths as $t => $b){
    if($b && $f){
        $GLOBALS['template'] = $t;
        $f = false; // hent kun første godkendte template
    }
}

get_header();
get_template_part('templates/' . $GLOBALS['template']);
get_footer();
