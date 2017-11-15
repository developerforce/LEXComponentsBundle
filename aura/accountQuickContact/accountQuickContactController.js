({
    // Every function written here should start in this format
    // nameOfFunction : function(component, event, helper)
    submitForm : function(component, event, helper) {
        
        //The following shows how the Javascript controller gets the attributes from the component
        var id = component.get("v.recordId");
        var firstName = component.get("v.firstName");
        var lastName = component.get("v.lastName");
        var phone = component.get("v.phone");
        var email = component.get("v.email");
        
        //This is how the javascript controller gets the function from the Apex controller
        //The component works like a "bridge" between the Javascript controller and the Apex controller
        var action = component.get("c.newQuickContactForAccount");
        
        //Set the parameters of the Apex controller function
        //The name of the parameter MUST be exacty the same as in the APEX controller
        action.setParams({
            "accountId" : id,
            "firstName" : firstName,
            "lastName" : lastName,
            "phone" : phone,
            "email" : email
        });
        
        //This is how we define what we do when the response from the Apex controller comes.
        action.setCallback(this,
        	//We define what to do inside a function that gets the response from the apex controller as a parameter
        	function(response){
                //Here we save the actual state of the response (if it was successfull or not).
            	var state = response.getState();
            	if(state === "SUCCESS"){
                	//These next commands are how we call the Aura functions, those are predefined functions that in this case, helps with the user interface
                	//For more information about Aura: 
                	//		https://<myDomain>.lightning.force.com/auradocs/reference.app
                	//Replace "<myDomain>" with your actual domain
                	var resultsToast = $A.get("e.force:showToast");
                    resultsToast.setParams({
                        "title" : "Success",
                        "message" : "Contact created."
                    });
                    resultsToast.fire();
                	$A.get("e.force:refreshView").fire();
                	$A.get("e.force:closeQuickAction").fire();
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
        
	},
    
    cancel : function(component, event, helper){
        $A.get("e.force:closeQuickAction").fire();
    }
    

})