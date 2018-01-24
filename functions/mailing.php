<?php

// Adds actions
add_action("wp_ajax_mail", "towwwn_mail");
add_action("wp_ajax_nopriv_mail", "towwwn_mail");

// Towwwn Mail function
function towwwn_mail( ) {

  // Extracts data
  $to  = isset($_POST['to'])  ? $_POST['to']  : null;
  $sub = isset($_POST['sub']) ? $_POST['sub'] : 'No Subject';
  $msg = isset($_POST['msg']) ? $_POST['msg'] : 'No Message';

  // Sends mail
  if ( $to === null ) { return false; }
  return ( wp_mail( $to, $sub, $msg ) );

}
