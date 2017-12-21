/*
 * Copyright (c) 2018, salesforce.com, inc.
 * All rights reserved.
 * Licensed under the BSD 3-Clause license.
 * For full license text, see LICENSE.txt file in the repo root
 */
 
public with sharing class SetOpportunityProbabilityController {

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
    public static void updateProbability(String id, String prob){
        Opportunity op = [SELECT Id, Probability FROM Opportunity WHERE Id=:id];
       	if(prob == '1') op.Probability = 20.0;
        if(prob == '2') op.Probability = 50.0;
        if(prob == '3') op.Probability = 80.0;
        update op;
    }
    
}
