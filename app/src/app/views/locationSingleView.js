

// Location Single view
const React = require( 'react' ),
      Globals = require( '../globals.js' ),
      _ = require( '../../modules/libaries/underscore/underscore_main.js' ),
      BehaviourDataHandler = require( '../../modules/handlers/behaviourHandler/dataHandler.js' ),
      LazyLoadHandler = require( '../../modules/handlers/lazyLoadHandler.js' ),
      SingleLocation = require( '../components/singleLocation.js' ),
      BannerCommercials = require( '../components/bannerCommercials.js' ),
      ViewTopBar = require( '../componentParts/viewtopbar.js' ),
      Header  = require( '../componentParts/sectionHeader.js' ),
      ScrollContainer  = require( '../componentParts/scrollContainer.js' ),
      Loader = require( '../componentParts/loader.js' );

class LocationSingleView extends React.Component{

    // Ctor

    constructor() {
        super();
        this.startTime = 0;
        this.lastElem = null;

        // Standard close properties
        this.standardclose = {
            leftview: '#location-list-view',
            rightview: '#location-category-view',
            fromLeft: true,
            fromRight: false,
            mobile: {
                view: '#location-list-view',
                fromLeft: true,
                fromRight: false,
            }
        };

        // Close properties when coming from event
        this.fromeventclose = {
            leftview: '#event-single-view',
            rightview: '#event-calendar-view',
            fromLeft: false,
            fromRight: true,
            mobile: {
                view: '#event-single-view',
                fromLeft: false,
                fromRight: true,
            }
        };

        // From search close
        this.fromsearchclose = {
            leftview : '#search-view',
            rightview : '#search-results-view',
            fromLeft : true,
            fromRight: true,
            mobile : {
                view : '#search-results-view',
                fromLeft : true,
                fromRight : false
            }
        };

        // Close properties when coming from calendar
        this.fromeventCalendarclose = {
            leftview: '#location-category-view',
            rightview: '#event-calendar-view',
            fromLeft: false,
            fromRight: true,
            mobile: {
                view: '#event-calendar-view',
                fromLeft: false,
                fromRight: true,
            }
        };

        // State
        this.state = {
            closeviewstate: this.standardclose,
            scroller : 0,
        };

    }

    // Heart
    heart() {
       if ( Globals.user != null && !Globals.user.state.loggedIn ) {
            Globals.setMainState({ from: 'location-single-view' });
            Globals.lastViewState = [ Globals.viewHandler.focusedViews[0], Globals.viewHandler.focusedViews[1] ];
            Globals.viewHandler.changeViewFocus(
                '#user-view',
                '#location-single-view',
                false, true, false, true
            );
       } else {
            let heart = _('#location-single-view .heart');
            if ( heart.hasClass('anim') || heart.hasClass('animback') ) return;
            if ( Globals.user.state.hearts.locations[ this.props.elem.id ] != true ) {
                heart.addClass('anim');
                Globals.user.state.hearts.locations[ this.props.elem.id ] = true;

                setTimeout(() => {
                    heart.removeClass('anim');
                    heart.addClass('active');
                }, 400 );

            } else {
                heart.addClass('animback');
                Globals.user.state.hearts.locations[ this.props.elem.id ] = false;

                setTimeout(() => {
                    heart.removeClass('animback');
                    heart.removeClass('active');
                }, 400);

            }

            Globals.hooks.trigger( 'ls-hearted', this.props.elem );
       }
    }

    // when Single Location loads
    onLoad(){
        setTimeout(function(){
            this.setState({scroller : new Date().getTime(), scrollTo : null});
        }.bind(this), 150);
    }

    // Component will receive props
    componentWillReceiveProps( nextProps ) {

        if ( nextProps.elem == this.lastElem ) {this.setState({scrollTo : null});}
        if ( nextProps.elem != this.lastElem ) {

            this.setState({scrollTo : 0});

            let heart = _('#location-single-view .heart');

            if ( Globals.user.state.hearts.locations[ nextProps.elem.id ] == true && !heart.hasClass('active') ) {
                heart.removeClass('animback');
                heart.addClass('anim');

                setTimeout(() => {
                    heart.removeClass('anim');
                    heart.addClass('active');
                }, 400);

            } else if ( Globals.user.state.hearts.locations[ nextProps.elem.id ] != true && heart.hasClass( 'active' ) ) {
                heart.removeClass('anim');
                heart.addClass('animback');

                setTimeout(() => {
                    heart.removeClass('animback');
                    heart.removeClass('active');
                }, 400);
            }

            BehaviourDataHandler.parseData( 'location', nextProps.elem );
            this.lastElem = nextProps.elem;

            if ( this.props.elem != null ) {
                BehaviourDataHandler.parseTimeData( 'location', this.props.elem.id, new Date().getTime() - this.startTime );
            } this.startTime = new Date().getTime();
        }

        // Sets close state
        if ( nextProps.from === 'event-single-view' ) {

            Globals.relations[ nextProps.name ].canright = true;
            Globals.relations[ nextProps.name ].canleft = false;

            this.setState({
                closeviewstate : this.fromeventclose,
            });

        } else if ( nextProps.from === 'event-calendar-view' ) {

            Globals.relations[ nextProps.name ].canright = false;
            Globals.relations[ nextProps.name ].canleft = false;

            this.setState({
                closeviewstate : this.fromeventCalendarclose,
            });

        } else if ( nextProps.from === 'search-results-view' ) {

            Globals.relations[ nextProps.name ].canright = false;
            Globals.relations[ nextProps.name ].canleft = true;

            this.setState({
                closeviewstate : this.fromsearchclose,
            });

        } else {

            Globals.relations[ nextProps.name ].canright = false;
            Globals.relations[ nextProps.name ].canleft = true;

            this.setState({
                closeviewstate : this.standardclose,
            });

        }

    }

    // Component did mount
    componentDidMount() {
        this.lazyLoad = new LazyLoadHandler( '#location-single-view .scroll-container' );

        Globals.user.hooks.add( 'onlogin', () => {
            if ( this.props.elem != null && Globals.user.state.hearts.locations[ this.props.elem.id ] == true ) {
                let heart = _('#location-single-view .heart');
                heart.addClass('anim');
                setTimeout(() => {
                    heart.removeClass('anim');
                    heart.addClass('active');
                }, 400 );
            }
        });
    }

    // Component did update
    componentDidUpdate() {
        if ( this.props.elem != null ) {
            this.lazyLoad.triggerload();
        }
    }

    // Render
    render() {
        return (
            <section className="container-section" id="location-single-view">
                <Header for=".scroll-container" in="#location-single-view">
                    <ViewTopBar icon="#icon-location" viewBox="0 0 32 32" standard={ true } title={ this.props.elem != null ? this.props.elem.name : 'Indlæser..' } closeviewstate={ this.state.closeviewstate } name={ this.props.name } heart={ true } heartFunc={ this.heart.bind(this) } />
                </Header>
                <ScrollContainer scroller={this.state.scroller} scrollTo={this.state.scrollTo}>
                    <div className="content">
                        { this.props.elem != null &&
                            <SingleLocation elem={ this.props.elem } name={ this.props.name } onLoad={this.onLoad.bind(this)}/> }
                        { this.props.elem == null &&
                            <Loader /> }
                    </div>
                </ScrollContainer>
            </section>
        );
    }

} module.exports = LocationSingleView;
