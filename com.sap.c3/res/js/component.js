define(["d3", "sap/designstudio/sdk/component","./c3","css!./c3.css"], function(d3, Component,c3,css) {
	Component.subclass("com.sap.c3.Frequency", function() {

		var that = this;
		var Chart = undefined;
	

		this.init = function() {
			
			if(d3) { window.alert('d3 available') } ;
  		if(c3) { alert('c3 is available') } ;
  		 console.log(c3);
  		 console.log(d3);
  		 console.log(css);
		
  		var html = "<div id='chart'> </div>" ; 
		that.$().append(html) ; 

		
		Chart =  c3.generate({
		    bindto: '#chart',
		    data: {
		        columns: [
		            ['data1', 30, 20, 50, 40, 60, 50],
		            ['data2', 200, 130, 90, 240, 130, 220],
		            ['data3', 300, 200, 160, 400, 250, 250],
		            ['data4', 200, 130, 90, 240, 130, 220],
		            ['data5', 130, 120, 150, 140, 160, 150],
		            ['data6', 90, 70, 20, 50, 60, 120],
		        ],
		        type: 'scatter',
		        
		    
		    }
		});	
		
				
		};

		this.afterUpdate = function() {
			
			var param   = { } ;
	param.dims = that.metadata().dimensions;
		  param.rs = that.token();
	
		  console.log(param);
		  
		
		};

		
	
	});	
});
