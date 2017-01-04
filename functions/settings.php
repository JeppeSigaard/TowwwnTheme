<?php 

// Disables admin bar
show_admin_bar( false );

// Adds svg file type to media library
add_filter('upload_mimes', 'smamo_svg');
function smamo_svg( $mimes ) {
  $mimes['svg'] = 'image/svg+xml';
  return $mimes;
}