// @koala-prepend 'modules/tools/help_functions.js';
// @koala-prepend 'modules/tools/month_picker.js';
// @koala-prepend 'modules/tools/sync_scroll.js';
// @koala-prepend 'modules/contentLayer/eventContent.js';
// @koala-prepend 'modules/contentLayer/locationContent.js';
// @koala-prepend 'modules/contentLayer/locationCategoryContent.js';
// @koala-prepend 'modules/view_handler.js';
// @koala-prepend 'modules/layoutLayer/headerLayout.js';
// @koala-prepend 'modules/layoutLayer/frontpageLayout.js';
// @koala-prepend 'modules/layoutLayer/eventCalenderLayout.js';
// @koala-prepend 'modules/layoutLayer/eventSingleLayout.js';
// @koala-prepend 'modules/layoutLayer/viewController.js';
// @koala-prepend 'modules/search.js';

$(function() {
    $('a').click(function(e) {
        if ($(this).attr('href') === '#') {
            e.preventDefault();
        }
    });

    HeaderModule.init();
    ViewHandler.init();
    ViewHandler.poly_view_init();
    ViewControllerModule.init();

    EventContentModule.init(function() {
        onContentLoad();
    });

    var onContentLoad = function() {
        FrontPageModule.init();
<<<<<<< HEAD
=======
        ViewHandler.init();
>>>>>>> origin/no-sync-scroll
        SearchModule.init();
        EventSingleModule.init();
        syncScroll.init($('#page-content'), '.container-section');
    }
});
