/*
 * Copyright (c) 2018, Salesforce.com, inc.
 * All rights reserved.
 * Licensed under the BSD 3-Clause license.
 * For full license text, see LICENSE.txt file in the repo root
*/

({
    // Every function should start in this format
    // nameOfFunction : function(component, event, helper)
	convertoToProbono : function(component, event, helper) {
		
        //This is how the Javascript controller gets the record ID
        var id = component.get("v.recordId");
        
        //This is how the Javascript controller gets the function from the Apex controller
        //The component works like a bridge between the Javascript controller and the Apex controller
        var action = component.get("c.convertToProbonoOpportunity");
        
        //Set the parameters of the Apex controller function
        //The parameter name must be exactly the same as in the Apex controller
        action.setParams({
            "opportunityId" : id
        });
        
        //This defines what to do when the response from the Apex controller is received.
        action.setCallback(this,
            //We define what to do inside a function that gets the response from the Apex controller as a parameter
            function(response){
                //This saves the state of the response (successful or not).
            	var state = response.getState();
            	if(state === "SUCCESS"){
                    //It may be necessary to perform some actions with the current window using aura events.
                    //For more information about Aura:
                    //    https://<myDomain>.lightning.force.com/auradocs/reference.app
                    //where <MyDomain> is the name of your custom Salesforce domain
                    var resultsToast = $A.get("e.force:showToast");
                    resultsToast.setParams({
                        "title" : "Success",
                        "message" : "The opportunity was updated.",
                        "type" : "success"
                    });
                    resultsToast.fire();
                	var refreshPageAction = $A.get("e.force:refreshView").fire();
                	var closeModalAction = $A.get("e.force:closeQuickAction").fire();
            	}else{
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
        //This executes the function in the APEX controller
        $A.enqueueAction(action);
	},
    
    cancel : function(component, event, helper){
        $A.get("e.force:closeQuickAction").fire();
    }
    
    
})