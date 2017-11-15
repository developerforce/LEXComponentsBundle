public class CustomController {
    /*
		All the functions that will be used in Lightning Components MUST have
		@AuraEnabled annotation at the top of the function signature.
		ex: 
			@AuraEnabled
			public static void someFunction(Object parameter){}

		Also:
			- Methods must be static and marked public or global. Non-static methods aren’t supported.
			- If a method returns an object, instance methods that retrieve the value of the object’s instance field must be public.
			- Use unique names for client-side and server-side actions in a component. A JavaScript function (client-side action) 
			  with the same name as an Apex method (server-side action ) can lead to hard-to-debug issues. In debug mode, 
			  the framework logs a browser console warning about the clashing client-side and server-side action names.
	*/
    
	@AuraEnabled
    public static void convertToProbonoOpportunity(String opportunityId){
        Opportunity op = [SELECT Id, Amount, Description FROM Opportunity WHERE Id=:opportunityId];
        op.Amount = 0.0;
        if(op.Description != null)
        	op.Description += '. Converted to Pro-Bono.';
        else
            op.Description = 'Converted to Pro-Bono.';
        update op;
    }
    
    @AuraEnabled
    public static void newQuickContactForAccount(String accountId, String firstName, String lastName, String phone, String email){
        Contact c = new Contact();
        c.FirstName = firstName;
        c.LastName = lastName;
        c.Phone = phone;
        c.Email = email;
        c.AccountId = accountId;
        insert c;
    }
    
    @AuraEnabled
    public static void updateProbability(String id, String prob){
        Opportunity op = [SELECT Id, Probability FROM Opportunity WHERE Id=:id];
       	if(prob == '1') op.Probability = 20.0;
        if(prob == '2') op.Probability = 50.0;
        if(prob == '3') op.Probability = 80.0;
        update op;
    }
    
    @AuraEnabled
    public static Account getAccountAddress(String id, String addressType){
        if(addressType == 'Billing'){
            Account acc = [SELECT BillingStreet, BillingCity, BillingState, BillingCountry FROM Account WHERE Id=:id];
        	acc.BillingStreet = acc.BillingStreet.replace(' ', '+');
        	return acc;
        }else if(addressType == 'Shipping'){
            Account acc = [SELECT ShippingStreet, ShippingCity, ShippingState, ShippingCountry FROM Account WHERE Id=:id];
        	acc.ShippingStreet = acc.ShippingStreet.replace(' ', '+');
        	return acc;
        }else return null;
    }
    
    @AuraEnabled
    public static void massUpdateAccountCases(String id){
        List<Case> cases = [SELECT Id, Status FROM Case WHERE AccountId=:id LIMIT 1000];
        for(Case cse : cases){
            cse.Status = 'Closed';
            cse.Priority = 'Low';
            cse.Description = 'Case Closed.';
        }
        update cases;
    } 
}