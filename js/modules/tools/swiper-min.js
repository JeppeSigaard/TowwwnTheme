jQuery.prototype.smamo_slider=function(n){var t=$(this).css({position:"relative",overflow:"hidden"}),e=t.children()[0].css({position:"absolute"}),o=e.children(),i=null,r=null,c=null,a=null,l=null,s=!1,u=1-("undefined"==typeof n.tolerance?.5:n.tolerance);$(".content-container").on("mousedown",function(n){$(".content-container-inner").addClass("notrans"),i=n.touches[0].pageX,r=n.touches[0].pageY,c=i-$(".content-container-inner").position().left,a=$(".content-container-inner").position().left,l=(new Date).getTime()});var d=!1,h=!0,f=0;$(".content-container").on("mousemove",function(n){if(null!==i&&null!==r){var t=i-n.pageX,e=r-n.pageY,o=Math.sqrt(t*t+e*e),c=Math.atan2(e,t);f=Math.cos(c),f<=u&&f>=-u&&o>30&&(h=!1),(f>u||f<-u||d)&&h?($(".content-container-inner").css({left:a-Math.abs(t)*f+"px"}),d=!0,s||(s=!0,syncScroll.lockView())):o>30&&(h=!1)}-$(".content-container-inner").position().left<0&&$(".content-container-inner").css({left:0}),-$(".content-container-inner").position().left+$(".content-container").innerWidth()>$(".content-container-inner").outerWidth()&&$(".content-container-inner").css({left:-($(".content-container-inner").outerWidth()-$(".content-container").innerWidth())+"px"}),$(window).trigger("resize")}),$(".content-container").on("touchend",function(n){d=!1,h=!0,i=null,r=null,a=null;for(var t=null,e=null,c=null,u=new Date,p=-$(".content-container-inner").position().left+$(".content-container").outerWidth()/2+2e4/(u.getTime()-l)*f,m=0;m<o.length;m++){var v=o[m].position().left+o[m].outerWidth()/2;(null===t||Math.abs(p-v)<t)&&(t=Math.abs(p-v),e=o[m],c=v)}$(".content-container-inner").addClass("transition"),$(".content-container-inner").css({left:-(c-$(".content-container").outerWidth()/2)+"px"}),setTimeout(function(){$(".content-container-inner").removeClass("transition"),s&&(s=!1,syncScroll.releaseView())},250),$(".content-container-inner").removeClass("notrans")})};