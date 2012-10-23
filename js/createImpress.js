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
		self.klass=App.select.selected;
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
		var slideHolder='<div id="overview" class="step" data-x="0" data-y="0" data-scale="10"></div>';
		$.each(this.content,function(index,value){
			var testSlide='<div class="'+value.klass+'" data-x="'+value.dataX+'" data-y="'+value.dataY+'" data-scale="'+value.dataScale+'"  contentEditable=true draggable=true>'+value.slideText+'</div>';
			slideHolder=slideHolder+"\n"+testSlide;
		});
		
		//var impressId=$('#impressIframe').contents().find("#impress");
		var impressId=$("#impress");
		
		if(impressId) {
			impressId.remove();
		}
		var editorId=$('#editor');
		editorId.html('<div id=impress>'+slideHolder+'</div>');
	//	$('#impressIframe')[0].contentWindow.impress().init(true);
		impress().init();
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

