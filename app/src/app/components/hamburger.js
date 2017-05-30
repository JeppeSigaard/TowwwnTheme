


// Hameburger
const React = require( 'react' ),
      _ = require( '../../modules/libaries/underscore/underscore_main.js' ),
      Globals = require( '../globals.js' );

class Hamburger extends React.Component {

    // Constructor
    constructor() {
        super();

        this.prevBookmark = null;
        this.state = {
            navelems: [

                { // Log in
                    title: 'Log ind',
                    order: 0,
                    id: 'login',
                    vref: {
                        leftview: '#user-view',
                        fromLeft: true,
                        fromRight: false,
                        ignoreAutoDirection: true
                    },
                },

                { // Settings
                    title: 'Indstillinger',
                    order: 1,
                    id: 'settings',
                },

                { // Statistics
                    title: 'Statistik',
                    order: 2,
                    id: 'statistics'
                }

            ]
        };
    }

    // Bind UI Actions
    bindActions() {

        Globals.user.hooks.add( 'onlogin', () => {
            for ( let iter = 0; iter < this.state.navelems.length; iter++ ) {
                if ( this.state.navelems[ iter ].id == 'login' ) {
                    this.state.navelems.splice( iter, 1 );
                }
            }

            this.state.navelems.push({
                title: 'Log ud',
                order: 9999,
                id: 'logout'
            });

            this.updateJsxElems( false );
        });

        Globals.user.hooks.add( 'initlogin', () => {
            this.setOutOfService( 'login' );
        });

        _('.nav-user').on('click', this.toggle.bind(this));
        _('#general-overlay').on('click', this.toggle.bind(this));
    }

    // Toggle
    toggle() {
        if ( _('.content-container-inner').hasClass('aside') ) {

            _('.hamburger').removeClass('active');
            _('.content-container-inner').removeClass('aside');
            _('#general-overlay').removeClass('active');

            this.prevBookmark.addClass('bookmark-mode');
            _('.nav-user').removeClass('bookmark-mode');

        } else {

            _('.hamburger').addClass('active');
            _('.content-container-inner').addClass('aside');
            _('#general-overlay').addClass('active');

            this.prevBookmark = _('.nav-elem.bookmark-mode').removeClass('bookmark-mode');
            _('.nav-user').addClass('bookmark-mode');

        }
    }

    // Nav Click
    navClick( vref, cb ) {
        if ( vref != null ) {
            if ( !_('body').hasClass('mobile') ) {
                Globals.setMainState({ from: 'sidenav' });
                Globals.viewHandler.changeViewFocus(
                    vref.leftview != null ? vref.leftview : Globals.viewHandler.focusedViews[0],
                    vref.rightview != null ? vref.rightview : Globals.viewHandler.focusedViews[1],
                    vref.fromLeft,
                    vref.fromRight,
                    false,
                    false
                );

                setTimeout(() => {
                    this.toggle();
                }, parseFloat( _('.container-section').style()[0].transitionDuration ) * 1000);
            }
        } else {
            this.toggle();
        } if ( cb != null ) cb();
    }

    // Set out of service
    setOutOfService( id ) {
        for ( let iter = 0; iter < this.state.navelems.length; iter++ ) {
            if ( this.state.navelems[ iter ].id === id ) {
                let copy = this.state.navelems;
                copy[ iter ].outOfService = true;
                break;
            }
        }

        this.updateJsxElems( false );
    }

    // Update jsx elems
    updateJsxElems( silent ) {
        if ( this.state.navelems != null ) {
            for ( let iter = 0; iter < this.state.navelems.length; iter++ ) {
                if ( this.state.navelems[iter].order == null ) {
                    this.state.navelems.pop( iter );
                    throw "Navelem without order value removed";
                }
            }

            this.state.navelems.sort(( a, b ) => {
                if ( a.order > b.order ) return 1;
                if ( a.order < b.order ) return -1;
                return 0;
            });

            let jsxElems = [ ];
            for ( let navelem of this.state.navelems ) {
                jsxElems.push( <div className={ navelem.outOfService ? "navelem outofservice" : "navelem inservice" } onClick={ this.navClick.bind( this, navelem.vref != null ? navelem.vref : null, navelem.cb != null ? navelem.cb : null ) } href={ navelem.href } >{ navelem.title }</div> );
            }

            if ( silent ) this.state.jsxElems = jsxElems;
            else this.setState({ jsxElems : jsxElems });
        }
    }

    // Render
    render() {
        return (
            <div className="hamburger">
                <div className="hamburger-inner">
                    { this.state.jsxElems != null && this.state.jsxElems }
                </div>
            </div>
        );
    }

    // Component did mount
    componentDidMount() {
        this.bindActions();
    }

    // Component will mount
    componentWillMount() {
        this.updateJsxElems( true );
    }

    // Component did receive props
    componentWillUpdate( ) {
        this.updateJsxElems( true );
    }

} module.exports = Hamburger;
