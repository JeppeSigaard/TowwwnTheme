

// Text Processor
class TextPreprocessor {

    // NL2P
    static nl2p( text ) {

        let paras = text.split( /[\r\n]+/g ), resp = [];
        for ( let para of paras ) {
            resp.push( <p>{ para }</p> ); }

        return resp;

    }

} module.exports = TextPreprocessor;
