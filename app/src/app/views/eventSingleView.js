

// Event single view layout
const React = require( 'react' ),
      Globals = require( '../globals.js' ),
      _ = require( '../../modules/libaries/underscore/underscore_main.js' ),
      BehaviourDataHandler = require( '../../modules/handlers/behaviourHandler/dataHandler.js' ),
      SingleEvent = require( '../components/singleEvent.js' ),
      Header  = require( '../componentParts/sectionHeader.js' ),
      ScrollContainer  = require( '../componentParts/scrollContainer.js' ),
      Railbar  = require( '../componentParts/railbar.js' ),
      SponsorBanner  = require( '../componentParts/sponsorBanner.js' ),
      Loader = require( '../componentParts/loader.js' ),
      ViewTopBar = require( '../componentParts/viewtopbar.js' );

class EventSingleView extends React.Component {

    // Ctor
    constructor() {
        super();

        this.lastElem = null;
        this.startTime = null;
        this.state = {
            sponsorBanners : null,
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

            // let heart = _('#event-single-view .heart');
            // if ( Globals.user.state.hearts.events.includes( nextProps.event.id ) && !heart.hasClass('active') ) {
            //     heart.removeClass('animback');
            //     heart.addClass('anim');
            //
            //     setTimeout(() => {
            //         heart.removeClass('anim');
            //         heart.addClass('active');
            //     }, 400);
            //
            // } else if ( Globals.user.state.hearts.events.includes( nextProps.event.id ) && heart.hasClass( 'active' ) ) {
            //     heart.removeClass('anim');
            //     heart.addClass('animback');
            //
            //     setTimeout(() => {
            //         heart.removeClass('animback');
            //         heart.removeClass('active');
            //     }, 400);
            // }


            // BehaviourDataHandler.parseData( 'event', nextProps.event );
            this.lastElem = nextProps.event;

            if ( this.props.event != null ) {
                // BehaviourDataHandler.parseTimeData( 'event', this.props.event.id, new Date().getTime()  -this.startTime, this.props.event.parentid );
            } this.startTime = new Date().getTime();


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
                }, this.applySponsorBanner.bind(this));
            }
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
    //    if ( Globals.user != null && !Globals.user.state.loggedIn ) {
    //         Globals.setMainState({ from: 'event-single-view' });
    //         Globals.lastViewState = [ Globals.viewHandler.focusedViews[0], Globals.viewHandler.focusedViews[1] ];
    //         Globals.viewHandler.changeViewFocus(
    //             '#user-view',
    //             '#event-single-view',
    //             false, true, false, true
    //         );
    //    } else {
    //         let heart = _('#event-single-view .heart');
    //         if ( heart.hasClass('anim') || heart.hasClass('animback') ) return;
    //
    //         if(Globals.user.state.hearts == null){
    //             Globals.user.state.hearts = { events : [], locations : [] }
    //         }
    //
    //         if ( !Globals.user.state.hearts.events.includes( this.props.event.id ) ) {
    //
    //             heart.addClass('anim');
    //             Globals.user.state.hearts.events.push( this.props.event.id );
    //
    //             setTimeout(() => {
    //                 heart.removeClass('anim');
    //                 heart.addClass('active');
    //             }, 400 );
    //
    //         } else {
    //             heart.addClass('animback');
    //             Globals.user.state.hearts.events.splice( Globals.user.state.hearts.events.indexOf(this.props.event.id), 1 );
    //
    //             setTimeout(() => {
    //                 heart.removeClass('animback');
    //                 heart.removeClass('active');
    //             }, 400);
    //
    //         }
    //
    //        Globals.user.hooks.trigger('eventHearts');
    //     }
    //
    //     console.log( Globals.user.state.hearts );
    }

    applySponsorBanner(){

        const commercialOptions = {
            for : 'event_single',
            per_page : 3,
        };

        Globals.CommercialDataHandler.getCommercials(commercialOptions).then((resp) =>{

            if(resp.length < 1) return;
            let sponsorBanners = [];
            const time = new Date().getTime();

            for(let item in resp){
                if(resp.hasOwnProperty(item)){
                    sponsorBanners.push(<SponsorBanner type="event_single" key={'single-banner-'+resp[item].id} item={resp[item]}></SponsorBanner>);
                }
            }

            this.setState({sponsorBanners : sponsorBanners });
        });
    }

    //
    // // Component did mount
    // componentDidMount() {
    //
    //     Globals.user.hooks.add( 'onlogin', () => {
    //         if ( this.props.event != null && Globals.user.state.hearts.events.includes( this.props.event.id ) ) {
    //             let heart = _('#event-single-view .heart');
    //             heart.addClass('anim');
    //             setTimeout(() => {
    //                 heart.removeClass('anim');
    //                 heart.addClass('active');
    //             }, 400 );
    //         }
    //     });
    //
    // }

    // Render
    render() {
        let elem = this.props.event;
        return (
            <section className="container-section" id="event-single-view">
                <Header in="#event-single-view" for=".scroll-container">
                <ViewTopBar icon="#icon-star" viewBox="0 0 32 32" standard={ true } heart={ false } clickable={ false } title={ elem != null ? elem.name : 'Indlæser..' } closeviewstate={ this.state.closeviewstate } willChangeView={ this.willChangeView.bind(this) } name={ this.props.name } />
                </Header>
                <ScrollContainer name="event-single-scroll-content" scrollTo={this.state.scrollTo}>
                    <div className="content">

                        { this.state.jsxEvent != null &&
                          this.state.jsxEvent }

                        { this.state.jsxEvent != null && this.state.sponsorBanners != null &&
                        <Railbar name={'single-event-sponsor-banner'} sizes={{0:1}} children={this.state.sponsorBanners} snap />}

                        { this.state.jsxEvent == null &&
                            <Loader /> }

                    </div>
                </ScrollContainer>
            </section>
        );
    }

} module.exports = EventSingleView;
