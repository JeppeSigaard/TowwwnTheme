


// Search View
const React = require( 'react' ),
      Globals = require( '../globals.js' ),
      _ = require( '../../modules/libaries/underscore/underscore_main.js' ),
      Railbar = require( '../componentParts/railbar.js' ),
      SponsorBanner = require( '../componentParts/SponsorBanner.js' ),
      LazyLoadHandler = require( '../../modules/handlers/lazyLoadHandler.js' ),

      // TMP
      SearchDataHandler = require( '../../modules/handlers/dataHandlers/searchDataHandler.js' );

class SearchView extends React.Component {

    // Ctor
    constructor() {
        super();

        this.state = {
            jsxCommercials : null
        };
    }

    // On key down
    onkeydown( e ) {
        if ( e.keyCode === 13 ) {
            this.submitSearch( e );
        }
    }

    submitSearch( e ){
        e.preventDefault();

        const keyword =  _( '#search-bar' ).get(0).value;
        if (null != keyword && keyword.length > 2){
            document.getElementById('search-bar').blur();

            Globals.setMainState({ searchResult: 'loading' });

            let search = new SearchDataHandler();
            search.getSearchResults( _( '#search-bar' ).get(0).value ).then(( resp ) => {
                Globals.setMainState({ searchResult: resp });
            });

            if(_('body').hasClass('mobile')){
                Globals.viewHandler.changeMobileViewFocus('#search-results-view', false, true);
            }

            else{
                Globals.viewHandler.changeViewFocus( '#search-view', '#search-results-view', true, false, false, true );
            }
        }
    }

    setBanners(){
        const commercialOptions = {
            for : 'search',
        };

        Globals.CommercialDataHandler.getCommercials(commercialOptions).then((resp) =>{
            if(resp.length < 1) return;

            let jsxCommercials = [];
            for(let item in resp){
                if(resp.hasOwnProperty(item)){
                    jsxCommercials.push(<SponsorBanner key={'search-banner-'+resp[item].id} item={resp[item]}></SponsorBanner>);
                }
            }

            this.setState({ jsxCommercials: jsxCommercials});
            this.lazyLoad.triggerload();
        });
    }

    componentDidMount(){
        this.lazyLoad = new LazyLoadHandler('#search-view');
        this.setBanners();
    }

    // Render
    render() {
        return (
            <section className="container-section" id="search-view">
                <div className="content">
                    {this.state.jsxCommercials !=null && this.state.jsxCommercials.length > 0 &&
                    <Railbar name="search-banners" sizes={{0:1}} snap dots>
                        {this.state.jsxCommercials}
                    </Railbar>}
                    <form action="/" method="get" className="search-bar-container" onSubmit={ this.submitSearch.bind(this) }>
                        <input name="s" type="text" id="search-bar" onKeyDown={ this.onkeydown.bind(this) } placeholder="Søg"></input>
                        <input name="submit" type="submit" id="search-submit" value="søg"/>
                        <svg className="search-icon" viewBox="0 0 32 32">
                            <use xlinkHref="#icon-search"></use>
                        </svg>
                    </form>
                </div>
            </section>
        );
    }

} module.exports = SearchView;
