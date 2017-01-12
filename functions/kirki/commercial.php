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

// Adds commercial header bar reapeater
Kirki::add_field( 'smamo_kirki_config', array(
	'type'        => 'repeater',
	'label'       => __('Header reklamer'),
	'section'     => 'commercial_section',
	'priority'    => 10,
	'settings'    => 'header_commercials',
    'row_label' => array(
		'type' => 'text',
		'value' => __('Reklame'),
	),
	'fields' => array(
		'commercial_img' => array(
			'type'        => 'image',
			'label'       => __( 'Reklame billede' ),
			'description' => '',
		),
		'commercial_link' => array(
			'type'        => 'text',
			'label'       => __( 'Reklame link' ),
			'default'     => '',
		),
	)
) );
