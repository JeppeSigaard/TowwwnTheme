

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

        if(nextProps.category != null && nextProps.category.category_parent != null){
            let jsxCategoryList = [];

            const getID = (nextProps.category.category_parent == 0 ) ? nextProps.category.category_id : nextProps.category.category_parent ;


            Globals.categoryDataHandler.getCategory( getID ).then(( resp ) => {

                if(resp.children.length == 0){this.setState({ 'jsxCategoryList' : null, 'jsxCategoryListHead' : getID }); return;}

                jsxCategoryList.push(<CategoryFilterButton
                    active={ resp.category_id == nextProps.category.category_id}
                    count={resp.category_count}
                    key={'filter-button-' + resp.category_id}
                    elem={resp}
                    name='Alle'
                />);

                if(resp.children != null){
                    for(let cat of resp.children){
                        jsxCategoryList.push(<CategoryFilterButton
                            active={ cat.category_id == nextProps.category.category_id}
                            count={cat.category_count}
                            key={'filter-button-' + cat.category_id}
                            elem={cat}
                            name={cat.category_name}
                        />);
                    }
                }

                this.setState({ 'jsxCategoryList' : jsxCategoryList, 'jsxCategoryListHead' : getID });

            });

        }

        else this.setState({ 'jsxCategoryList' : null, 'jsxCategoryListHead' : null });

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
