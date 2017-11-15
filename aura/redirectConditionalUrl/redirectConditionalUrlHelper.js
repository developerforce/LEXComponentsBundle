({
    //Helper method, used in the Javascript Controller
    //To main idea of helper methods is to reuse code and avoid writing the same stuff over and over again.
	openAddress : function(component, addressType) {
        
        //This is how the javascript controller gets the record Id
        var recordId = component.get("v.recordId");
        
        //This is how the javascript controller gets the function from the Apex controller
        //The component works like a "bridge" between the Javascript controller and the Apex controller
        var action = component.get("c.getAccountAddress");
        
        //Set the parameters of the Apex controller function
        //The name of the parameter MUST be exacty the same as in the APEX controller
        action.setParams({
            "id" : recordId,
            "addressType" : addressType
        });
        
        //This is how we define what we do when the response from the Apex controller comes.
        action.setCallback(this,
            //We define what to do inside a function that gets the response from the apex controller as a parameter
            function(response){
                //Here we save the actual state of the response (if it was successfull or not).
            	var state = response.getState();
            	if(state === "SUCCESS"){
                    //In the component we have an Object attribute (Account in this scenario)
                    //That attribute works as a placeholder of the object
                    //This is how we set the object of the response in the component
                	component.set("v.account", response.getReturnValue());
                    
                    //Now that we saved the object we had from the server in the component
                    //We get it from the component to use it's data
                	var account = component.get("v.account");
                    
                    //If the option selected was "Open Billing Address"...
                	if(addressType == "Billing"){
                        //To redirect the page, with will need an event
                        //And that event will need an url as a parameter
                        //So first, we create the variable.
                        //We are going to open Google maps with info about the Address of the account
                        //We add that info in the url
                    	var url = "https://www.google.com/maps/search/?api=1&query="+account.BillingStreet+"+"+account.BillingCity
                				+",+"+account.BillingState+",+"+account.BillingCountry;
                        
                        //This is the event needed to redirect, first we define it
                		var urlEvent = $A.get("e.force:navigateToURL");
                        
                        //Then we set the URL to navigate as a parameter
                		urlEvent.setParams({
                   			"url" : url
                		});
                		urlEvent.fire();
                		$A.get("e.force:closeQuickAction").fire();
                    
                	}else{
                    
                    	var url = "https://www.google.com/maps/search/?api=1&query="+account.ShippingStreet+"+"+account.ShippingCity
                				+",+"+account.ShippingState+",+"+account.ShippingCountry;
                		var urlEvent = $A.get("e.force:navigateToURL");  
                		urlEvent.setParams({
                   			"url" : url
                		});
                		urlEvent.fire();
                		$A.get("e.force:closeQuickAction").fire();
                	}                
            	}
            	else{
                	//The following, is a common way to handle possible errors.
                	var errors = response.getError();
                    if(errors){
                        if(errors[0] && errors[0].message){
                            console.log("Error Message: " + errors[0].message);
                        }else{
                            console.log("Unknown error");
                        }
                    }
            	}
        	}
        );
		$A.enqueueAction(action);
	}
})