


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


        Globals.viewHandler.changeViewFocus( '#search-view', Globals.viewHandler.focusedViews[0], true, false, false );


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

        Globals.viewHandler.changeViewFocus( '#location-category-view', Globals.viewHandler.focusedViews[0], false, true, false );

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


        Globals.viewHandler.changeViewFocus( '#event-calendar-view', Globals.viewHandler.focusedViews[1], true, false, false );

        Globals.history.push({'type' : 'home', 'name' : 'Begivenheder · Towwwn'});
    }

    handleTouchStart(){
        Globals.navigationBlocker = true;
    }

    handleTouchEnd(){
        setTimeout(function(){Globals.navigationBlocker = false;},100);
    }

    // Render
    render() {
        return (
            <header id="site-header" className="site-header" onTouchStart={this.handleTouchStart.bind(this)} onTouchEnd={this.handleTouchEnd.bind(this)}>
                <div className="header-container">
                    <div id="headerbar">
                        <a href={app_data.main_path} className="logo-container">
                           <div className="logo">
                                <svg viewBox="0 0 32 32">
                                    <use xlinkHref="#towwwn-logo">
                                    </use>
                                </svg>
                            </div>
                            <div className="city">{ app_data.city }</div>
                        </a>

                        <div id="top-nav-icons" >
                            <div className="nav-search nav-elem" onClick={ this.navSearchClick.bind(this) } >
                                <svg viewBox="0 0 32 32">
                                    <use xlinkHref="#icon-search">
                                    </use>
                                </svg>
                            </div>
                            <div className="nav-events nav-elem bookmark-mode" onClick={ this.navEventClick.bind(this) } >
                                <svg viewBox="0 0 32 32">
                                    <use xlinkHref="#icon-event">
                                    </use>
                                </svg>
                            </div>
                            <div className="nav-locations nav-elem" onClick={ this.navLocationClick.bind(this) } >
                                <svg viewBox="0 0 32 32">
                                    <use xlinkHref="#icon-location">
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
