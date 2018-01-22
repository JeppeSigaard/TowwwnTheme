<?php

// Frontpage text section.. section
Kirki::add_section( 'frontpage_text_section', array(

    'title'          => __( 'Forside tekster' ),
    'description'    => __( 'Rediger forside tekster' ),
    'panel'          => '',
    'priority'       => 160,
    'capability'     => 'edit_theme_options',
    'theme_supports' => '',

));

// Frontpage text section fields
Kirki::add_field( 'smamo_kirki_config', array(

  'type'        => 'repeater',
	'label'       => esc_attr__( 'Tekster', 'textdomain' ),
	'section'     => 'frontpage_text_section',
	'priority'    => 10,
	'settings'    => 'text_sections',

	'row_label' => array(

		'type'  => 'text',
		'value' => esc_attr__('Tekst', 'textdomain' ),
    'field' => 'title',

	),

	'fields' => array(

    'title' => array(

      'type'        => 'text',
			'label'       => esc_attr__( 'Titel', 'textdomain' ),
			'description' => esc_attr__( 'Dette er titlen til teksten, vist i Railbaren', 'textdomain' ),
			'default'     => '',

		),

		'text' => array(

      'type'        => 'textarea',
			'label'       => esc_attr__( 'Tekst', 'textdomain' ),
			'description' => esc_attr__( 'Dette er selve teksten', 'textdomain' ),
			'default'     => '!',

		),

	)

));
