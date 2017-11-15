({
    // Every function written here should start in this format
    // nameOfFunction : function(component, event, helper)
	openBillingAddress : function(component, event, helper) {
        //In this scenario, since we have a function that works always in the same way with different values,
        //we are going to write that function in the helper so we do not repeat code
        //so, we set the selected value in a variable and we send it to the helper along with the component.
        helper.openAddress(component, "Billing");
	},
    
    openShippingAddress : function(component, event, helper) {
        helper.openAddress(component, "Shipping");
    },
    
    cancel : function(component, event, helper){
        $A.get("e.force:closeQuickAction").fire();
    }
})