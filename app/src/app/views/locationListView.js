

// Location List View
const React = require( 'react' ),
      _ = require( '../../modules/libaries/underscore/underscore_main.js' ),
      Globals = require( '../globals.js' ),
      BehaviourDataHandler = require( '../../modules/handlers/behaviourHandler/dataHandler.js' ),
      LazyLoadHandler = require( '../../modules/handlers/lazyLoadHandler.js' ),
      ViewTopBar = require( '../componentParts/viewtopbar.js' ),
      Button  = require( '../componentParts/categoryFilterButton.js' ),
      Railbar = require( '../componentParts/railbar.js' ),
      Header  = require( '../componentParts/sectionHeader.js' ),
      ScrollContainer  = require( '../componentParts/scrollContainer.js' ),
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
                'leftview' : '#event-calendar-view',
                'rightview' : '#location-category-view',
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

            if ( parseInt( a.hearts ) > parseInt( b.hearts ) ) return 1;
            if ( parseInt( a.hearts ) < parseInt( b.hearts ) ) return -1;
            return 0;

        });

        this.setState({ shouldSort: false });
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

        if(nextProps.elems == null){
            this.setState({jsxLocations : null});
        }

        if ( nextProps.category != this.lastElem ) {
            this.setState({jsxLocations : null});

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

        if(nextProps.category != null && nextProps.category.category_parent != null){

            let jsxCategoryList = [];

            const getID = (nextProps.category.category_parent == 0 ) ? nextProps.category.category_id : nextProps.category.category_parent;

            if(getID != this.state.jsxCategoryListHead){

                _('#location-list-view').removeClass('large-header');

                this.setState({ catFilterIndex : null, 'jsxCategoryList' : null, 'jsxCategoryListHead' : getID, 'locationListHeading' : 'Indlæser...' });

                Globals.categoryDataHandler.getCategory( getID ).then(( resp ) => {

                    if(resp.children.length == 0){this.setState({ 'jsxCategoryList' : null, 'jsxCategoryListHead' : getID, 'locationListHeading' : resp.category_name }); return;}

                    jsxCategoryList.push(<Button
                        active={ resp.category_id == nextProps.category.category_id}
                        count={resp.location_count}
                        key={'filter-button-' + resp.category_id}
                        elem={resp}
                        name='Alle'
                        locations={resp.locations}
                    />);

                    if(resp.category_id == nextProps.category.category_id) this.setState({catFilterIndex : 0});


                    if(resp.children != null){
                        let i = 0;
                        for(let cat of resp.children){
                            i ++;
                            if(cat.category_id == nextProps.category.category_id) this.setState({catFilterIndex : i});

                            jsxCategoryList.push(<Button
                                active={ cat.category_id == nextProps.category.category_id}
                                count={cat.category_count}
                                key={'filter-button-' + cat.category_id}
                                elem={cat}
                                name={cat.category_name}
                            />);
                        }
                    }

                    this.setState({ 'jsxCategoryList' : jsxCategoryList, 'jsxCategoryListHead' : getID, 'locationListHeading' : resp.category_name });

                    _('#location-list-view').addClass('large-header');
                });
            }
        }

        else {
            this.setState({ 'jsxCategoryList' : null, 'jsxCategoryListHead' : null });
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
               <Header in="#location-list-view" for=".scroll-container">
                   { this.props.category != null &&
                        <ViewTopBar icon="#icon-location" viewBox="0 0 32 32" closeviewstate={ this.state.closeviewstate } title={ this.state.locationListHeading } darken={ true } standard={ true } name={ this.props.name } onClose={ this.onClose.bind(this) } />
                    }
                     { this.state.jsxCategoryList != null &&
                        <Railbar name="sub-cat-bar" railIndex={this.state.catFilterIndex} snap>
                            {this.state.jsxCategoryList}
                        </Railbar> }
               </Header>
                <ScrollContainer name="location-list-scroll-content" in="#location-list-view">
                    <div className="content">
                        { this.state.jsxLocations != null &&
                        <div className="location-list" >
                            { this.state.jsxLocations != null && this.state.jsxLocations }
                        </div>}
                        { this.state.jsxLocations == null && <Loader /> }
                    </div>
                </ScrollContainer>
            </section>
        );
    }

} module.exports = LocationListView;
