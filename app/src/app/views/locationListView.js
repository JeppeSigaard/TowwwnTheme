

// Location List View
const React = require( 'react' ),
      _ = require( '../../modules/libaries/underscore/underscore_main.js' ),
      BehaviourDataHandler = require( '../../modules/handlers/behaviourHandler/dataHandler.js' ),
      CategoryDataHandler = require( '../../modules/handlers/dataHandlers/categoryDataHandler.js' ),
      LazyLoadHandler = require( '../../modules/handlers/lazyLoadHandler.js' ),
      ViewTopBar = require( '../componentParts/viewtopbar.js' ),
      CategoryFilterButton  = require( '../componentParts/categoryFilterButton.js' ),
      Location = require( '../components/location.js' ),
      Loader = require( '../componentParts/loader.js' ),
      Railbar = require( '../componentParts/railbar.js' ),
      Globals = require( '../globals.js' );

class LocationListView extends React.Component {

    // Ctor
    constructor() {
        super();

        this.lastElem = null;
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
    // On close
    onClose() { if( _( '.category.bookmark-mode' ) ) _( '.category.bookmark-mode' ).removeClass('bookmark-mode'); }

    // Component will receive props
    componentWillReceiveProps( nextProps ) {
        if ( nextProps.category != this.lastElem ) {
            BehaviourDataHandler.parseData( 'location-category', nextProps.category );
            this.lastElem = nextProps.category;
        }

        if ( nextProps.elems != null ) {
            let jsxElems = [];
            for ( let elem of nextProps.elems ) {
                jsxElems.push( <Location key={ 'location-'+elem.id } elem={ elem } setMainState={ nextProps.setMainState } /> );
            } this.setState({ 'jsxLocations' : jsxElems });
        } else {
            this.setState({ 'jsxLocations' : null });
        }

        if(nextProps.category != null){
            let jsxCategoryList = [];
            console.log(nextProps.category);
            if(nextProps.category.category_parent == 0){
                jsxCategoryList.push(<CategoryFilterButton category={nextProps.category} name='Alle' />);

                /*for(let cat of nextProps.category.children){
                    jsxCategoryList.push(<CategoryFilterButton category={cat} name={cat.category_name} />);
                }*/
            }
            this.setState({ 'jsxCategoryList' : jsxCategoryList });
        }

        else this.setState({ 'jsxCategoryList' : null });
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
                        { this.state.jsxCategoryList != null &&
                        <Railbar name="sub-cat-bar" >
                            {this.state.jsxCategoryList}
                        </Railbar> }
                        { this.state.jsxLocations != null &&
                        <div className="location-list" >
                            { this.state.jsxLocations != null && this.state.jsxLocations }
                            { this.state.jsxLocations == null && <Loader /> }
                        </div>}
                    </div>
                </div>
            </section>
        );
    }

} module.exports = LocationListView;
