

// Location Category view
const React = require( 'react' ),
      LazyLoadHandler = require( '../../modules/handlers/lazyLoadHandler.js' ),
      LocationCategory = require( '../components/locationCategory.js' ),
      SubCategories = require( '../components/subcategories.js' ),
      Loader = require( '../componentParts/loader.js' ),
      Header  = require( '../componentParts/sectionHeader.js' ),
      ScrollContainer  = require( '../componentParts/scrollContainer.js' ),
      Globals = require( '../globals.js' ),
      _ = require( '../../modules/libaries/underscore/underscore_main.js' ),
      _Array = require( '../../modules/libaries/underscore/underscore_array.js' );

class LocationCategoryView extends React.Component {

    // Ctor
    constructor() {
        super();
        this.state = { subCatHeight : '0px' };
        this.scrollBuffer = 0;
        this.lastScrollTop = 0;
    }



    onScroll(){
        let st = _('#location-category-view .scroll-container').get()[0].scrollTop;
        if (st !== 0 && (this.scrollBuffer > 10 && st > this.lastScrollTop && st > _('#location-category-view .section-header .viewbar').height())) {
            _('#location-category-view .section-header').addClass('collapse');
            this.scrollBuffer = 0;
        }
        else if(this.scrollBuffer > 10 || st == 0){
            _('#location-category-view .section-header').removeClass('collapse');
            this.scrollBuffer = 0;
        }
        else{this.scrollBuffer ++;}

        this.lastScrollTop = st;
    }

    // Handle category click
    handleCategoryClick( e ) {

        e.preventDefault();
        Globals.setMainState({
            'currentLocationsCategory' : this.props.elem,
            'currentLocations' : null,
        });

        Globals.history.push(this.props.elem);
        Globals.setMainState({ from : this.props.name });
        if ( _('body').hasClass('mobile') ) {
            Globals.viewHandler.changeMobileViewFocus(
                '#location-list-view',
                false, true
            );
        } else {
            Globals.viewHandler.changeViewFocus(
                '#location-list-view',
                '#location-category-view',
                false, true, false
            );
        }

        Globals.locationDataHandler.getCategorySpecificLocation( this.props.elem.category_id ).then(( resp ) => {
            Globals.setMainState({
                'currentLocations' : resp,
            });
        });

    }

    // Activate Sub Categories List
    toggleSubCategories() {
        let sc = _( '#location-category-view .scroll-container' );
        if ( sc !== false ) { sc = sc.get(0).scrollTop = 0; }
        let inner = document.getElementsByClassName( 'sub-category-inner' )[0];
        if ( this.state.subCatHeight !== '0px' ) this.setState({ 'subCatHeight' : '0px' });
        else this.setState({ 'subCatHeight' : inner.clientHeight + 'px' });
    }

    // Will receive props
    componentWillReceiveProps( nextProps ) {
        if ( nextProps.categories != null ) {
            let jsxCategories = [];
            for ( let category of nextProps.categories ) {
                jsxCategories.push( <LocationCategory key={ 'category-'+category['category_id'] } elem={ category } name={ nextProps.name } clickEvent={ this.handleCategoryClick } /> );
            } this.setState({ 'jsxCategories' : jsxCategories });
        }

        this.userHook.call(this);
    }

    // Component did mount
    componentDidMount() {
        this.userHook.call(this);
        //this.lazyLoad = new LazyLoadHandler( '#location-category-view .scroll-container' );
        //_( '#location-category-view .scroll-container' ).on( 'scroll', this.onScroll.bind(this) );
    }

    // User Hook
    userHook() {
        if ( this.hookedIntoUser == null && Globals.user != null ) {
            this.hookedIntoUser = true;

            Globals.user.hooks.add( 'onlogin', ( ) => {
                Globals.user.predictBehaviour().then(( data ) => {
                    let jsxCats = new _Array([ ]);
                    jsxCats.hooks.add( 'onpush', () => {
                        if ( jsxCats.data.length >= data.length )
                            this.setState({ suggestedCategories : jsxCats.data });
                    });

                    if ( data.length > 2 ) {
                        data.sort(( a, b ) => {
                            if ( a.output > b.output ) return -1;
                            if ( a.output < b.output ) return 1;
                            return 0;
                        }); data = [ data[0], data[1], data[2] ];
                    }

                    for ( let iter = 0; iter < data.length; iter++ ) {
                        Globals.categoryDataHandler.getCategory( data[ iter ].id ).then(( resp ) => {
                            jsxCats.push( <LocationCategory key={ 'predicted-category-'+data[ iter ].id } elem={ resp } name={ this.props.name } clickEvent={ this.handleCategoryClick } /> );

                            // Remove from jsxCategories if exists already
                            if(_('[data-id="'+data[ iter ].id+'"]')){
                                const elem = _('[data-id="'+data[ iter ].id+'"]').get()[0];
                                elem.parentNode.removeChild(elem);
                            }
                        });
                    }
                });
            });
        }
    }

    // Component did update
    componentDidUpdate() {
        if ( this.state.jsxCategories != null ) {
            if ( this.lazyLoad == null ) this.lazyLoad = new LazyLoadHandler( '#location-category-view .scroll-container' );
            this.lazyLoad.triggerload();
        }
    }

    // Render
    render() {
        return (
            <section className="container-section" id="location-category-view">
                    <Header in="#location-category-view" for=".scroll-container">
                        <div className="viewbar category-bar" onClick={ this.toggleSubCategories.bind(this) }>
                           <i className="viewbar-title-icon">
                                <svg viewBox="0 0 32 32">
                                    <use xlinkHref="#icon-location"></use>
                                </svg>
                           </i>
                            Steder
                            <div className="sub-categories-title" ></div>
                        </div>
                    </Header>
                <ScrollContainer>
                    <div className="content">
                        <SubCategories subCategories={ this.props.allCategories } outerHeight={ this.state.subCatHeight } clickEvent={ this.handleCategoryClick } />

                        <div className="category-container">
                            { this.state.suggestedCategories != null && this.state.suggestedCategories }
                            { this.state.jsxCategories != null && this.state.jsxCategories }
                            { this.state.suggestedCategories == null && this.state.jsxCategories == null && <Loader/> }
                        </div>
                    </div>
                </ScrollContainer>
            </section>
        );
    }

} module.exports = LocationCategoryView;
