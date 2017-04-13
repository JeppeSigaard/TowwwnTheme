
var ViewControllerModule = {

    // Fields
    settings: {
        ready: false,
        bbActive: false,
        backButton: '.event-bar .close-button',
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
    },

    // Bind UI Actions
    bindUIActions: function() {
        $(document).on( 'click', '.event', function() {
            this.activeBackButton();
        }.bind(this));

        $(window).on('resize', this.update.bind(this));
        $(document).on( 'click', this.settings.backButton, function() {
            ViewHandler.closeSingleView();
            history.pushState({ type : 'home', id : null }, event.name + ' · Towwwn', main_path + '/');
        }.bind(this));
    },

    // Activate back button
    activeBackButton: function() {
    },

    // Disable back button
    disableBackButton: function() {
    }

};
