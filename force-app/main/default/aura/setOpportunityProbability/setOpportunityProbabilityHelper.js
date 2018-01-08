/*
 * Copyright (c) 2018, Salesforce.com, inc.
 * All rights reserved.
 * Licensed under the BSD 3-Clause license.
 * For full license text, see LICENSE.txt file in the repo root
*/

({
    //This is the helper method used in the Javascript controller
    //The main idea of helper methods is to reuse code and avoid writing the same thing over and over.
	updateProbability : function(value, component) {
        
        //This is how the Javascript controller gets the record ID
        var id = component.get("v.recordId");
        
        //This is how the Javascript controller gets the function from the Apex controller
        //The component works as a bridge between the Javascript controller and the Apex controller
        var action = component.get("c.updateProbability");
        
        //This sets the parameters of the Apex controller function
        //The parameter name must be exactly the same as in the Apex controller
        action.setParams({
            "id" : id,
            "prob" : value
        });
        
        //This defines what to do when the response from the Apex controller is received.
        action.setCallback(this,
            //We define what to do inside a function that gets the response from the Apex controller as a parameter
          	function(response){
                //This saves the state of the response (successful or not).
            	var state = response.getState();
            	if(state === "SUCCESS"){
                    //These next commands call the Aura functions. They are predefined functions that help with the user interface.
                    //For more info about Aura:
                    //    https://<myDomain>.lightning.force.com/auradocs/reference.app
                    //where <MyDomain> is the name of your custom Salesforce domain
                    var resultsToast = $A.get("e.force:showToast");
                    resultsToast.setParams({
                        "title" : "Success",
                        "message" : "The opportunity was updated."
                    });
                    resultsToast.fire();
                	$A.get("e.force:refreshView").fire();
                	$A.get("e.force:closeQuickAction").fire();
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
        //This executes the function in the Apex controller
        $A.enqueueAction(action);
	}
})
