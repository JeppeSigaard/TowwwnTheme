var CookieHandler = {
    settings : {},

    bindUIActions : function(){

        // Cookie accept
        $(document).on('click','.cookie-accept',function(e){
            this.set('cookieok', 'ok', 365);
            $('.cookie-ok').remove();
        }.bind(this));

    },

    init : function(){
        if(!this.get('cookieok') && !$('.cookie-ok').length){
            this.generateOK();
        }

        this.bindUIActions();
    },

    // Get a cookie by its key
    get : function(key){
        var keyValue = document.cookie.match('(^|;) ?'+key+'=([^;]*)(;|$)');
            return keyValue ? keyValue[2] : false;
    },

    // Set a cookie
    set : function(key,value,expiresDays,cb){
        var expires = new Date();
        expires.setTime(expires.getTime() + (expiresDays * 24 * 60 * 60 * 1000));
        document.cookie = key + '='+ value +';expires=' + expires.toUTCString() + ';path=/;';

    },

    // Generates a cookie policy consent box
    generateOK : function(){
        var html = '<div class="cookie-ok">';
        html += '<span class="cookie-ok-text">Cookie OK?</span>';
        html += '<a href="#" class="cookie-ok-button cookie-accept">OK</a>';
        html += '<a href="'+ main_path +'/cookie-politik/" class="cookie-ok-button cookie-more">Mere</a>';
        html += '</div>';

        $('body').append(html);
    },

}; module.exports = CookieHandler;
