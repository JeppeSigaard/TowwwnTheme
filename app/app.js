
// Requires
let React = require( 'react' ),
    ReactDOM = require( 'react-dom' ),
    TowwwnApp = require( './src/app/pages/TowwwnApp.js' );

// Styling
require( '../style/index.scss' );

// Main Entry Point
let root = document.getElementById( 'root' );
ReactDOM.render( <TowwwnApp />, root );
