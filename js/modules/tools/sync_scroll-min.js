var syncScroll={settings:{canFixedScroll:!0,container:null,elem:null,inner:null,containerHeight:0,highestElem:null,lastScrollTop:0,ready:!1},init:function(s,n,t){syncScroll.wrapElems(s,n,function(){syncScroll.rescaleContainer(),syncScroll.bindUIActions(s,n,t)})},bindUIActions:function(s,n,t){this.ready=!0,$(window).on("scroll",function(){syncScroll.settings.canFixedScroll&&syncScroll.onScroll()}),$(window).on("resize",function(){syncScroll.settings.canFixedScroll&&(syncScroll.rescaleContainer(),syncScroll.setHorizontalPosition())})},wrapElems:function(s,n,t){syncScroll.settings.container=s,syncScroll.settings.elem=$(".sync-outer"),syncScroll.settings.inner=$(".sync-outer .sync-inner"),"function"==typeof t&&t()},setHorizontalPosition:function(){null!==syncScroll.settings.elem&&syncScroll.settings.elem.each(function(){$(this).hasClass("fixed")?$(this).css({left:$(this).parent().offset().left,width:$(this).parent().width()}):$(this).removeAttr("style")})},isInView:function(s){return s.offset().left>=0&&s.offset().left<$(window).innerWidth()},rescaleContainer:function(s){if(null!==syncScroll.settings.container){var n=$(".high").length?$(".high").innerHeight():0;$(".sync-outer.high").removeClass("high"),syncScroll.settings.containerHeight=0;var t=null;$(".sync-outer .sync-inner").each(function(){var s=$(this);s.innerHeight()>syncScroll.settings.containerHeight&&syncScroll.isInView(s)&&(syncScroll.settings.containerHeight=s.innerHeight(),t=s)}),syncScroll.settings.container.css("height",syncScroll.settings.containerHeight),t.parent(".sync-outer").removeClass("fixed absolute top").addClass("high")}"function"==typeof s&&s()},topAlign:function(s){if(s.find(".sync-inner").innerHeight()>=syncScroll.settings.containerHeight)$(window).scrollTop(syncScroll.settings.container.offset().top);else if(syncScroll.settings.canFixedScroll){syncScroll.settings.canFixedScroll=!1;var n=$(window).scrollTop(),t=syncScroll.settings.containerHeight,o=s.find(".inner").innerHeight(),e=Math.floor(t-(n+o));e<0&&(syncScroll.settings.elem.addClass("fixed").removeClass("bottom"),syncScroll.setHorizontalPosition(),$(window).scrollTop(n+e)),s.find(".sync-outer").scrollTop("0"),syncScroll.settings.lastScrollTop=n,syncScroll.settings.canFixedScroll=!0}},onScroll:function(){if(this.ready){syncScroll.settings.elem.each(function(){$(this).hasClass("high")&&$(this).removeClass("fixed top bottom")});var s=syncScroll.settings.container,n=$(window).scrollTop(),t=n-syncScroll.settings.lastScrollTop;syncScroll.settings.container.offset().top>=$(window).scrollTop()+60?syncScroll.settings.elem.each(function(){$(this).hasClass("high")||$(this).hasClass("top")||$(this).addClass("top").removeClass("bottom fixed").removeAttr("style").hide().show()}):s.offset().top+s.innerHeight()<=$(window).scrollTop()+$(window).innerHeight()?syncScroll.settings.elem.each(function(){$(this).hasClass("high")||$(this).hasClass("bottom")||$(this).addClass("bottom").removeClass("top fixed").removeAttr("style").hide().show()}):(syncScroll.settings.elem.each(function(){var s=$(this).scrollTop()+t;$(this).hasClass("high")||($(this).hasClass("bottom")?($(this).addClass("fixed").removeClass("bottom"),$(this).scrollTop(5e16)):$(this).hasClass("top")?($(this).addClass("fixed").removeClass("top"),$(this).scrollTop("0")):($(this).hasClass("fixed")||$(this).addClass("fixed").hide().show(),$(this).scrollTop(s)))}),syncScroll.setHorizontalPosition()),syncScroll.settings.lastScrollTop=n}},lockView:function(){$("body").addClass("no-scroll").css({height:"100%",overflow:"hidden"}),null!==syncScroll.settings.container&&syncScroll.settings.container.css({height:$(window).innerHeight-syncScroll.settings.container.offset().top,overflow:"hidden"}),syncScroll.settings.canFixedScroll=!1,$(".sync-outer").each(function(){var s=$(this).scrollTop();$(this).removeAttr("style").css({position:"absolute",width:"100%",top:$(this).offset().top-$(this).parent().offset().top-s,left:"0"})})},releaseView:function(){syncScroll.settings.canFixedScroll=!0,$(".sync-outer").removeAttr("style"),$("body").removeClass("no-scroll").removeAttr("style"),syncScroll.setHorizontalPosition();var s=$(document).innerHeight();syncScroll.rescaleContainer(),s-=$(document).innerHeight()}};