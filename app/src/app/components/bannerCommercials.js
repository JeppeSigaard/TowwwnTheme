

// Banner commercials
const React = require( 'react' ),
      CommercialDataHandler = require( '../../modules/handlers/dataHandlers/commercialDataHandler.js' ),
      BannerCommercial = require( '../componentParts/bannerCommercial.js' ),
      Globals = require( '../globals.js' );

class BannerCommercials extends React.Component {

    // Ctor
    constructor() {
        super();
        this.state = { };
        this.commercialDataHandler = new CommercialDataHandler();
    }

    // Component will mount
    componentWillReceiveProps( nextProps ) {
        this.commercialDataHandler.getCommercials().then( data => {
            let bannerCommercials = [];
            for ( let item of data ) {
                bannerCommercials.push( <BannerCommercial key={ 'commercial-'+item.id } elem={ item } /> )
            } this.setState({ bannercommercials : bannerCommercials });
        });
    }

    // Render
    render() {
        return this.state.bannercommercials != null && (
            <div className="bannerCommercials">{ this.state.bannercommercials }</div>
        );
    }

} module.exports = BannerCommercials;
