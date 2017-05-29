<!DOCTYPE html>
<html>
    <head>
        <meta name="viewport" content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
        <meta http-equiv="Content-Type" content="text/html;charset=UTF-8">
        <title><?php wp_title(' · ', true, 'right') ?></title>
        <?php wp_head(); ?>
        <style> body.loading{height: 100vh; overflow: hidden;}body.loading::after{ content: ''; display: block; position: fixed; top: 0; left: 0; right: 0; bottom: 0; background-color: #f0f0f0; z-index: 1000; background-image: url(<?php echo get_template_directory_uri(); ?>/style/assets/icons/loading.svg); background-position: center; background-size: 62px; background-repeat: no-repeat; } </style>
    </head>
    <body <?php body_class('loading') ?>>
        <?php get_template_part('svg'); ?>
        <div class="main-container">
