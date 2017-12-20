/*
 * Copyright (c) 2018, salesforce.com, inc.
 * All rights reserved.
 * Licensed under the BSD 3-Clause license.
 * For full license text, see LICENSE.txt file in the repo root
 */

@isTest
public with sharing class TestAccountQuickContactController {
    
    @testSetup
    static void setupData(){
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
    }

    @isTest
    static void newQuickContactForAccount(){
        Account acc = [SELECT Id FROM Account WHERE Name = 'Test Account For Unit Test Purposes'];
        Test.startTest();
        AccountQuickContactController.newQuickContactForAccount(acc.Id, 'John', 'Test', '1231231231', 'unit@test.com');
        Test.stopTest();
        Contact c = [SELECT Id, FirstName, LastName, Phone, Email From Contact WHERE Account.Name = 'Test Account For Unit Test Purposes'];
        System.assertEquals('John', c.FirstName);
        System.assertEquals('Test', c.LastName);
        System.assertEquals('1231231231', c.Phone);
        System.assertEquals('unit@test.com', c.Email);
    }

}
