

// Location List View
const React = require( 'react' ),
      _ = require( '../../modules/libaries/underscore/underscore_main.js' ),
      Globals = require( '../globals.js' ),
      BehaviourDataHandler = require( '../../modules/handlers/behaviourHandler/dataHandler.js' ),
      LazyLoadHandler = require( '../../modules/handlers/lazyLoadHandler.js' ),
      ViewTopBar = require( '../componentParts/viewtopbar.js' ),
      Location = require( '../components/location.js' ),
      Loader = require( '../componentParts/loader.js' );

class LocationListView extends React.Component {
    
    // Ctor
    constructor() { 
        super();

        this.lastElem = null;
        this.lastElems = [];
        this.state = {
            'closeviewstate' : {
                'leftview' : '#location-category-view',
                'rightview' : '#search-view',
                'fromLeft' : true,
                'fromRight' : false,
                mobile: {
                    view: '#location-category-view',
                    fromLeft: true, fromRight: false,
                }
            },
        };
    }

    // Update jsx elems
    updateJSXElemsOrder() {
        this.lastElems.sort(( a, b ) => {
            if ( Globals.user.state.hearts.locations[ a.id ] == true &&
                Globals.user.state.hearts.locations[ b.id ] != true ) return -1;
            if ( Globals.user.state.hearts.locations[ b.id ] == true &&
                Globals.user.state.hearts.locations[ a.id ] != true ) return 1;
            return 0;
        }); this.setState({ shouldSort: false });
    }

    // Move hearetd
    moveHearted( elem ) {
        if ( Globals.user.state.hearts.locations[ elem.id ] == true ) {
            for ( let iter = 0; iter < this.lastElems.length; iter++ ) {
                if ( this.lastElems[ iter ].id === elem.id ) {
                    let elem = this.lastElems[ iter ];
                    this.lastElems.splice( iter, 1 );
                    this.lastElems.splice( 0, 0, elem );

                    this.updateJSXElems();
                    break; }
            } return;
        } else {
            for ( let iter = 0; iter < this.lastElems.length; iter++ ) {
                if ( this.lastElems[ iter ].id === elem.id ) {
                    let elem = this.lastElems[ iter ];
                    this.lastElems.splice( iter, 1 );
                    this.lastElems.splice( this.lastElems.length - 1, 0, elem );

                    this.updateJSXElems();
                    break; }
            } return;
        }
    }

    // Update JSX Elems
    updateJSXElems() {
        let jsxElems = [];
        for ( let elem of this.lastElems ) {
            jsxElems.push( <Location key={ 'location-'+elem.id } elem={ elem } setMainState={ this.props.setMainState } /> );
        } this.setState({ 'jsxLocations' : jsxElems });
    }

    // On close
    onClose() { if( _( '.category.bookmark-mode' ) ) _( '.category.bookmark-mode' ).removeClass('bookmark-mode'); }

    // Component will receive props
    componentWillReceiveProps( nextProps ) {
        if ( nextProps.category != this.lastElem ) {
            BehaviourDataHandler.parseData( 'location-category', nextProps.category );
            this.lastElem = nextProps.category;
            Globals.hooks.trigger('category-change');
        }

        if ( nextProps.elems != null && this.lastElems !== nextProps.elems ) {
            this.lastElems = nextProps.elems;
            this.updateJSXElemsOrder();

            let jsxElems = [];
            for ( let elem of this.lastElems ) {
                jsxElems.push( <Location key={ 'location-'+elem.id } elem={ elem } setMainState={ nextProps.setMainState } /> );
            } this.setState({ 'jsxLocations' : jsxElems });
        }
    }

    // Component did mount
    componentDidMount() {
        Globals.hooks.add('ls-hearted', this.moveHearted.bind(this));
        Globals.hooks.add('onlogin', this.updateJSXElemsOrder.bind(this));
    }

    // Render
    render() {
        return (
            <section className="container-section" id="location-list-view">
               { this.props.category != null && 
                    <ViewTopBar closeviewstate={ this.state.closeviewstate } title={ this.props.category.category_name } darken={ true } standard={ true } name={ this.props.name } onClose={ this.onClose.bind(this) } />
                }
                
                <div className="scroll-container">
                    <div className="content">           
                        <div className="location-list" >
                            { this.state.jsxLocations != null && this.state.jsxLocations }
                            { this.state.jsxLocations == null && <Loader /> }
                        </div>
                    </div>
                </div>
            </section>
        );
    }

} module.exports = LocationListView;
