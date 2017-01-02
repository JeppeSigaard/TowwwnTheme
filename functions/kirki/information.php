<?php

// Info section
Kirki::add_section( 'information', array(
    'title'          => __( 'Information' ),
    'description'    => __( 'Rediger informationer' ),
    'panel'          => '',
    'priority'       => 160,
    'capability'     => 'edit_theme_options',
    'theme_supports' => '',
));

// Adds logo field
Kirki::add_field( 'smamo_kirki_config', array(
	'type'        => 'image',
	'settings'    => 'logo',
	'label'       => __( 'Logo' ),
	'section'     => 'information',
	'default'     => '',
	'priority'    => 10,
));

// Adds city field
Kirki::add_field( 'smamo_kirki_config', array(
	'type'        => 'text',
	'settings'    => 'city',
	'label'       => __( 'By' ),
	'section'     => 'information',
	'default'     => '',
	'priority'    => 10,
));

// Adds version field
Kirki::add_field( 'smamo_kirki_config', array(
    'type'        => 'text',
	'settings'    => 'version',
	'label'       => __( 'Version' ),
	'section'     => 'information',
	'default'     => '',
	'priority'    => 10,
));