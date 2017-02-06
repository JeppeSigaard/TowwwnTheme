<?php

register_nav_menus(array(
    'header-menu' => 'Menu under søgefeltet',
    'sub-page-menu' => 'Menu på undersider',
    'footer-menu' => 'Menu i footeren',
));

function prefix_nav_description( $item_output, $item, $depth, $args ) {
    if ( !empty( $item->description ) ) {
        $item_output = str_replace( $args->link_after . '</a>', '<span class="menu-item-description">' . $item->description . '</span>' . $args->link_after . '</a>', $item_output );
    }

    return $item_output;
}
add_filter( 'walker_nav_menu_start_el', 'prefix_nav_description', 10, 4 );
