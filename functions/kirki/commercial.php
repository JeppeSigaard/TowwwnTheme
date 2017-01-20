<?php
// Commercial section
Kirki::add_section( 'commercial_section', array(
    'title'          => __( 'Reklamer' ),
    'description'    => __( 'Indsæt reklamer' ),
    'panel'          => '',
    'priority'       => 160,
    'capability'     => 'edit_theme_options',
    'theme_supports' => '',
));

// Adds commercial single view image field
Kirki::add_field( 'smamo_kirki_config', array(
	'type'        => 'image',
	'settings'    => 'commercial',
	'label'       => __( 'Single view reklame billede' ),
	'section'     => 'commercial_section',
	'default'     => '',
	'priority'    => 10,
));

// Adds commercial single view link field
Kirki::add_field( 'smamo_kirki_config', array(
	'type'        => 'text',
	'settings'    => 'commercial_link',
	'label'       => __( 'Single view reklame link' ),
	'section'     => 'commercial_section',
	'default'     => '',
	'priority'    => 10,
));

/*
// Adds header commercial repeate
Kirki::add_field( 'smamo_kirki_config', array(
	'type'        => 'repeater',
	'label'       => __( 'Tilføj header reklmer' ),
	'section'     => 'commercial_section',
	'settings'    => 'header_commercials',
	'priority'    => 10,
	'row_label' => array(
		'type' => 'text',
		'value' => __( 'Reklame' ),
	),
	'fields' => array(
		'img' => array(
			'type'        => 'image',
			'label'       => __( 'Reklame billede' ),
		),
		'link' => array(
			'type'        => 'text',
			'label'       => __( 'Reklame link' ),
		),
	)
) );*/
