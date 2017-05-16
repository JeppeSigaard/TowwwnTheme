


// Search View
const React = require( 'react' ),
      Globals = require( '../globals.js' ),
      _ = require( '../../modules/libaries/underscore/underscore_main.js' ),

      // TMP
      SearchDataHandler = require( '../../modules/handlers/dataHandlers/searchDataHandler.js' );

class SearchView extends React.Component {

    // Ctor
    constructor() {
        super();
        this.state = {
            background : 'https://scontent-arn2-1.xx.fbcdn.net/v/t31.0-8/15235783_819639251509309_4689912872243390735_o.jpg?oh=b25910009f9397382b9f9e0891896f1d&oe=597D070E',
        };

        this.setCommercialImage();
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


    setCommercialImage(){

        // Opens new request
        let request = new XMLHttpRequest();
        request.addEventListener( 'load', ( resp ) => {
            let data = JSON.parse( resp.target.response );
            for (var r in data){
                if (data.hasOwnProperty(r) && data[r].commercial_tn_search != null){
                    this.setState({background : data[r].commercial_tn_search });
                    return;
                }
            }
        });

        request.open( 'GET', app_data.rest_api + '/commercials?orderby=rand&fields=commercial_tn_search' );
        request.send();
    }

    // Render
    render() {
        return (
            <section className="container-section" id="search-view">
                <div className="content" style={{ 'backgroundImage' : 'url(' + this.state.background }}>
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
