
<?php

// Commercial Post type
add_action( 'init', 'smamo_add_post_type_commercial' );
function smamo_add_post_type_commercial() {
	register_post_type( 'commercial', array(

        'menu_icon' 		 => 'dashicons-format-image',
		'public'             => true,
		'publicly_queryable' => true,
		'show_ui'            => true,
		'show_in_menu'       => true,
		'query_var'          => true,
		'rewrite'            => array( 'slug' => 'commercial' ),
		'capability_type'    => 'post',
		'has_archive'        => true,
		'hierarchical'       => false,
		'menu_position'      => 22,
        'show_in_rest'       => true,
		'supports'           => array( 'title', 'thumbnail'),
        'labels'             => array(
            'name'               => _x( 'Reklamer', 'post type general name', 'smamo' ),
            'singular_name'      => _x( 'Reklame', 'post type singular name', 'smamo' ),
            'menu_name'          => _x( 'Reklamer', 'admin menu', 'smamo' ),
            'name_admin_bar'     => _x( 'Reklamer', 'add new on admin bar', 'smamo' ),
            'add_new'            => _x( 'Tilføj ny ', 'sted', 'smamo' ),
            'add_new_item'       => __( 'Tilføj ny', 'smamo' ),
            'new_item'           => __( 'Ny reklame', 'smamo' ),
            'edit_item'          => __( 'Rediger', 'smamo' ),
            'view_item'          => __( 'Se reklme', 'smamo' ),
            'all_items'          => __( 'Se alle', 'smamo' ),
            'search_items'       => __( 'Find reklame', 'smamo' ),
            'parent_item_colon'  => __( 'Forældre:', 'smamo' ),
            'not_found'          => __( 'Start med at oprette en ny reklme.', 'smamo' ),
            'not_found_in_trash' => __( 'Papirkurven er tom.', 'smamo' ),
            ),
	   )
    );
}
