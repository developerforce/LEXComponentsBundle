/*
 * Copyright (c) 2018, salesforce.com, inc.
 * All rights reserved.
 * Licensed under the BSD 3-Clause license.
 * For full license text, see LICENSE.txt file in the repo root
*/

({
    // Every function written here should start in this format
    // nameOfFunction : function(component, event, helper)
	handleDeleteRecord : function(component, event, helper) {
        //Standard way to delete a record using Lightning Data Service
        component.find("recordHandler").deleteRecord($A.getCallback(function(deleteResult){
            if(deleteResult.state === "SUCCESS" || deleteResult.state === "DRAFT"){
                console.log("Record is deleted.");
                $A.get("e.force:closeQuickAction").fire();
                var resultsToast = $A.get("e.force:showToast");
                resultsToast.setParams({
                    "title" : "Deleted",
                    "message" : "The record was deleted."
                });
                resultsToast.fire();
                var url = "/one/one.app#/sObject/Contact/list?filterName=Recent";
                var urlEvent = $A.get("e.force:navigateToURL");
                urlEvent.setParams({
                    "url" : url
                });
                urlEvent.fire();
            }else if(deleteResult.state === "INCOMPLETE"){
                console.log("User is offline, device doesn't support drafts.");
            }else if(deleteResult.state === "ERROR"){
                console.log("Problem deleting record, error: " + JSON.stringify(deleteResult.error));
                component.set("v.recordError", JSON.stringify(deleteResult.error));
            }else{
                console.log("Unknown problem, state: " + deleteResult.state + " , error: " + JSON.stringify(deleteResult.error));
            }
        }));
	},

    cancel : function(component, event, helper){
        $A.get("e.force:closeQuickAction").fire();
    }
})
