
var MobileLayoutModule = {

    // Fields
    settings: {
        ready: false,
        bbActive: false,
        backButton: $('.back-button'),
        betaWarning: $('.beta-warning'),
        socialMedia: $('.socialmedia'),
    },

    // Init
    init: function() {
        this.bindUIActions();
        this.settings.ready = true;
    },

    // Bind UI Actions
    bindUIActions: function() {
        $(document).on( 'click', '.event', function() {
            this.activeBackButton();
        }.bind(this));

        this.settings.backButton.on( 'click', function() {
            ViewHandler.go_to( 0 );
            this.disableBackButton();
        }.bind(this));
    },

    // Activate back button
    activeBackButton: function() {
        if ( !this.settings.bbActive ) {
            setTimeout(function() {
                this.settings.backButton.addClass('active');
            }.bind(this), 300);

            this.settings.betaWarning.removeClass('active');
            this.settings.socialMedia.removeClass('active');

            this.settings.bbActive = true;
        }
    },

    // Disable back button
    disableBackButton: function() {
        if ( this.settings.bbActive ) {
            this.settings.backButton.removeClass('active');

            setTimeout(function() {
                this.settings.betaWarning.addClass('active');
                this.settings.socialMedia.addClass('active');
            }.bind(this), 300);

            this.settings.bbActive = false;
        }
    }

};
