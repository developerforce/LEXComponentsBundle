/*
 * Copyright (c) 2018, Salesforce.com, inc.
 * All rights reserved.
 * Licensed under the BSD 3-Clause license.
 * For full license text, see LICENSE.txt file in the repo root
*/

({
    // Every function should start in this format
    // nameOfFunction : function(component, event, helper)
    submitForm : function(component, event, helper) {
        
        //This is how the Javascript controller gets the attributes from the component
        var id = component.get("v.recordId");
        var firstName = component.get("v.firstName");
        var lastName = component.get("v.lastName");
        var phone = component.get("v.phone");
        var email = component.get("v.email");
        
        //This is how the Javascript controller gets the function from the Apex controller
        //The component works as a bridge between the Javascript controller and the Apex controller
        var action = component.get("c.newQuickContactForAccount");
        
        //This sets the parameters of the Apex controller function
        //The parameter name must be exactly the same as in the Apex controller
        action.setParams({
            "accountId" : id,
            "firstName" : firstName,
            "lastName" : lastName,
            "phone" : phone,
            "email" : email
        });
        
        //This defines what to do when the response from the Apex controller is received.
        action.setCallback(this,
        	//We define what to do inside a function that gets the response from the Apex controller as a parameter
        	function(response){
                //This saves the state of the response (successful or not).
            	var state = response.getState();
            	if(state === "SUCCESS"){
                	//These next commands call the Aura functions. They are predefined functions that help with the user interface.
                	//For more information about Aura: 
                	//	https://<myDomain>.lightning.force.com/auradocs/reference.app
                	//Replace "<myDomain>" with your actual domain
                	var resultsToast = $A.get("e.force:showToast");
                    resultsToast.setParams({
                        "title" : "Success",
                        "message" : "Contact was created."
                    });
                    resultsToast.fire();
                	$A.get("e.force:refreshView").fire();
                	$A.get("e.force:closeQuickAction").fire();
            	}else{
                    //This is a common way to handle possible errors
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
        //This executes the function in the Apex controller
        $A.enqueueAction(action);
        
	},
    
    cancel : function(component, event, helper){
        $A.get("e.force:closeQuickAction").fire();
    }
    

})
