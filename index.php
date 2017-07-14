<?php

if(is_page() && !is_front_page()){
    get_template_part('templates/docs');
}

elseif(is_singular('patch') && !is_front_page()){
    get_template_part('templates/docs');
}

else{
    get_template_part('templates/testing-page');
}
