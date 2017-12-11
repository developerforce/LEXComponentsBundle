/*
 * Copyright (c) 2018, salesforce.com, inc.
 * All rights reserved.
 * Licensed under the BSD 3-Clause license.
 * For full license text, see LICENSE.txt file in the repo root
*/

({
    // Every function written here should start in this format
    // nameOfFunction : function(component, event, helper)
	doInit : function(component, event, helper) {

        //This is how the javascript controller gets the record Id
        var id = component.get("v.recordId");

        //This is how the javascript controller gets the function from the Apex controller
        //The component works like a "bridge" between the Javascript controller and the Apex controller
        var action = component.get("c.massUpdateAccountCases");

        //Set the parameters of the Apex controller function
        //The name of the parameter MUST be exacty the same as in the APEX controller
        action.setParams({
            "id" : id
        });

        //This is how we define what we do when the response from the Apex controller comes.
        action.setCallback(this,
            //We define what to do inside a function that gets the response from the apex controller as a parameter
            function(response){
                //Here we save the actual state of the response (if it was successfull or not).
            	var state = response.getState();
            	if(state === "SUCCESS"){
                	var resultsToast = $A.get("e.force:showToast");
                    resultsToast.setParams({
                        "title" : "Success",
                        "message" : "The Cases were updated."
                    });
                    resultsToast.fire();
                    //It may be necessary to perform some actions with the current window using aura events.
                    //For more info about Aura:
                    //    https://<myDomain>.lightning.force.com/auradocs/reference.app
                    //where <MyDomain> is the name of your custom Salesforce domain
                	$A.get("e.force:closeQuickAction").fire();
                	$A.get("e.force:refreshView").fire();
            	}else{
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
        //This is how we execute the function in the APEX controller
        $A.enqueueAction(action);
	}
})
