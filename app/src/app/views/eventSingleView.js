

// Event single view layout
const React = require( 'react' ),
      Globals = require( '../globals.js' ),
      _ = require( '../../modules/libaries/underscore/underscore_main.js' ),
      BehaviourDataHandler = require( '../../modules/handlers/behaviourHandler/dataHandler.js' ),
      LazyLoadHandler = require( '../../modules/handlers/lazyLoadHandler.js' ),
      SingleEvent = require( '../components/singleEvent.js' ),
      BannerCommercials = require( '../components/bannerCommercials.js' ),
      Header  = require( '../componentParts/sectionHeader.js' ),
      ScrollContainer  = require( '../componentParts/scrollContainer.js' ),
      ViewTopBar = require( '../componentParts/viewtopbar.js' );

class EventSingleView extends React.Component {

    // Ctor
    constructor() {
        super();

        this.lastElem = null;
        this.startTime = null;
        this.state = {
            'closeviewstate' : { },

            'standardclose' : {
                'leftview' : '#event-calendar-view',
                'rightview' : '#location-category-view',
                'fromLeft' : false,
                'fromRight' : true,
                'notrans': false,
                mobile: {
                    view : '#event-calendar-view',
                    fromLeft : false,
                    fromRight : true,
                }
            },

            'fromlocationclose' : {
                'leftview' : '#location-single-view',
                'rightview' : '#location-list-view',
                'fromLeft' : true,
                'fromRight' : false,
                'notrans': false,
                mobile: {
                    view : '#location-single-view',
                    fromLeft : true,
                    fromRight : false,
                }
            },

            'fromsearchclose' : {
                'leftview' : '#search-view',
                'rightview' : '#search-results-view',
                'fromLeft' : true,
                'fromRight' : false,
                'notrans': false,
                'ignoreAutoDirection': true,
                mobile: {
                    view : '#search-results-view',
                    fromLeft : true,
                    fromRight : false,
                }
            },

            'vref' : {
                'leftview' : '#event-single-view',
                'rightview' : '#location-single-view',
                'fromLeft' : true,
                'fromRight' : false,
                'notrans' : false,
                mobile : {
                    view : '#location-single-view',
                    fromLeft : true,
                    fromRight : false,
                }
            },

            jsxEvent : null,
            scrollTo : null,
        };
    }

    // Component will receive props
    componentWillReceiveProps( nextProps ) {
        if ( nextProps.event == this.lastElem ) {this.setState({scrollTo : null});}

        if ( nextProps.event != this.lastElem ) {

            this.setState({scrollTo : 0});

            let heart = _('#event-single-view .heart');
            if ( Globals.user.state.hearts.events[ nextProps.event.id ] == true && !heart.hasClass('active') ) {
                heart.removeClass('animback');
                heart.addClass('anim');

                setTimeout(() => {
                    heart.removeClass('anim');
                    heart.addClass('active');
                }, 400);

            } else if ( Globals.user.state.hearts.events[ nextProps.event.id ] != true && heart.hasClass( 'active' ) ) {
                heart.removeClass('anim');
                heart.addClass('animback');

                setTimeout(() => {
                    heart.removeClass('animback');
                    heart.removeClass('active');
                }, 400);
            }


            BehaviourDataHandler.parseData( 'event', nextProps.event );
            this.lastElem = nextProps.event;

            if ( this.props.event != null ) {
                BehaviourDataHandler.parseTimeData( 'event', this.props.event.id, new Date().getTime()  -this.startTime, this.props.event.parentid );
            } this.startTime = new Date().getTime();
        }

        if ( nextProps.from === 'location-single-view' ) {
            Globals.relations[ nextProps.name ].canleft = true;
            Globals.relations[ nextProps.name ].canright = false;
            this.setState({ closeviewstate : this.state.fromlocationclose });
        } else if ( nextProps.from === 'search-results-view' ) {
            Globals.relations[ nextProps.name ].canleft = true;
            Globals.relations[ nextProps.name ].canright = false;
            this.setState({ closeviewstate : this.state.fromsearchclose });
        } else {
            Globals.relations[ nextProps.name ].canleft = false;
            Globals.relations[ nextProps.name ].canright = true;
            this.setState({ closeviewstate : this.state.standardclose });
        }

        if ( nextProps.event != null ) {
            this.setState({
                'jsxEvent' : <SingleEvent elem={ nextProps.event } />,
            });
        }
    }

    // Will change view
    willChangeView() {

        Globals.setMainState({ singleLocation : null });

        // Opens new request
        let request = new XMLHttpRequest();
        request.addEventListener( 'load', ( resp ) => {
            let data = JSON.parse( resp.target.response );
            Globals.setMainState({
                'singleLocation' : data[0],
            });

            Globals.history.push(data[0]);
        });

        request.open( 'GET', app_data.rest_api + '/locations/'+this.props.event.parentid );
        request.send();
    }

    // heart
    heart() {
       if ( Globals.user != null && !Globals.user.state.loggedIn ) {
            Globals.setMainState({ from: 'event-single-view' });
            Globals.lastViewState = [ Globals.viewHandler.focusedViews[0], Globals.viewHandler.focusedViews[1] ];
            Globals.viewHandler.changeViewFocus(
                '#user-view',
                '#event-single-view',
                false, true, false, true
            );
       } else {
            let heart = _('#event-single-view .heart');
            if ( heart.hasClass('anim') || heart.hasClass('animback') ) return;

            if(Globals.user.state.hearts == null){
                Globals.user.state.hearts = { events : [], locations : [] }
            }

            if ( Globals.user.state.hearts.events[ this.props.event.id ] != true ) {
                heart.addClass('anim');
                Globals.user.state.hearts.events[ this.props.event.id ] = true;

                setTimeout(() => {
                    heart.removeClass('anim');
                    heart.addClass('active');
                }, 400 );

            } else {
                heart.addClass('animback');
                Globals.user.state.hearts.events[ this.props.event.id ] = false;

                setTimeout(() => {
                    heart.removeClass('animback');
                    heart.removeClass('active');
                }, 400);

            }
       }
    }

    // Component did mount
    componentDidMount() {

        Globals.user.hooks.add( 'onlogin', () => {
            if ( this.props.event != null && Globals.user.state.hearts.events[ this.props.event.id ] == true ) {
                let heart = _('#event-single-view .heart');
                heart.addClass('anim');
                setTimeout(() => {
                    heart.removeClass('anim');
                    heart.addClass('active');
                }, 400 );
            }
        });

    }

    // Render
    render() {
        let elem = this.props.event;
        return (
            <section className="container-section" id="event-single-view">
                <Header in="#event-single-view" for=".scroll-container">
                <ViewTopBar icon="#icon-star" viewBox="0 0 32 32" standard={ true } heart={ true } heartFunc={ this.heart.bind(this) } clickable={ false } title={ elem != null ? elem.name : 'Indlæser..' } closeviewstate={ this.state.closeviewstate } willChangeView={ this.willChangeView.bind(this) } name={ this.props.name } />
                </Header>
                <ScrollContainer scrollTo={this.state.scrollTo}>
                    <div className="content">

                        { this.state.jsxEvent != null &&
                          this.state.jsxEvent }
                    </div>
                </ScrollContainer>
            </section>
        );
    }

} module.exports = EventSingleView;
