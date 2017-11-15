({
    // Every function written here should start in this format
    // nameOfFunction : function(component, event, helper)
	doInit : function(component, event, helper) {
        
        //Standard way to load a record template using Lightning Data Service
        component.find("contactRecordCreator").getNewRecord(
        	"Contact",
            null,
            false,
            $A.getCallback(function(){
                var rec = component.get("v.newContact");
                var error = component.get("v.newContactError");
                if(error || (rec === null)){
                    console.log("Error initializing record template: " + error);
                }else{
                    console.log("Record template initialized" + rec.sobjectType);
                }
            })
        );
	},
    
    handleSaveContact : function(component, event, helper){
        //This is how we link the new Contact with the actual Account Id
        component.set("v.simpleNewContact.AccountId", component.get("v.recordId"));
        //Standard way to save a record using Lightning Data Service
        component.find("contactRecordCreator").saveRecord(function(saveResult){
            if(saveResult.state === "SUCCESS" || saveResult.state === "DRAFT"){
                //resultToast is a pop-up window that show messages.
                var resultsToast = $A.get("e.force:showToast");
                resultsToast.setParams({
                    "title" : "Contact saved",
                    "message" : "The new contact was created"
                });
                
                $A.get("e.force:closeQuickAction").fire();
                resultsToast.fire();
                $A.get("e.force:refreshView").fire();
            }else if(saveResult.state === "INCOMPLETE"){
                console.log("User is offline, device doesn't support drafts.");
            }else if(saveResult.state === "ERROR"){
                console.log("Problem saving contact, error" + JSON.stringify(saveResult.error));
            }else{
                console.log("Unknown problem, state: " + saveResult.state + ', error: ' + JSON.stringify(saveResult.error));
            }
        });
    },
    
    cancel : function(component, event, helper){
        $A.get("e.force:closeQuickAction").fire();
    }
    
    
})