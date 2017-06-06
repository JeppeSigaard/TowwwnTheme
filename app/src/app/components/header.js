


// Header
const React = require( 'react' ),
      Globals = require( '../globals.js' ),
      _ = require( '../../modules/libaries/underscore/underscore_main.js' );

class Header extends React.Component {

    // On nav search click
    navSearchClick() {
        if ( _('.search-nav-container .bookmark-mode') !== false )
            _('.search-nav-container .bookmark-mode').removeClass('bookmark-mode');

        _('.nav-elem').removeClass('bookmark-mode');
        _( '.nav-search' ).addClass('bookmark-mode');
        if ( _('.search-inactive') !== false ) _('.search-inactive').removeClass('search-inactive');

        if(_('body').hasClass('mobile')){
            Globals.viewHandler.changeMobileViewFocus(
                '#search-view',
                true, false
            );
        }

        else{
            Globals.viewHandler.changeViewFocus(
                '#search-view',
                Globals.viewHandler.focusedViews[0],
                true, false, false
            );
        }

        // Focus search bar (if not mobile)
        if(!_('body').hasClass('mobile')){
            document.getElementById('search-bar').focus();
        }

        Globals.history.push({'type' : 'home', 'name' : 'Søg · Towwwn'});
    }

    // On nav location click
    navLocationClick() {
        if ( _('.search-nav-container .bookmark-mode') !== false )
            _('.search-nav-container .bookmark-mode').removeClass('bookmark-mode');

        _('.nav-elem').removeClass('bookmark-mode');
        _( '.nav-locations' ).addClass('bookmark-mode');
        if ( _('.search-inactive') !== false ) _('.search-inactive').removeClass('search-inactive');

        Globals.viewHandler.changeViewFocus(
            '#location-category-view',
            Globals.viewHandler.focusedViews[0],
            true, false, false
        );

        Globals.history.push({'type' : 'home', 'name' : 'Steder · Towwwn'});
    }

    // On nav event click
    navEventClick() {
        if ( _('.category.bookmark-mode') !== false ) _('.category.bookmark-mode').removeClass('bookmark-mode');

        if ( _('.search-nav-container .bookmark-mode') !== false )
            _('.search-nav-container .bookmark-mode').removeClass('bookmark-mode');

        _('.nav-elem').removeClass('bookmark-mode');
        _( '.nav-events' ).addClass('bookmark-mode');
        if ( _('.search-inactive') !== false ) _('.search-inactive').removeClass('search-inactive');

        Globals.viewHandler.changeViewFocus(
            Globals.viewHandler.focusedViews[1],
            '#event-calendar-view',
            false, true, false
        );

        Globals.history.push({'type' : 'home', 'name' : 'Begivenheder · Towwwn'});
    }

    // Render
    render() {
        return (
            <header id="site-header" className="site-header">
                <div className="header-container">
                    <div id="headerbar">
                        <div className="logo">
                            <svg viewBox="0 0 32 32">
                                <use xlinkHref="#towwwn-logo">
                                </use>
                            </svg>
                        </div>
                        <a href="#" className="logo-container">
                            <div className="city">{ app_data.city }</div>
                        </a>

                        <div id="top-nav-icons">
                            <div className="nav-search nav-elem" onClick={ this.navSearchClick.bind(this) } >
                                <svg viewBox="0 0 32 32">
                                    <use xlinkHref="#icon-search">
                                    </use>
                                </svg>
                            </div>
                            <div className="nav-locations nav-elem" onClick={ this.navLocationClick.bind(this) } >
                                <svg viewBox="0 0 32 32">
                                    <use xlinkHref="#icon-location">
                                    </use>
                                </svg>
                            </div>
                            <div className="nav-events nav-elem bookmark-mode" onClick={ this.navEventClick.bind(this) } >
                                <svg viewBox="0 0 32 32">
                                    <use xlinkHref="#icon-event">
                                    </use>
                                </svg>
                            </div>
                            <div className="nav-user nav-elem">
                                <svg viewBox="0 0 32 32">
                                    <use xlinkHref="#icon-user">
                                    </use>
                                </svg>
                            </div>
                        </div>
                    </div>
                </div>
            </header>
        );
    }

} module.exports = Header;
