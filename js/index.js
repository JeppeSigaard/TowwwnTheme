// @koala-prepend 'modules/tools/fb.js';
// @koala-prepend 'modules/tools/help_functions.js';
// @koala-prepend 'modules/tools/month_picker.js';
// @koala-prepend 'modules/contentLayer/eventContent.js';
// @koala-prepend 'modules/contentLayer/locationContent.js';
// @koala-prepend 'modules/contentLayer/locationCategoryContent.js';
// @koala-prepend 'modules/contentLayer/userContent.js';
// @koala-prepend 'modules/view_handler.js';
// @koala-prepend 'modules/layoutLayer/headerLayout.js';
// @koala-prepend 'modules/layoutLayer/frontpageLayout.js';
// @koala-prepend 'modules/layoutLayer/eventCalenderLayout.js';
// @koala-prepend 'modules/layoutLayer/eventSingleLayout.js';
// @koala-prepend 'modules/search.js';

$(function() {
    $('a').click(function(e) {
        if ($(this).attr('href') === '#') {
            e.preventDefault();
        }
    });
    
    FacebookModule.init();
    
    HeaderModule.init();
    EventContentModule.init(function() {
        onContentLoad();
    });
    
    var onContentLoad = function() {
        FrontPageModule.init();
        SearchModule.init();
        ViewHandler.init();
        EventSingleModule.init();
        //ViewHandler.poly_view_init();
    }
});