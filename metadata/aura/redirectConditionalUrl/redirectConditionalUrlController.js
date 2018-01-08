/*
 * Copyright (c) 2018, Salesforce.com, inc.
 * All rights reserved.
 * Licensed under the BSD 3-Clause license.
 * For full license text, see LICENSE.txt file in the repo root
*/

({
    // Every function should start in this format
    // nameOfFunction : function(component, event, helper)
	openBillingAddress : function(component, event, helper) {
        //Since we have a function that works in the same way with different values,
        //we write that function in the helper so we don’t repeat code.
        //We set the selected value in a variable and send it to the helper along with the component.
        helper.openAddress(component, "Billing");
	},
    
    openShippingAddress : function(component, event, helper) {
        helper.openAddress(component, "Shipping");
    },
    
    cancel : function(component, event, helper){
        $A.get("e.force:closeQuickAction").fire();
    }
})
