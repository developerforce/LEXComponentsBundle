/*
 * Copyright (c) 2018, salesforce.com, inc.
 * All rights reserved.
 * Licensed under the BSD 3-Clause license.
 * For full license text, see LICENSE.txt file in the repo root
 */

public with sharing class MassUpdateAccountCasesController {
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
