<?php

// Adds section to control settings
// like rest api url, etc.
Kirki::add_section( 'api_settings', array(
    'title'          => __( 'API indstillinger' ),
    'description'    => __( 'Rediger API indstillinger' ),
    'panel'          => '',
    'priority'       => 160,
    'capability'     => 'edit_theme_options',
    'theme_supports' => '',
));

// Adds rest api field
Kirki::add_field( 'smamo_kirki_config', array(
	'type'        => 'text',
	'settings'    => 'rest_api_url',
	'label'       => __( 'Rest API URL' ),
	'section'     => 'api_settings',
	'default'     => '',
	'priority'    => 10,
));

// Adds internal rest api field
Kirki::add_field( 'smamo_kirki_config', array(
	'type'        => 'text',
	'settings'    => 'internal_rest_api_url',
	'label'       => __( 'Internt rest API URL (Dev. feature)' ),
	'section'     => 'api_settings',
	'default'     => '',
	'priority'    => 10,
));
