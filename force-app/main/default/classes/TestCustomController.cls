/*
 * Copyright (c) 2018, salesforce.com, inc.
 * All rights reserved.
 * Licensed under the BSD 3-Clause license.
 * For full license text, see LICENSE.txt file in the repo root
 */

@isTest
private class TestCustomController {

    @testSetup
    static void setupData(){
        Opportunity o = new Opportunity();
        o.Amount = 1000.00;
        o.Name = 'Test Opportunity For Unit Test Purposes';
        o.CloseDate = Date.Today().addDays(5);
        o.StageName = 'Prospecting';
        insert o;

        Opportunity o2 = new Opportunity();
        o2.Amount = 2000.00;
        o2.Name = 'Another Test Opportunity For Unit Test Purposes';
        o2.CloseDate = Date.Today().addDays(5);
        o2.StageName = 'Prospecting';
        o2.Description = 'Test Data';
        insert o2;

        Account a = new Account();
        a.Name = 'Test Account For Unit Test Purposes';
        a.BillingStreet = '350 Mission St';
        a.BillingCity = 'San Francisco';
        a.BillingState = 'CA';
        a.BillingCountry = 'US';
        a.ShippingStreet = '1095 Avenue of the Americas, 6th Ave';
        a.ShippingCity = 'New York';
        a.ShippingState = 'NY';
        a.ShippingCountry = 'US';
        insert a;

        Case c1 = new Case();
        c1.Status = 'New';
        c1.Origin = 'Phone';
        c1.Priority = 'High';
        c1.AccountId = a.Id;
        insert c1;

        Case c2 = new Case();
        c2.Status = 'New';
        c2.Origin = 'Phone';
        c2.Priority = 'Medium';
        c2.AccountId = a.Id;
        insert c2;
    }

    @isTest
    static void convertToProbonoOpportunity(){
        Opportunity opp = [SELECT Id, Amount, Description FROM Opportunity WHERE Name = 'Test Opportunity For Unit Test Purposes'];
        Test.startTest();
        CustomController.convertToProbonoOpportunity(opp.Id);
        Test.stopTest();
        Opportunity updatedOpp = [SELECT Id, Amount, Description FROM Opportunity WHERE Name = 'Test Opportunity For Unit Test Purposes'];
        System.assertEquals(0, updatedOpp.Amount);
        System.assertEquals('Converted to Pro-Bono.', updatedOpp.Description);
    }

    @isTest
    static void convertToProbonoOpportunityWithDescription(){
        Opportunity opp = [SELECT Id, Amount, Description FROM Opportunity WHERE Name = 'Another Test Opportunity For Unit Test Purposes'];
        Test.startTest();
        CustomController.convertToProbonoOpportunity(opp.Id);
        Test.stopTest();
        Opportunity updatedOpp = [SELECT Id, Amount, Description FROM Opportunity WHERE Name = 'Another Test Opportunity For Unit Test Purposes'];
        System.assertEquals(0, updatedOpp.Amount);
        System.assertEquals('Test Data. Converted to Pro-Bono.', updatedOpp.Description);
    }

    @isTest
    static void newQuickContactForAccount(){
        Account acc = [SELECT Id FROM Account WHERE Name = 'Test Account For Unit Test Purposes'];
        Test.startTest();
        CustomController.newQuickContactForAccount(acc.Id, 'John', 'Test', '1231231231', 'unit@test.com');
        Test.stopTest();
        Contact c = [SELECT Id, FirstName, LastName, Phone, Email From Contact WHERE Account.Name = 'Test Account For Unit Test Purposes'];
        System.assertEquals('John', c.FirstName);
        System.assertEquals('Test', c.LastName);
        System.assertEquals('1231231231', c.Phone);
        System.assertEquals('unit@test.com', c.Email);
    }

    @isTest
    static void updateHighProbability(){
        Opportunity op = [SELECT Id FROM Opportunity WHERE Name = 'Test Opportunity For Unit Test Purposes'];
        Test.startTest();
        CustomController.updateProbability(op.Id, '3');
        Test.stopTest();
        Opportunity updatedOp = [SELECT Id, Probability FROM Opportunity WHERE Name = 'Test Opportunity For Unit Test Purposes'];
        System.assertEquals(80.0, updatedOp.Probability);
    }

    @isTest
    static void updateMediumProbability(){
        Opportunity op = [SELECT Id FROM Opportunity WHERE Name = 'Test Opportunity For Unit Test Purposes'];
        Test.startTest();
        CustomController.updateProbability(op.Id, '2');
        Test.stopTest();
        Opportunity updatedOp = [SELECT Id, Probability FROM Opportunity WHERE Name = 'Test Opportunity For Unit Test Purposes'];
        System.assertEquals(50.0, updatedOp.Probability);
    }

    @isTest
    static void updateLowProbability(){
        Opportunity op = [SELECT Id FROM Opportunity WHERE Name = 'Test Opportunity For Unit Test Purposes'];
        Test.startTest();
        CustomController.updateProbability(op.Id, '1');
        Test.stopTest();
        Opportunity updatedOp = [SELECT Id, Probability FROM Opportunity WHERE Name = 'Test Opportunity For Unit Test Purposes'];
        System.assertEquals(20.0, updatedOp.Probability);
    }

    @isTest
    static void getAccountBillingAddress(){
        Account acc = [SELECT Id FROM Account WHERE Name = 'Test Account For Unit Test Purposes'];
        Test.startTest();
        Account accountFromServer = CustomController.getAccountAddress(acc.Id, 'Billing');
        Test.stopTest();
        System.assertEquals('350+Mission+St', accountFromServer.BillingStreet);
        System.assertEquals('San Francisco', accountFromServer.BillingCity);
        System.assertEquals('CA', accountFromServer.BillingState);
        System.assertEquals('US',accountFromServer.BillingCountry);
    }

    @isTest
    static void getAccountShippingAddress(){
        Account acc = [SELECT Id FROM Account WHERE Name = 'Test Account For Unit Test Purposes'];
        Test.startTest();
        Account accountFromServer = CustomController.getAccountAddress(acc.Id, 'Shipping');
        Test.stopTest();
        System.assertEquals('1095+Avenue+of+the+Americas,+6th+Ave', accountFromServer.ShippingStreet);
        System.assertEquals('New York', accountFromServer.ShippingCity);
        System.assertEquals('NY', accountFromServer.ShippingState);
        System.assertEquals('US',accountFromServer.ShippingCountry);
    }

    @isTest
    static void massUpdateAccountCases(){
        Account acc = [SELECT Id FROM Account WHERE Name = 'Test Account For Unit Test Purposes'];
        Test.startTest();
        CustomController.massUpdateAccountCases(acc.Id);
        Test.stopTest();
        List<Case> casesFromAccount = [SELECT Id, Status, Description, Priority FROM Case WHERE Account.Name = 'Test Account For Unit Test Purposes' LIMIT 2];
        for(Case c : casesFromAccount){
            System.assertEquals('Closed', c.Status);
            System.assertEquals('Low', c.Priority);
            System.assertEquals('Case Closed.', c.Description);
        }
    }
}
