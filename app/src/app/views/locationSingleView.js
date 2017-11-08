

// Location Single view
const React = require( 'react' ),
      Globals = require( '../globals.js' ),
      _ = require( '../../modules/libaries/underscore/underscore_main.js' ),
      BehaviourDataHandler = require( '../../modules/handlers/behaviourHandler/dataHandler.js' ),
      SingleLocation = require( '../components/singleLocation.js' ),
      ViewTopBar = require( '../componentParts/viewtopbar.js' ),
      Header  = require( '../componentParts/sectionHeader.js' ),
      ScrollContainer  = require( '../componentParts/scrollContainer.js' ),
      Railbar  = require( '../componentParts/railbar.js' ),
      SponsorBanner  = require( '../componentParts/sponsorBanner.js' ),
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
            SponsorBanners : null,
            closeviewstate: this.standardclose,
            scroller : 0,
        };

    }

    // Heart
    heart() {
      //  if ( Globals.user != null && !Globals.user.state.loggedIn ) {
      //       Globals.setMainState({ from: 'location-single-view' });
      //       Globals.lastViewState = [ Globals.viewHandler.focusedViews[0], Globals.viewHandler.focusedViews[1] ];
      //       Globals.viewHandler.changeViewFocus(
      //           '#user-view',
      //           '#location-single-view',
      //           false, true, false, true
      //       );
      //  } else {
      //       let heart = _('#location-single-view .heart');
      //       if ( heart.hasClass('anim') || heart.hasClass('animback') ) return;
      //       if ( !Globals.user.state.hearts.locations.includes( this.props.elem.id ) ) {
       //
      //           heart.addClass('anim');
      //           Globals.user.state.hearts.locations.push( this.props.elem.id );
       //
      //           setTimeout(() => {
      //               heart.removeClass('anim');
      //               heart.addClass('active');
      //           }, 400 );
       //
      //       } else {
      //           heart.addClass('animback');
      //           Globals.user.state.hearts.locations.splice( Globals.user.state.hearts.locations.indexOf( this.props.elem.id ), 1 );
       //
      //           setTimeout(() => {
      //               heart.removeClass('animback');
      //               heart.removeClass('active');
      //           }, 400);
       //
      //       }
       //
      //       Globals.hooks.trigger( 'ls-hearted', this.props.elem );
      //  }
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

            this.applySponsorBanner();

            this.setState({scrollTo : 0});

            // let heart = _('#location-single-view .heart');

            // if ( Globals.user.state.hearts.locations.includes( nextProps.elem.id ) && !heart.hasClass('active') ) {
            //     heart.removeClass('animback');
            //     heart.addClass('anim');
            //
            //     setTimeout(() => {
            //         heart.removeClass('anim');
            //         heart.addClass('active');
            //     }, 400);
            //
            // } else if ( !Globals.user.state.hearts.locations.includes( nextProps.elem.id ) && heart.hasClass( 'active' ) ) {
            //     heart.removeClass('anim');
            //     heart.addClass('animback');
            //
            //     setTimeout(() => {
            //         heart.removeClass('animback');
            //         heart.removeClass('active');
            //     }, 400);
            // }
            //
            // BehaviourDataHandler.parseData( 'location', nextProps.elem );
            this.lastElem = nextProps.elem;

            if ( this.props.elem != null ) {
                // BehaviourDataHandler.parseTimeData( 'location', this.props.elem.id, new Date().getTime() - this.startTime );
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

    applySponsorBanner(){

        const commercialOptions = {
            for : 'location_single',
            per_page : 3,
        };

        Globals.CommercialDataHandler.getCommercials(commercialOptions).then((resp) =>{

            if(resp.length < 1) return;
            let sponsorBanners = [];
            const time = new Date().getTime();

            for(let item in resp){
                if(resp.hasOwnProperty(item)){
                    sponsorBanners.push(<SponsorBanner type="location_single" key={'single-banner-'+resp[item].id} item={resp[item]}></SponsorBanner>);
                }
            }

            this.setState({sponsorBanners : sponsorBanners });
        });
    }

    // Component did mount
    componentDidMount() {

        // Globals.user.hooks.add( 'onlogin', () => {
        //     if ( this.props.elem != null && Globals.user.state.hearts.locations.includes( this.props.elem.id ) ) {
        //         let heart = _('#location-single-view .heart');
        //         heart.addClass('anim');
        //         setTimeout(() => {
        //             heart.removeClass('anim');
        //             heart.addClass('active');
        //         }, 400 );
        //     }
        // });
    }

    // Render
    render() {
        return (
            <section className="container-section" id="location-single-view">
                <Header for=".scroll-container" in="#location-single-view">
                    <ViewTopBar icon="#icon-location" viewBox="0 0 32 32" standard={ true } title={ this.props.elem != null ? this.props.elem.name : 'Indlæser..' } closeviewstate={ this.state.closeviewstate } name={ this.props.name } heart={ false } />
                </Header>
                <ScrollContainer name="location-single-scroll-content" scroller={this.state.scroller} scrollTo={this.state.scrollTo}>
                    <div className="content">
                        { this.props.elem != null &&
                            <SingleLocation elem={ this.props.elem } name={ this.props.name } onLoad={this.onLoad.bind(this)}/> }

                        { this.props.elem != null && this.state.sponsorBanners != null &&
                        <Railbar name={'single-location-sponsor-banner'} sizes={{0:1}} children={this.state.sponsorBanners} snap />}

                        { this.props.elem == null &&
                            <Loader /> }
                    </div>
                </ScrollContainer>
            </section>
        );
    }

} module.exports = LocationSingleView;
