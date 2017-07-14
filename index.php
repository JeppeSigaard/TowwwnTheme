<?php


if (is_singular('patch')){ get_template_part('templates/docs');}
elseif (is_page() && !is_front_page()){get_template_part('templates/docs');}
else{ get_template_part('templates/testing-page');}
