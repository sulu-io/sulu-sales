define(["text!sulusalescore/components/item-table/item.form.html","text!sulusalescore/components/item-table/item.row.html","text!sulusalescore/components/item-table/item.row-head.html","text!sulusalescore/components/item-table/item.overlay.html"],function(a,b,c,d){"use strict";var e={data:[],isEditable:!0,columns:["name","number","settings","quantity","quantityUnit","price","discount","totalPrice"],hasNestedItems:!1,defaultData:{},columnCallbacks:{},rowCallback:null,showSettings:!1},f={formId:"#item-table-form",listClass:".item-table-list",formSelector:".item-table-list-form",productSearchClass:".product-search",rowIdPrefix:"item-table-row-",productsUrl:"/admin/api/products?flat=true&searchFields=number,name&fields=id,name,number",productUrl:"/admin/api/products/",rowClass:".item-table-row",quantityRowClass:".item-quantity",quantityInput:".item-quantity input",priceRowClass:".item-price",priceInput:".item-price input",discountRowClass:".item-discount",discountInput:".item-discount input",globalPriceTableClass:".global-price-table",overallEmptyString:"-",loaderSelector:".item-table-loader",loaderClass:"item-table-loader"},g={rowClass:null,id:null,rowNumber:null,address:null,addressObject:null,description:null,rowId:"",name:"",number:"",quantity:"",quantityUnit:"pc",price:"",discount:null,overallPrice:"",currency:"EUR",useProductsPrice:!1,tax:0,supplierName:""},h={priceRow:function(a,b){return["<tr>","   <td>",a,"   </td>","   <td>",b,"   </td>","</tr>"].join("")}},i="sulu.item-table.",j=function(){return i+"changed"},k=function(){return m.call(this,"set-default-data")},l=function(){return m.call(this,"change-currency")},m=function(a){return i+this.options.instanceName+"."+a},n=function(){return{rowClass:"header",name:this.sandbox.translate("salescore.item.product"),number:this.sandbox.translate("salescore.item.number"),address:this.sandbox.translate("address.delivery"),description:this.sandbox.translate("salescore.item.description"),quantity:this.sandbox.translate("salescore.item.quantity"),quantityUnit:this.sandbox.translate("salescore.item.unit"),price:this.sandbox.translate("salescore.item.price"),discount:this.sandbox.translate("salescore.item.discount"),overallPrice:this.sandbox.translate("salescore.item.overall-value")}},o=function(){this.sandbox.on(k.call(this),w.bind(this)),this.sandbox.on(l.call(this),q.bind(this))},p=function(){this.sandbox.dom.on(this.$el,"click",P.bind(this),".add-row"),this.sandbox.dom.on(this.$el,"click",M.bind(this),".remove-row"),this.sandbox.dom.on(this.$el,"click",x.bind(this),".item-table-row"),this.sandbox.dom.on(this.$el,"click",y.bind(this),".item-table-row td"),this.sandbox.dom.on(this.$el,"data-changed",function(a){var b=a.items||[];X.call(this,b)}.bind(this)),this.sandbox.dom.on(this.$el,"change",z.bind(this),f.quantityInput),this.sandbox.dom.on(this.$el,"change",A.bind(this),f.priceInput),this.sandbox.dom.on(this.$el,"change",B.bind(this),f.discountInput)},q=function(a){var b,c,d=new this.sandbox.data.deferred;g.currency=a,b=v.call(this,this.items),b&&b.length>0&&(t.call(this,d),c=r.call(this,b),this.sandbox.when(d,c).then(function(a){s.call(this),this.sandbox.logger.log(a)}.bind(this)).fail(function(a,b,c){this.sandbox.logger.error(a,b,c)}.bind(this))),this.sandbox.logger.log(a)},r=function(a){var b="/admin/api/products?ids="+a.join(",");return this.sandbox.util.load(b)},s=function(){this.sandbox.stop(this.$loader),this.sandbox.dom.show(this.$list)},t=function(a){u.call(this),this.sandbox.start([{name:"loader@husky",options:{el:this.$loader,size:"40px",hidden:!1}}]).done(function(){a.resolve()}.bind(this))},u=function(){var a=this.sandbox.dom.height(this.$el);this.$loader=this.sandbox.dom.createElement('<div style="display:hidden" class="grid-row '+f.loaderClass+'"></div>'),this.$list=this.sandbox.dom.find(f.formSelector,this.$el),this.sandbox.dom.append(this.$el,this.$loader),this.sandbox.dom.height(this.$loader,a),this.sandbox.dom.hide(this.$list),this.sandbox.dom.show(this.$loader)},v=function(a){var b,c=[];for(b in a)a[b].hasOwnProperty("id")&&c.push(a[b].id);return c},w=function(a,b){this.options.defaultData[a]=b},x=function(a){if("INPUT"!==a.target.tagName.toUpperCase()&&"A"!==a.target.tagName.toUpperCase()){var b=this.sandbox.dom.data(a.currentTarget,"id");this.options.rowCallback&&this.options.rowCallback.call(this,b,this.items[b]),(this.options.showSettings===!0||"true"===this.options.showSettings)&&$.call(this,this.items[b])}},y=function(a){var b=this.sandbox.dom.data(a.currentTarget,"name"),c=this.sandbox.dom.data(this.sandbox.dom.parent(),"id");b&&this.options.columnCallbacks.hasOwnProperty(b)&&this.options.columnCallbacks[b].call(this,a.currentTarget,c)},z=function(a){var b=C.call(this,a).id;this.items[b].quantity=this.sandbox.parseFloat(this.sandbox.dom.val(a.target)),ab.call(this),D.call(this,b),E.call(this),this.sandbox.emit(j.call(this))},A=function(a){var b=C.call(this,a).id;this.items[b].price=this.sandbox.parseFloat(this.sandbox.dom.val(a.target)),ab.call(this),D.call(this,b),E.call(this),this.sandbox.emit(j.call(this))},B=function(a){var b=C.call(this,a).id;this.items[b].discount=this.sandbox.parseFloat(this.sandbox.dom.val(a.target)),ab.call(this),D.call(this,b),E.call(this),this.sandbox.emit(j.call(this))},C=function(a){var b=this.sandbox.dom.closest(a.target,".item-table-row"),c=this.sandbox.dom.attr(b,"id");return{row:b,id:c}},D=function(a){var b=this.$find("#"+a),c=this.items[a],d=this.sandbox.dom.find(".item-overall-price span",b);this.sandbox.dom.html(d,G.call(this,c))},E=function(){var a,b,c,d,e,g={},h=0,i=0;for(var j in this.items)b=this.items[j],c=parseFloat(I.call(this,b)),d=0,b.tax&&b.tax>0&&b.tax<=100&&(a=parseFloat(b.tax),d=c/100*a,g[a]=g[a]?g[a]+d:d),h+=c,i+=c+d;if(e=this.$find(f.globalPriceTableClass),this.sandbox.dom.html(e,""),Object.keys(this.items).length>0){F.call(this,e,this.sandbox.translate("salescore.item.net-price"),H.call(this,h));for(var j in g)F.call(this,e,this.sandbox.translate("salescore.item.vat")+".("+j+"%)",H.call(this,g[j]));F.call(this,e,this.sandbox.translate("salescore.item.overall-price"),H.call(this,i))}},F=function(a,b,c){var d=this.sandbox.dom.createElement(h.priceRow.call(this,b,c));this.sandbox.dom.append(a,d)},G=function(a,b){return H.call(this,I.call(this,a,b),J.call(this,a))},H=function(a,b){return b=b?b:g.currency,this.sandbox.numberFormat(a,"n")+" "+b},I=function(a,b){var c=0;return b&&"default"!==b||a.price&&a.quantity&&(c=a.price*a.quantity,a.discount&&a.discount>0&&a.discount<=100&&(c-=c/100*a.discount)),c},J=function(a){return a.currency?a.currency:g.currency},K=function(a,b){var c=this.sandbox.dom.closest(b.currentTarget,f.rowClass),d=this.sandbox.dom.attr(c,"id"),e={};this.sandbox.start([{name:"loader@husky",options:{el:this.sandbox.dom.find(f.productSearchClass,c),size:"15px"}}]),this.sandbox.util.load(f.productUrl+a.id).then(function(a){e=Z.call(this,a),T.call(this,d,e)}.bind(this)).fail(function(a,b,c){this.sandbox.logger.warn(a,b,c)}.bind(this))},L=function(a){this.sandbox.start([{name:"auto-complete@husky",options:{el:this.sandbox.dom.find(f.productSearchClass,a),remoteUrl:f.productsUrl,resultKey:"products",getParameter:"search",value:"",instanceName:"products",valueKey:"name",noNewValues:!0,selectCallback:K.bind(this)}}])},M=function(a){a.preventDefault(),a.stopPropagation();var b=this.sandbox.dom.closest(a.currentTarget,".item-table-row"),c=this.sandbox.dom.attr(b,"id");Q.call(this,c,b)},N=function(a){delete this.items[a],ab.call(this)},O=function(a,b){this.items[a]=b,ab.call(this)},P=function(a){a.preventDefault(),W.call(this)},Q=function(a,b){this.sandbox.dom.remove(b),N.call(this,a),V.call(this,b),E.call(this),this.sandbox.emit(j.call(this))},R=function(a,c){c!==!1&&this.rowCount++;var d,e,h=this.sandbox.util.extend({},g,this.options.defaultData,a,{isEditable:this.options.isEditable,columns:this.options.columns,rowId:f.rowIdPrefix+this.rowCount,rowNumber:this.rowCount});return h.address&&"object"==typeof h.address&&(h.addressObject=h.address,h.address=this.sandbox.sulu.createAddressString(h.address)),h.overallPrice=this.sandbox.numberFormat(G.call(this,h)),h.discount=this.sandbox.numberFormat(h.discount,"n"),h.price=this.sandbox.numberFormat(h.price,"n"),h.quantity=this.sandbox.numberFormat(h.quantity,"n"),d=this.sandbox.util.template(b,h),e=this.sandbox.dom.createElement(d)},S=function(a){var b,c;return this.options.hasNestedItems&&(c=a,a=this.sandbox.util.extend({},a.item,c),delete a.item),b=R.call(this,a),this.sandbox.dom.append(this.$find(f.listClass),b),b},T=function(a,b){var c=R.call(this,b,!1);return this.sandbox.dom.replaceWith(this.$find("#"+a),c),O.call(this,a,b),U.call(this,c),this.sandbox.emit(j.call(this)),c},U=function(a){this.options.columns.indexOf("quantity")>0&&this.sandbox.form.addField(f.formId,this.sandbox.dom.find(f.quantityInput,a)),this.options.columns.indexOf("price")>0&&this.sandbox.form.addField(f.formId,this.sandbox.dom.find(f.priceInput,a)),this.options.columns.indexOf("discount")>0&&this.sandbox.form.addField(f.formId,this.sandbox.dom.find(f.discountInput,a))},V=function(a){this.options.columns.indexOf("quantity")>0&&this.sandbox.form.removeField(f.formId,this.sandbox.dom.find(f.quantityInput,a)),this.options.columns.indexOf("price")>0&&this.sandbox.form.removeField(f.formId,this.sandbox.dom.find(f.priceInput,a)),this.options.columns.indexOf("discount")>0&&this.sandbox.form.removeField(f.formId,this.sandbox.dom.find(f.discountInput,a))},W=function(){var a,b={rowClass:"new"};a=S.call(this,b),L.call(this,a)},X=function(a){this.items={},this.sandbox.dom.empty(this.$find(f.listClass)),Y.call(this,a)},Y=function(a){var b,c,d,e,f;for(b=-1,c=a.length;++b<c;)d=a[b],e=S.call(this,a[b]),f=this.sandbox.dom.attr(e,"id"),this.items[f]=d;ab.call(this)},Z=function(a){var b=this.sandbox.util.extend({},g,this.options.defaultData,{name:a.name,number:a.number,description:a.shortDescription,product:a,quantityUnit:a.orderUnit?a.orderUnit.name:""});return a.prices&&a.prices.length>0&&(b.price=a.prices[0].price),a.supplierName&&(b.supplierName=a.supplierName),b},$=function(a){var b,c;a=this.sandbox.util.extend({columns:[]},a),this.sandbox.stop(this.sandbox.dom.find(f.overlayClassSelector,this.$el)),this.sandbox.dom.remove(this.sandbox.dom.find(f.overlayClassSelector,this.$el)),c=this.sandbox.util.template(d,a),b=this.sandbox.dom.createElement('<div class="'+f.overlayClass+'"></div>'),this.sandbox.dom.append(this.$el,b),this.sandbox.start([{name:"overlay@husky",options:{el:b,title:this.sandbox.translate("test 123"),openOnStart:!0,removeOnClose:!1,skin:"wide",data:c,okCallback:function(){}.bind(this)}}])},_=function(){var a=this.sandbox.util.extend({},g,this.options,{header:n.call(this)}),b=this.sandbox.util.template(c,a);this.sandbox.dom.append(this.$find(f.listClass),b)},ab=function(){this.sandbox.dom.data(this.$el,"items",this.getItems())},bb=function(){this.sandbox.form.create(f.formId)};return{initialize:function(){this.options=this.sandbox.util.extend({},e,this.options),this.items={},this.rowCount=0,this.table=null,this.isEmpty=this.items.length;var a=this.sandbox.dom.data(this.$el,"items");0===this.options.data.length&&a&&a.length>0&&(this.options.data=a),this.render(),o.call(this),p.call(this)},render:function(){var b=this.sandbox.util.extend({},{addText:this.sandbox.translate("salescore.item.add"),isEditable:this.options.isEditable,columns:this.options.columns});this.table=this.sandbox.util.template(a,b),this.html(this.table),_.call(this),Y.call(this,this.options.data),bb.call(this),E.call(this)},getItems:function(){var a,b=[];for(a in this.items)b.push(this.items[a]);return b}}});