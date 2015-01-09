define(["app-config","sulusalesorder/util/sidebar","sulusalesorder/util/orderStatus"],function(a,b,c){"use strict";var d=function(){this.sandbox.on("sulu.list-toolbar.delete",function(){this.sandbox.emit("husky.datagrid.items.get-selected",function(a){this.sandbox.emit("sulu.salesshipping.shipping.delete",a)}.bind(this))},this),this.sandbox.on("sulu.list-toolbar.add",function(){this.sandbox.emit("sulu.salesshipping.shipping.new",this.orderId)},this),this.sandbox.on("sulu.header.back",function(){this.sandbox.emit("sulu.salesshipping.orders.list")},this)},e=function(){return[{id:"add",icon:"plus-circle","class":"highlight-white",disabled:this.options.data.status.id<c.CONFIRMED,position:1,title:this.sandbox.translate("sulu.list-toolbar.add"),callback:function(){this.sandbox.emit("sulu.list-toolbar.add")}.bind(this)},{id:"delete",icon:"trash-o",position:2,title:this.sandbox.translate("sulu.list-toolbar.delete"),callback:function(){this.sandbox.emit("sulu.list-toolbar.delete")}.bind(this)},{id:"settings",icon:"gear",items:[{type:"columnOptions"}]}]};return{view:!0,layout:{sidebar:{width:"fixed",cssClasses:"sidebar-padding-50"}},templates:["/admin/shipping/template/shipping/list"],initialize:function(){this.orderId=null,this.render(),d.call(this),b.initForDetail(this.sandbox,this.options.data)},render:function(){this.orderId=this.options.data.id,this.sandbox.dom.html(this.$el,this.renderTemplate("/admin/shipping/template/shipping/list")),this.sandbox.sulu.initListToolbarAndList.call(this,"orderShippingFields","/admin/api/shippings/fields?context=order",{el:this.$find("#list-toolbar-container"),instanceName:"shippings",inHeader:!0,template:e.call(this)},{el:this.sandbox.dom.find("#shippings-list",this.$el),url:"/admin/api/shippings?flat=true&orderId="+this.orderId,searchInstanceName:"shippings",searchFields:["fullName"],resultKey:"shippings",viewOptions:{table:{icons:[{icon:"pencil",column:"number",align:"left",callback:function(a){this.sandbox.emit("sulu.salesshipping.shipping.load",a,this.orderId)}.bind(this)}],highlightSelected:!0,fullWidth:!1}}})}}});