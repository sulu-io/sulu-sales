define(["text!sulusalescore/components/item-table/item.form.html","text!sulusalescore/components/item-table/item.row.html","text!sulusalescore/components/item-table/item.row-head.html","text!sulusalescore/components/item-table/item.overlay.html","config","suluproduct/components/price-calculation-util"],function(a,b,c,d,e,f){"use strict";var g={urlFilter:{},formId:"item-table-form",data:[],isEditable:!0,columns:["name","number","settings","quantity","quantityUnit","price","discount","totalPrice"],hasNestedItems:!1,defaultData:{},columnCallbacks:{},rowCallback:null,settings:!1},h={products:"/admin/api/products{?filter*}",productsFlat:"/admin/api/products?flat=true&searchFields=number,name&fields=id,name,number{&filter*}",product:"/admin/api/products/"},i={listClass:".item-table-list",formSelector:".item-table-list-form",productSearchClass:".product-search",rowIdPrefix:"item-table-row-",rowClass:".item-table-row",quantityRowClass:".item-quantity",quantityInput:".item-quantity input",priceRowClass:".item-price",priceInput:".item-price input",discountRowClass:".item-discount",discountInput:".item-discount input",globalPriceTableClass:".global-price-table",overallEmptyString:"-",loaderSelector:".item-table-loader",loaderClass:"item-table-loader",overlayClassSelector:".settings-overlay",autocompleteLimit:20},j={rowClass:null,id:null,rowNumber:null,address:null,addressObject:null,description:"",rowId:"",name:"",number:"",quantity:"",quantityUnit:"",price:"",discount:null,overallPrice:"",currency:"EUR",useProductsPrice:!1,tax:0,supplierName:""},k={priceRow:function(a,b){return["<tr>","   <td>",a,"   </td>","   <td>",b,"   </td>","</tr>"].join("")},loader:function(a){return'<div style="display:hidden" class="grid-row '+a+'"></div>'}},l="sulu.item-table.",m=function(){return r.call(this,"initialized")},n=function(){return l+"changed"},o=function(){return r.call(this,"set-default-data")},p=function(){return r.call(this,"change-currency")},q=function(){return r.call(this,"set-addresses")},r=function(a){return l+this.options.instanceName+"."+a},s=function(){return{rowClass:"header",name:this.sandbox.translate("salescore.item.product"),number:this.sandbox.translate("salescore.item.number"),address:this.sandbox.translate("address.delivery"),description:this.sandbox.translate("salescore.item.description"),quantity:this.sandbox.translate("salescore.item.quantity"),quantityUnit:this.sandbox.translate("salescore.item.unit"),price:this.sandbox.translate("salescore.item.price"),discount:this.sandbox.translate("salescore.item.discount"),overallPrice:this.sandbox.translate("salescore.item.overall-value")}},t=function(){this.sandbox.on(o.call(this),E.bind(this)),this.sandbox.on(p.call(this),w.bind(this)),this.sandbox.on(q.call(this),v.bind(this))},u=function(){this.sandbox.dom.on(this.$el,"click",W.bind(this),".add-row"),this.sandbox.dom.on(this.$el,"click",T.bind(this),".remove-row"),this.sandbox.dom.on(this.$el,"click",F.bind(this),".item-table-row"),this.sandbox.dom.on(this.$el,"click",G.bind(this),".item-table-row td"),this.sandbox.dom.on(this.$el,"data-changed",function(a){var b=a.items||[];cb.call(this,b)}.bind(this)),this.sandbox.dom.on(this.$el,"change",H.bind(this),i.quantityInput),this.sandbox.dom.on(this.$el,"change",I.bind(this),i.priceInput),this.sandbox.dom.on(this.$el,"change",J.bind(this),i.discountInput)},v=function(a){this.options.settings&&(this.options.settings.addresses=a)},w=function(a){var b,c,d=new this.sandbox.data.deferred;this.currency=a,b=D.call(this,this.items),b&&b.length>0&&(B.call(this,d),c=z.call(this,b),this.sandbox.dom.when(c,d).done(function(a){x.call(this,a),M.call(this),A.call(this)}.bind(this)).fail(function(a,b,c){this.sandbox.emit("sulu.labels.error.show",this.sandbox.translate("salescore.item-table.error.changing-currency"),"labels.error",""),this.sandbox.logger.error(a,b,c)}.bind(this)))},x=function(a){var b,c,d,e=y.call(this,a._embedded.products);for(d in this.items)this.items.hasOwnProperty(d)&&(c=this.items[d],c.price=e[c.product.id]&&e[c.product.id][this.currency]?e[c.product.id][this.currency]:0,b=this.sandbox.dom.find(i.priceInput,this.sandbox.dom.find("#"+d,this.$list)),this.sandbox.dom.val(b,this.sandbox.numberFormat(c.price,"n")),L.call(this,d))},y=function(a){var b={};return this.sandbox.util.foreach(a,function(a){b[a.id]={},this.sandbox.util.foreach(a.prices,function(c){b[a.id][c.currency.code]=c.price||0}.bind(this))}.bind(this)),b},z=function(a){var b=this.sandbox.uritemplate.parse(h.products).expand({filter:{ids:a.join(",")}});return this.sandbox.util.load(b)},A=function(){this.sandbox.stop(this.$loader),this.sandbox.dom.show(this.$list)},B=function(a){C.call(this),this.sandbox.start([{name:"loader@husky",options:{el:this.$loader,size:"40px",hidden:!1}}]).done(function(){a.resolve()}.bind(this))},C=function(){var a=this.sandbox.dom.height(this.$el);this.$loader=this.sandbox.dom.createElement(k.loader.call(this,i.loaderClass)),this.$list=this.sandbox.dom.find(i.formSelector,this.$el),this.sandbox.dom.append(this.$el,this.$loader),this.sandbox.dom.height(this.$loader,a),this.sandbox.dom.hide(this.$list),this.sandbox.dom.show(this.$loader)},D=function(a){var b,c=[];for(b in a)a[b].hasOwnProperty("product")&&c.push(a[b].product.id);return c},E=function(a,b){this.options.defaultData[a]=b},F=function(a){if("INPUT"!==a.target.tagName.toUpperCase()&&"A"!==a.target.tagName.toUpperCase()&&this.options.isEditable){var b=this.sandbox.dom.attr(a.currentTarget,"id");this.options.rowCallback&&this.options.rowCallback.call(this,b,this.items[b]),this.options.settings&&"false"!==this.options.settings&&fb.call(this,this.items[b],this.options.settings,b)}},G=function(a){var b=this.sandbox.dom.data(a.currentTarget,"name"),c=this.sandbox.dom.data(this.sandbox.dom.parent(),"id");b&&this.options.columnCallbacks.hasOwnProperty(b)&&this.options.columnCallbacks[b].call(this,a.currentTarget,c)},H=function(a){var b=K.call(this,a).id;this.items[b].quantity=this.sandbox.parseFloat(this.sandbox.dom.val(a.target)),hb.call(this),L.call(this,b),M.call(this),this.sandbox.emit(n.call(this))},I=function(a){var b=K.call(this,a).id;this.items[b].price=this.sandbox.parseFloat(this.sandbox.dom.val(a.target)),hb.call(this),L.call(this,b),M.call(this),this.sandbox.emit(n.call(this))},J=function(a){var b=K.call(this,a).id;this.items[b].discount=this.sandbox.parseFloat(this.sandbox.dom.val(a.target)),hb.call(this),L.call(this,b),M.call(this),this.sandbox.emit(n.call(this))},K=function(a){var b=this.sandbox.dom.closest(a.target,".item-table-row"),c=this.sandbox.dom.attr(b,"id");return{row:b,id:c}},L=function(a){var b=this.$find("#"+a),c=this.items[a],d=this.sandbox.dom.find(".item-overall-price span",b);this.sandbox.dom.html(d,O.call(this,c))},M=function(){var a,b,c=f.getTotalPricesAndTaxes(this.sandbox,this.items);if(a=this.$find(i.globalPriceTableClass),this.sandbox.dom.empty(a),c){N.call(this,a,this.sandbox.translate("salescore.item.net-price"),f.getFormattedAmountAndUnit(this.sandbox,c.netPrice,this.currency));for(b in c.taxes)N.call(this,a,this.sandbox.translate("salescore.item.vat")+".("+b+"%)",f.getFormattedAmountAndUnit(this.sandbox,c.taxes[b],this.currency));N.call(this,a,this.sandbox.translate("salescore.item.overall-price"),f.getFormattedAmountAndUnit(this.sandbox,c.grossPrice,this.currency))}},N=function(a,b,c){var d=this.sandbox.dom.createElement(k.priceRow.call(this,b,c));this.sandbox.dom.append(a,d)},O=function(a){return P(a),f.getTotalPrice(this.sandbox,a.price,Q.call(this,a),a.discount,a.quantity,a.tax,!0)},P=function(a){a.price=a.price||0,a.discount=a.discount||0,a.quantity=a.quantity||0,a.tax=a.tax||0},Q=function(a){return a.currency?a.currency:this.currency},R=function(a,b){var c=this.sandbox.dom.closest(b.currentTarget,i.rowClass),d=this.sandbox.dom.attr(c,"id"),e={};this.sandbox.start([{name:"loader@husky",options:{el:this.sandbox.dom.find(i.productSearchClass,c),size:"15px"}}]),this.sandbox.util.load(h.product+a.id).then(function(a){e=eb.call(this,a),$.call(this,d,e)}.bind(this)).fail(function(a,b,c){this.sandbox.emit("sulu.labels.error.show",this.sandbox.translate("salescore.item-table.error.loading-product"),"labels.error",""),this.sandbox.logger.error(a,b,c)}.bind(this))},S=function(a){var b=e.get("suluproduct.components.autocomplete.default");b.el=this.sandbox.dom.find(i.productSearchClass,a),b.selectCallback=R.bind(this);var c=this.sandbox.uritemplate.parse(h.productsFlat).expand({filter:this.options.urlFilter});b.remoteUrl=c+"&limit="+i.autocompleteLimit,b.limit=i.autocompleteLimit,this.sandbox.start([{name:"auto-complete@husky",options:b}])},T=function(a){a.preventDefault(),a.stopPropagation();var b=this.sandbox.dom.closest(a.currentTarget,".item-table-row"),c=this.sandbox.dom.attr(b,"id");X.call(this,c,b)},U=function(a){delete this.items[a],hb.call(this)},V=function(a,b){this.items[a]=b,hb.call(this)},W=function(a){a.preventDefault(),bb.call(this)},X=function(a,b){this.sandbox.dom.remove(b),U.call(this,a),ab.call(this,b),M.call(this),this.sandbox.emit(n.call(this))},Y=function(a,c){c!==!1&&this.rowCount++;var d,e,f=this.sandbox.util.extend({},j,this.options.defaultData,a,{isEditable:this.options.isEditable,columns:this.options.columns,rowId:i.rowIdPrefix+this.rowCount,rowNumber:this.rowCount});return f.address&&"object"==typeof f.address&&(f.addressObject=f.address,f.address=this.sandbox.sulu.createAddressString(f.address)),f.currency=this.currency,f.overallPrice=this.sandbox.numberFormat(O.call(this,f)),f.discount=this.sandbox.numberFormat(f.discount,"n"),f.price=this.sandbox.numberFormat(f.price,"n"),f.quantity=this.sandbox.numberFormat(f.quantity,"n"),d=this.sandbox.util.template(b,f),e=this.sandbox.dom.createElement(d)},Z=function(a){var b,c;return this.options.hasNestedItems&&(c=a,a=this.sandbox.util.extend({},a.item,c),delete a.item),b=Y.call(this,a),this.sandbox.dom.append(this.$find(i.listClass),b),b},$=function(a,b){var c=Y.call(this,b,!1);return this.sandbox.dom.replaceWith(this.$find("#"+a),c),V.call(this,a,b),_.call(this,c),this.sandbox.emit(n.call(this)),c},_=function(a){this.options.columns.indexOf("quantity")>0&&this.sandbox.form.addField(this.selectorFormId,this.sandbox.dom.find(i.quantityInput,a)),this.options.columns.indexOf("price")>0&&this.sandbox.form.addField(this.selectorFormId,this.sandbox.dom.find(i.priceInput,a)),this.options.columns.indexOf("discount")>0&&this.sandbox.form.addField(this.selectorFormId,this.sandbox.dom.find(i.discountInput,a))},ab=function(a){this.options.columns.indexOf("quantity")>0&&this.sandbox.form.removeField(this.selectorFormId,this.sandbox.dom.find(i.quantityInput,a)),this.options.columns.indexOf("price")>0&&this.sandbox.form.removeField(this.selectorFormId,this.sandbox.dom.find(i.priceInput,a)),this.options.columns.indexOf("discount")>0&&this.sandbox.form.removeField(this.selectorFormId,this.sandbox.dom.find(i.discountInput,a))},bb=function(){var a,b={rowClass:"new"};a=Z.call(this,b),S.call(this,a)},cb=function(a){this.items={},this.sandbox.dom.empty(this.$find(i.listClass)),db.call(this,a)},db=function(a){var b,c,d,e,f;for(b=-1,c=a.length;++b<c;)d=a[b],e=Z.call(this,a[b]),f=this.sandbox.dom.attr(e,"id"),this.items[f]=d;hb.call(this)},eb=function(a){var b,c,d=this.sandbox.util.extend({},j,this.options.defaultData,{name:a.name,number:a.number,description:a.shortDescription,product:a,quantityUnit:a.orderUnit?a.orderUnit.name:""});if(a.prices&&a.prices.length>0)for(b=-1,c=a.prices.length;++b<c;)a.prices[b].currency.code===this.currency&&(d.price=a.prices[b].price);return a.supplierName&&(d.supplierName=a.supplierName),d},fb=function(a,b,c){var e,f,g,h;b=this.sandbox.util.extend({columns:[],addresses:[]},b),a=this.sandbox.util.extend({settings:b,createAddressString:this.sandbox.sulu.createAddressString,translate:this.sandbox.translate,deliveryDate:null,deliveryAddress:{id:null},costCenter:null},a),this.sandbox.stop(this.sandbox.dom.find(i.overlayClassSelector,this.$el)),this.sandbox.dom.remove(this.sandbox.dom.find(i.overlayClassSelector,this.$el)),f=this.sandbox.util.template(d,a),e=this.sandbox.dom.createElement('<div class="'+i.overlayClass+'"></div>'),this.sandbox.dom.append(this.$el,e),g=a.name,h="#"+a.number,""!==a.supplierName&&(h+="<br/>"+a.supplierName),this.sandbox.start([{name:"overlay@husky",options:{el:e,title:g,subTitle:h,instanceName:"settings",openOnStart:!0,removeOnClose:!1,skin:"wide",data:f,okCallback:function(){var a=this.sandbox.dom.val(i.overlayClassSelector+' *[data-mapper-property="deliveryAddress"]'),b=this.sandbox.dom.val(i.overlayClassSelector+' *[data-mapper-property="deliveryDate"] input'),d=this.sandbox.dom.val(i.overlayClassSelector+' *[data-mapper-property="costCenter"]');this.items[c].description=this.sandbox.dom.val(i.overlayClassSelector+' *[data-mapper-property="description"]'),this.items[c].quantity=this.sandbox.dom.val(i.overlayClassSelector+' *[data-mapper-property="quantity"]'),this.items[c].price=this.sandbox.dom.val(i.overlayClassSelector+' *[data-mapper-property="price"]'),this.items[c].discount=this.sandbox.dom.val(i.overlayClassSelector+' *[data-mapper-property="discount"]'),this.items[c].deliveryAddress="-1"!==a?a:{id:null},this.items[c].deliveryDate=""!==b?b:null,this.items[c].costCenter=""!==d?d:null,$.call(this,c,this.items[c]),M.call(this,c),hb.call(this)}.bind(this)}},{name:"input@husky",options:{el:"#delivery-date",skin:"date",instanceName:"settings-delivery-date",inputId:"settings-delivery-date"}}])},gb=function(){var a=this.sandbox.util.extend({},j,this.options,{header:s.call(this)}),b=this.sandbox.util.template(c,a);this.sandbox.dom.append(this.$find(i.listClass),b)},hb=function(){this.sandbox.dom.data(this.$el,"items",this.getItems())},ib=function(){this.sandbox.form.create(this.selectorFormId)};return{initialize:function(){this.options=this.sandbox.util.extend({},g,this.options),this.selectorFormId="#"+this.options.formId,this.items={},this.rowCount=0,this.table=null,this.currency=this.options.currency||j.currency,this.isEmpty=this.items.length;var a=this.sandbox.dom.data(this.$el,"items");0===this.options.data.length&&a&&a.length>0&&(this.options.data=a),this.render(),t.call(this),u.call(this)},render:function(){var b=this.sandbox.util.extend({},{formId:this.options.formId,addText:this.sandbox.translate("salescore.item.add"),isEditable:this.options.isEditable,columns:this.options.columns});this.table=this.sandbox.util.template(a,b),this.html(this.table),gb.call(this),db.call(this,this.options.data),ib.call(this),M.call(this),this.sandbox.emit(m.call(this))},getItems:function(){var a,b=[];for(a in this.items)b.push(this.items[a]);return b}}});