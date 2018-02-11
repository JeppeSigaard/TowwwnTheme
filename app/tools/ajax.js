

// POST Ajax Request
const postAjax = (( action, data ) => {

  // Formats data
  data = Object.assign({ }, data, { action });

  // Returns new promise
  return new Promise(( resolve, reject ) => {

    // Creates new xhr request
    let request = new XMLHttpRequest();
    request.onload = (( r ) => { resolve(r); });

    // Opens request
    request.open( 'POST', app_data.ajax_url );

    // Sets request header
    request.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
    request.setRequestHeader( 'Content-Type', 'application/x-www-form-urlencoded' );

    // Generates params
    let params = Object.keys( data ).map(( val ) => {
      return ( val + '=' + data[ val ] );
    }).join('&');

    // Sends request
    request.send( params );

  }); 

});

// Exports
export { postAjax }