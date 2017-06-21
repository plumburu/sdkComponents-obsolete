define(["sap/designstudio/sdk/component", "css!../css/component.css"], function(Component, css) {
	Component.subclass("com.sap.ui5integrator.Receiver", function() {

		var that = this;
		


			// Properties.
		 
			this._parm1 = undefined;
			
			this._parm1Changed = true;
		   this._url = "*";
			


		this.init = function() {
			
			this._parm1Changed = true;
     console.log('Custom component intialization called ');
			   this._url = "*";

			
			 function receiveMessage(e) 
			 { 
				 
		 console.log(that._url); 
		 console.log(e.origin);
//	     if (e.origin !==  that._url && e.origin !== "*")
//			    return;
     //   Console.log( 'Trusted the origin website ' + e.origin) ;  				
			 var mes = "Message Received at window	: "; 
			 console.log( mes +  JSON.stringify(e.data) ) ;
  
			 that.parm1(e.data ); 
			 console.log( " window addEventListner called and setting that._parm1 variable to "  + that._parm1 );
			  
			 that.firePropertiesChanged(["parm1"]);
			 that.fireEvent("onreloadrequest");
			 that.fireEvent("onparameterschanged");

			 } // end of Callback function for Window Message event listner 
	
			
			 window.addEventListener('message', receiveMessage);
		
		
		};
		
		

		
		
		this.parm1 = function(value) {
		if (value === undefined) {
				//window.alert( " Getter Function :   : "+ this._parm1);
			console.log( " Getter Function :   : ");
			console.log(this._parm1);

			return this._parm1;
			} else 
			
			{
					this._parm1 =  value;
					this._parm1Changed = true;
					//window.alert( "  Setter Function assigning to _parm1 : "+ this._parm1 );
					console.log( "  Setter Function assigning to _parm1 : " );
					console.log(this._parm1);

					return this ; 
					 }
		 
		};
		
		this.url = function(value) {
			if (value === undefined) {
				 console.log( " Getter Function  URL : "+ this._url);

					return this._url;
				} else 
				
				{
						this._url =  value;
						console.log( " settter Function  URL   : "+ this._url);
						return this ; 
						 }
			 
			};
		
		
		
		this.afterUpdate = function() {
			 console.log(this.parm1);
			console.log('Custom component afterUpdate called ');
			
		};
		

	
	});	
});
    
