<<<<<<< HEAD
var EventContentModule={settings:{cb:function(){},ready:!1,get_url:rest_api+"events?per_page=100&page=",page_counter:1,default_appendSelector:".eventscontainer",events:[],placeholder_img:"https://developer.walgreens.com/sites/default/files/404.jpg"},init:function(t){this.settings.cb=t,this.get_events()},get_events:function(){var t=new XMLHttpRequest;t.onload=function(t){for(var e=$.parseJSON(t.target.response),s=0;s<e.length;s++)"undefined"!==e[s].imgurl[0]&&null!==e[s].imgurl[0]||(e[s].imgurl[0]=this.settings.placeholder_img),this.settings.events.push(e[s]);return e.length<1?(this.render_ready=!0,this.settings.page_counter=0,this.settings.events.sort(function(t,e){return t.start_time[0]<e.start_time[0]?-1:t.start_time[0]>e.start_time[0]?1:0}),void this.settings.cb()):(this.settings.page_counter++,void this.get_events())}.bind(this),t.open("GET",this.settings.get_url+this.settings.page_counter.toString()),t.send()}};
=======
var EventContentModule={settings:{cb:function(){},ready:!1,get_url:rest_api+"events?per_page=100&page=",page_counter:1,default_appendSelector:".eventscontainer",events:[],placeholder_img:"https://developer.walgreens.com/sites/default/files/404.jpg"},init:function(t){this.settings.cb=t,this.get_events()},get_events:function(){var t=new XMLHttpRequest;t.onload=function(t){for(var e=$.parseJSON(t.target.response),s=0;s<e.length;s++)"undefined"!==e[s].imgurl[0]&&null!==e[s].imgurl[0]||(e[s].imgurl[0]=this.settings.placeholder_img),this.settings.events.push(e[s]);return e.length<1?(this.render_ready=!0,this.settings.page_counter=0,this.settings.events.sort(function(t,e){return t.start_time[0]<e.start_time[0]?-1:t.start_time[0]>e.start_time[0]?1:0}),void this.settings.cb()):(this.settings.page_counter++,void this.get_events())}.bind(this),t.open("GET",this.settings.get_url+this.settings.page_counter.toString()),t.send()}};
>>>>>>> origin/master
