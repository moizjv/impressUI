App = Ember.Application.create();
    
App.CreateView = Ember.View.extend({
	
	slideText: null,
	dataX: null,
	dataY: null,
	klass: null,
	dataScale: null,
	
	classNames: ['ember-css'],

	createSlide: function() {
		var self=this;
		App.impressUIController.createImpressObject(self);
		App.impressUIController.createImpressSlides();
		self.set('slideText','');
		self.set('klass','');
		self.set('dataX','');
		self.set('dataY','');
		self.set('dataZ','');
		self.set('dataScale','');
    }
});

App.impressUIController= Ember.ArrayProxy.create({
	
	content : [],
	
	createImpressObject : function(viewObject) {
		var impress=App.impressObject.create({
			slideText: viewObject.slideText,
			dataX: viewObject.dataX,
			dataY: viewObject.dataY,
			klass: viewObject.klass,
			dataScale: viewObject.dataScale,
			id:this.content.length });
		this.pushObject(impress);
	},
	
	createImpressSlides : function() {
		var slideHolder="";
		$.each(this.content,function(index,value){
			var testSlide='<div class="'+value.klass+'" data-x="'+value.dataX+'" data-y="'+value.dataY+'" data-scale="'+value.dataScale+'">'+value.slideText+'</div>';
			slideHolder=slideHolder+"\n"+testSlide;
		});
		
		var impressId=$('#impressIframe').contents().find("#impress");
		if(impressId) {
			impressId.remove();
		}
		var editorId=$('#impressIframe').contents().find("#editor");
		editorId.html('<div id=impress>'+slideHolder+'</div>');
		$('#impressIframe')[0].contentWindow.impress().init(true);
		
	},
	
	deleteSlides : function() {
		this.filterProperty('toBeDeleted', true).forEach(this.removeObject, this);
		this.createImpressSlides();
	}
	
});

App.select = Ember.Object.create({
	  selected: null,
	  content: [
	    "step",
	    "step slide"
	  ]
});

App.impressObject =  Ember.Object.extend( {
	
	slideText: null,
	dataX: null,
	dataY: null,
	klass: null,
	dataScale: null,
	id:null,
	toBeDeleted:false
	
});

