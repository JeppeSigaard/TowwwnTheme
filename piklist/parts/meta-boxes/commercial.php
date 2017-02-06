<?php

/*
Title: Reklameskilte
Post Type: commercial
*/


// Large commercial
piklist('field', array(
    'type' => 'file'
    ,'field' => 'commercial_tn_large'
    ,'label' => 'Tilføj 17:3 reklame'
    ,'description' => ''
    ,'post_type' => 'commercial'
    ,'options' => array(
        'modal_title' => 'Tilføj billede'
        ,'button' => 'Tilføj'
        ,'multiple' => false
        ,'save' => 'url'
    )
));

// Medium commercial
piklist('field', array(
    'type' => 'file'
    ,'field' => 'commercial_tn_medium'
    ,'label' => 'Tilføj 4:1 reklame'
    ,'description' => ''
    ,'post_type' => 'commercial'
    ,'options' => array(
        'modal_title' => 'Tilføj billede'
        ,'button' => 'Tilføj'
        ,'multiple' => false
        ,'save' => 'url'
    )
));

// Small commercial
piklist('field', array(
    'type' => 'file'
    ,'field' => 'commercial_tn_small'
    ,'label' => 'Tilføj 4:3 reklame'
    ,'description' => ''
    ,'post_type' => 'commercial'
    ,'options' => array(
        'modal_title' => 'Tilføj billede'
        ,'button' => 'Tilføj'
        ,'multiple' => false
        ,'save' => 'url'
    )
));
