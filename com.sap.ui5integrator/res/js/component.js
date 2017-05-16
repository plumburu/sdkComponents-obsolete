define(["sap/designstudio/sdk/component", "css!../css/component.css"], function(Component, css) {
	Component.subclass("com.sap.ui5integrator.Receiver", function() {

		var that = this;
		


			// Properties.
		 
			this._parm1 = undefined;
			
			this._parm1Changed = true;
		//	this.url = "http://localhost:56653";
			


		this.init = function() {
			
			this._parm1Changed = true;
			window.alert('Custom component intialization called ');
			
			
			 function receiveMessage(e) 
			 { 
				 
		//		 console.log(that.url); console.log(e.origin);
			//	  if (e.origin !==  that.url)
				//	    return;
				 
			 var mes = "Message Received at window	: "; 
			window.alert( mes +  JSON.stringify(e.data) ) ;
  
			 that.parm1(e.data ); 
			 console.log( " window addEventListner called and setting that._parm1 variable to "  + that._parm1 );
			  
			 that.firePropertiesChanged(["parm1"]);
			 that.fireEvent("onclick");

			 } // end of Callback function for Window Message event listner 
	
			
			 window.addEventListener('message', receiveMessage);
		
			this.$().click(function() {
				that.fireEvent("onclick");
			});
		};
		
		
//		this.beforeUpdate = function() {
//			
//			
//			 function receiveMessage(e) 
//			 { 
//
//			 // Update the div element to display the message.
//			 var mes = "Message Received: " + e.data; 
//			 window.alert("before  update" + JSON.stringify(e.data));
//			// window.alert( JSON.stringify(e.data) ) ;
//			 gCustomer = e.data;
//
//			 }
//			 window.addEventListener('message', receiveMessage);
//			
//			
//	window.alert( "  before Update assigning gCustomer to _param1 : "+ gCustomer+  " value to param1 ");
//						this.__parm1 = gCustomer;
//						  return this ; 
//		
//			this.$().click(function() {
//				that.fireEvent("onclick");
//			});
//		};
		
		
		this.parm1 = function(value) {
		if (value === undefined) {
				window.alert( " Getter Function :   : "+ this._parm1);
				return this._parm1;
			} else 
			
			{
					this._parm1 =  JSON.stringify(value);
					this._parm1Changed = true;
					window.alert( "  Setter Function assigning to _parm1 : "+ this._parm1 );
					return this ; 
					 }
		 
		};
		
		
		
		this.afterUpdate = function() {
			 console.log(this.parm1);
			console.log('Custom component afterUpdate called ');
			
		};
		

	
	});	
});
    
