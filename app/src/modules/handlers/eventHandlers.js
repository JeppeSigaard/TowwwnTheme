

// Event Handler
class ExtraEventHandlers {
    
    // Ctor
    constructor() {
        window.addEventListener( 'scroll', this.onScroll.bind(this) );
        document.getElementById( 'menu-show-btns' ).addEventListener( 'click', this.handleShowBtnClick.bind(this) );
    }
    
    // On Scroll
    onScroll() {
        
        /* -------------------------------------------- */
        // HEADER STUFF START
        
        let header = document.getElementById( 'header' ),
            bp = header.clientHeight + header.offsetTop;
        
        if ( window.pageYOffset >= bp ) {
            
            let headerContainer = document.getElementById( 'site-header' );
            document.getElementById( 'menu-show-btns' ).classList.add('show');
            document.getElementById( 'menu-show-btns' ).classList.remove('active');
            headerContainer.classList.add('fixed');
            headerContainer.classList.remove('active');

        } else {
            
            let headerContainer = document.getElementById( 'site-header' );
            document.getElementById( 'menu-show-btns' ).classList.remove( 'show' );
            document.getElementById( 'menu-show-btns' ).classList.remove( 'active' );
            headerContainer.classList.remove('fixed');
            headerContainer.classList.remove('active');
        }
        
        // HEADER STUFF END
        /* -------------------------------------------- */
        
    }
    
    // Handle show btn click
    handleShowBtnClick() {
        let showbtn = document.getElementById( 'menu-show-btns' ),
            headerContainers = document.getElementsByClassName( 'site-header' );
        if ( showbtn.classList.contains( 'active' ) ) {
            document.getElementById( 'menu-show-btns' ).classList.remove( 'active' );
            for ( let container of headerContainers ) {
                container.classList.remove('active');
            }
        } else {
            document.getElementById( 'menu-show-btns' ).classList.add( 'active' );
            for ( let container of headerContainers ) {
                container.classList.add('active');
            }
        }
    }
    
} module.exports = ExtraEventHandlers;
