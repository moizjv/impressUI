WhiteBoard = Ember.Application.create();

WhiteBoard.CreateButtonView =  Ember.View.extend({
	
	slideText: null,
	dataX: null,
	dataY: null,
	klass: null,
	dataScale: null,
	
	classNames: ['ember-css'],
	
	createStep : function() {
		
		WhiteBoard.Controller.createStep();
		
	},

	createSlide : function() {
		WhiteBoard.Controller.createSlide();
	}
	
	
});

WhiteBoard.Controller = Ember.ArrayProxy.create({
	
	createStep : function() {
		alert("step");
	},

	createSlide : function() {
		alert("slide");
	}
	
});