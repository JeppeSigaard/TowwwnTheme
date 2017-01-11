
var ViewControllerModule = {

    // Fields
    settings: {
        ready: false,
        bbActive: false,
        backButton: $('.back-button'),
        betaWarning: $('.beta-warning'),
        socialMedia: $('.socialmedia'),
        mobile: false,
    },

    // Init
    init: function() {
        this.update();
        this.bindUIActions();
        this.settings.ready = true;
    },

    // Update
    update: function() {
        if ( $(window).innerWidth() <= 640) {
            this.settings.mobile = true;
            this.settings.backButton.addClass('mobile');
        } else {
            this.settings.mobile = false;
            this.settings.backButton.removeClass('mobile');
        }
    },

    // Bind UI Actions
    bindUIActions: function() {
        $(document).on( 'click', '.event', function() {
            this.activeBackButton();
        }.bind(this));

        $(window).on('resize', this.update.bind(this));
        this.settings.backButton.on( 'click', function() {
            if ( this.settings.mobile ) {
                ViewHandler.go_to( 0 );
            } else {
                ViewHandler.closeSingleView();
            } this.disableBackButton();
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
