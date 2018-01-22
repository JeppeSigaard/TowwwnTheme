<?php

// Info section
Kirki::add_section( 'socialmedia', array(
    'title'          => __( 'Social medier' ),
    'description'    => __( 'Rediger links og lign. til sociale medier' ),
    'panel'          => '',
    'priority'       => 160,
    'capability'     => 'edit_theme_options',
    'theme_supports' => '',
));

// FB
Kirki::add_field( 'smamo_kirki_config', array(
	'type'        => 'text',
	'settings'    => 'facebook_url',
	'label'       => __( 'Facebook' ),
	'section'     => 'socialmedia',
	'default'     => '',
	'priority'    => 10,
));

// FB
Kirki::add_field( 'smamo_kirki_config', array(
	'type'        => 'text',
	'settings'    => 'facebook_id',
	'label'       => __( 'Facebook ID' ),
	'section'     => 'socialmedia',
	'default'     => '',
	'priority'    => 10,
));

// FB
Kirki::add_field( 'smamo_kirki_config', array(
	'type'        => 'text',
	'settings'    => 'facebook_app_id',
	'label'       => __( 'Facebook App ID' ),
	'section'     => 'socialmedia',
	'default'     => '',
	'priority'    => 10,
));

// FB
Kirki::add_field( 'smamo_kirki_config', array(
	'type'        => 'text',
	'settings'    => 'instagram',
	'label'       => __( 'Instragram' ),
	'section'     => 'socialmedia',
	'default'     => '',
	'priority'    => 10,
));
