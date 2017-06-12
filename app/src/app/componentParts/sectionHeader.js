// Category Filter button
const React = require( 'react' ),
       _ = require( '../../modules/libaries/underscore/underscore_main.js' );
class SectionHeader extends React.Component {

    // Ctor
    constructor() {
        super();

        // Collapse threshold
        this.collapse = 20;

        // Expand threshold
        this.expand = 10;

        this.scrollBuffer = 0;
        this.settingHeader = false;
        this.lastScrollTop = 0;
        this.state = {collapse : false};
    }

    handleScroll(){
        this.setHeader();
    }

    setHeader(collapse){

        if (this.settingHeader) return;
        if (this.props.for == null) return;
        if (this.props.in == null) return;
        if (this.props.children == null) return;

        this.settingHeader = true;

        let st = _(this.props.in + ' ' + this.props.for).get()[0].scrollTop;

        // Manual collapse
        if(collapse != null){
            this.setState({collapse : collapse});
            this.lastScrollTop = st;
            this.scrollBuffer = 0;
            this.settingHeader = false;
            return;
        }

        // Going down
        if (st > this.lastScrollTop) {

            if(this.scrollBuffer > this.collapse && st > 100){
                this.setState({collapse : true});
            }

            if (this.state.collapse) this.scrollBuffer = 0;
            else this.scrollBuffer += st - this.lastScrollTop;
        }

        // Going up
        else if(st < this.lastScrollTop) {

            if(this.scrollBuffer > this.expand || st < 20){
                this.setState({collapse : false});
            }

            if (!this.state.collapse) this.scrollBuffer = 0;
            else this.scrollBuffer += this.lastScrollTop - st;
        }

        this.lastScrollTop = st;
        this.settingHeader = false;
    }

    componentDidMount(){

        if (this.props.for == null) return;
        if (this.props.in == null) return;
        if (this.props.children == null) return;
        _(this.props.in +' '+ this.props.for).on('scroll', this.handleScroll.bind(this));
    }

    componentWillUnmount(){

        if (this.props.for == null) return;
        if (this.props.in == null) return;
        if (this.props.children == null) return;
        _(this.props.in +' '+ this.props.for).off('scroll', this.handleScroll);
    }

    componentWillReceiveProps(){
        if(this.props.collapse != null){
            this.setHeader(this.props.collapse);
        }
    }

    // Render
    render() {

        let className = 'section-header';
        if (this.state.collapse) className += ' collapse';


        return (
            <header className={className}>
                {this.props.children}
            </header>
        );
    }
} module.exports = SectionHeader;
