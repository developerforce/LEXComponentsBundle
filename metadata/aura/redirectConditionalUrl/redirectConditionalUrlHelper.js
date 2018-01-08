/*
 * Copyright (c) 2018, Salesforce.com, inc.
 * All rights reserved.
 * Licensed under the BSD 3-Clause license.
 * For full license text, see LICENSE.txt file in the repo root
*/

({
    //This is the helper method, used in the Javascript controller.
    //The purpose of helper methods is to reuse code, to avoid writing the same thing over and over.
	openAddress : function(component, addressType) {
        
        //This is how the Javascript controller gets the record ID
        var recordId = component.get("v.recordId");
        
        //This is how the Javascript controller gets the function from the Apex controller
        //The component works as a bridge between the Javascript controller and the Apex controller
        var action = component.get("c.getAccountAddress");
        
        //This sets the parameters of the Apex controller function
        //The parameter name must be exactly the same as in the Apex controller
        action.setParams({
            "id" : recordId,
            "addressType" : addressType
        });
        
        //This defines what to do when the response from the Apex controller is received.
        action.setCallback(this,
            //This defines what to do inside a function that gets the response as a parameter from the Apex controller
            function(response){
                //This saves the state of the response (successful or not).
            	var state = response.getState();
            	if(state === "SUCCESS"){
                    //In the component, we have an object attribute (account).
                    //It works as a placeholder for the object.
                    //This sets the object of the response in the component
                	component.set("v.account", response.getReturnValue());
                    
                    //Now that the object we got from the server is saved in the component,
                    //we get it from the component to use its data.
                	var account = component.get("v.account");
                    
                    //If the option selected was "Open Billing Address"...
                	if(addressType == "Billing"){
                        //To redirect the page, we need an event with a URL as a parameter
                        //First, we create the variable.
                        //We’ll open Google maps with the address of the account.
                        //Then, we add that info into the URL.
                    	var url = "https://www.google.com/maps/search/?api=1&query="+account.BillingStreet+"+"+account.BillingCity
                				+",+"+account.BillingState+",+"+account.BillingCountry;
                        
                        //This is the event that does the redirect. First we define it.
                		var urlEvent = $A.get("e.force:navigateToURL");
                        
                        //Then we set the URL to navigate as a parameter.
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
                	//This is a common way to handle possible errors.
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
