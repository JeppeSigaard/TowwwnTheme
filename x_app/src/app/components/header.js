


// Header
const React = require( 'react' ),
      Globals = require( '../globals.js' ),
      _ = require( '../../modules/libaries/underscore/underscore_main.js' );

class Header extends React.Component {

    constructor(){
        super();

        this.state = {
            views : [null, null],
        }

        Globals.hooks.add( 'viewChanged', (data) => {
            this.updateBookmark(data);
        });

    }

    updateBookmark(views){
        if (views === this.state.views) this.setState( { views : [ views[1], views[0] ] } );
        else this.setState({views : views});
    }

    // On nav search click
    navSearchClick() {

        if ( _('.search-nav-container .bookmark-mode') !== false )
            _('.search-nav-container .bookmark-mode').removeClass('bookmark-mode');
        if ( _('.search-inactive') !== false ) _('.search-inactive').removeClass('search-inactive');

        // Focus search bar (if not mobile)
        if(!_('body').hasClass('mobile') && !_('body').hasClass('ipad') ){
            document.getElementById('search-bar').focus();
        }

        if(Globals.hamburger != null && Globals.hamburger) Globals.hooks.trigger('toggle-hamburger');
        Globals.viewHandler.changeViewFocus( '#search-view', Globals.viewHandler.focusedViews[0], true, false, false );
        Globals.history.push({'type' : 'home', 'name' : 'Søg · Towwwn'});

    }

    // On nav location click
    navLocationClick() {
        if ( _('.search-nav-container .bookmark-mode') !== false )
            _('.search-nav-container .bookmark-mode').removeClass('bookmark-mode');

        if ( _('.search-inactive') !== false ) _('.search-inactive').removeClass('search-inactive');

        if(Globals.hamburger != null && Globals.hamburger) Globals.hooks.trigger('toggle-hamburger');
        Globals.viewHandler.changeViewFocus( '#location-category-view', Globals.viewHandler.focusedViews[0], false, true, false );
        Globals.history.push({'type' : 'home', 'name' : 'Steder · Towwwn'});

    }

    // On nav event click
    navEventClick() {
        if ( _('.category.bookmark-mode') !== false ) _('.category.bookmark-mode').removeClass('bookmark-mode');

        if ( _('.search-nav-container .bookmark-mode') !== false )
            _('.search-nav-container .bookmark-mode').removeClass('bookmark-mode');
        if ( _('.search-inactive') !== false ) _('.search-inactive').removeClass('search-inactive');

        if(Globals.hamburger != null && Globals.hamburger) Globals.hooks.trigger('toggle-hamburger');
        Globals.viewHandler.changeViewFocus( '#event-calendar-view', Globals.viewHandler.focusedViews[1], true, false, false );
        Globals.history.push({'type' : 'home', 'name' : 'Begivenheder · Towwwn'});
    }

    userClick(){
        Globals.hooks.trigger('toggle-hamburger');
    }

    handleTouchStart(){
        Globals.navigationBlocker = true;
    }

    handleTouchEnd(){
        setTimeout(function(){Globals.navigationBlocker = false;},100);
    }

    componentDidMount(){
    }

    // Render
    render() {


        // Set bookmark mode and semi bookmark mode
        const calendar_views = ['#event-single-view','#event-calendar-view'],
              location_views = ['#location-category-view','#location-list-view','#location-single-view'],
              search_views = ['#search-view'],
              views = this.state.views;


        let event_classes = 'nav-elem nav-events',
            location_classes = 'nav-elem nav-locations',
            search_classes = 'nav-elem nav-search';

        if(views[0] != null && calendar_views.indexOf(views[0]) != -1) event_classes += ' bookmark-mode';
        else if(views[1] != null && calendar_views.indexOf(views[1]) != -1) event_classes += ' semi-bookmark-mode';

        if(views[0] != null && location_views.indexOf(views[0]) != -1) location_classes += ' bookmark-mode';
        else if(views[1] != null && location_views.indexOf(views[1]) != -1) location_classes += ' semi-bookmark-mode';

        if(views[0] != null && search_views.indexOf(views[0]) != -1) search_classes += ' bookmark-mode';
        else if(views[1] != null && search_views.indexOf(views[1]) != -1) search_classes += ' semi-bookmark-mode';

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
                            {/*<div className={search_classes} onClick={ this.navSearchClick.bind(this) } >
                                <svg viewBox="0 0 32 32">
                                    <use xlinkHref="#icon-search">
                                    </use>
                                </svg>
                            </div>*/}
                            <div className={event_classes} onClick={ this.navEventClick.bind(this) } >
                                <svg viewBox="0 0 32 32">
                                    <use xlinkHref="#icon-event">
                                    </use>
                                </svg>
                            </div>
                            <div className={location_classes} onClick={ this.navLocationClick.bind(this) } >
                                <svg viewBox="0 0 32 32">
                                    <use xlinkHref="#icon-location">
                                    </use>
                                </svg>
                            </div>
                            <div className="nav-user nav-elem" onClick={ this.userClick.bind(this) }>
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
