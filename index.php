<?php

get_header();
if(is_page() && !is_front_page()){
    get_template_part('templates/sub-page');
}

else{
    get_template_part('templates/app');
}

get_footer();
