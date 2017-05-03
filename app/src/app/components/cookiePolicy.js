const React = require( 'react' ),
      Globals = require( '../globals.js' );

class CookiePolicy extends React.Component {

    // Ctor
    constructor() {
        super();

        let approve = window._cookielib.read('cookie-ok');
        this.show = (approve == 'ok') ? false : true;
    }

    handleApprove( e ){
        window._cookielib.set('cookie-ok','ok', 365);
        this.setState({classNames : ['towwwn-cookie', 'fadeout']});
    }

    // Render
    render() {

        if ( this.show ) {
            const classNames = (this.state != null) ? this.state.classNames.join(' ') : 'towwwn-cookie';

            return(
                <div className={ classNames }>
                    <div className="towwwn-cookie-text">Towwwn bruger cookies. <a href={app_data.main_path + '/cookie/'}>Læs mere her</a></div>
                    <div className="towwwn-cookie-close" onClick={ this.handleApprove.bind(this) }>√</div>
                </div>
            )
        }
        else{return null;}
    }

} module.exports = CookiePolicy;
