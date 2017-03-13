

// Text Processor
const React = require( 'react' );
class TextPreprocessor {

    // NL2P
    static nl2p( text ) {
        let paras = text.split( /[\r\n]+/g ), resp = [];
        for ( let iter = 0; iter < paras.length; iter++ ) {
            resp.push( <p key={ 'esvpara-' + iter } >{ paras[iter] }</p> ); 
        } return resp;
    }

} module.exports = TextPreprocessor;
