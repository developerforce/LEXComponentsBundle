/*
 * Copyright (c) 2018, salesforce.com, inc.
 * All rights reserved.
 * Licensed under the BSD 3-Clause license.
 * For full license text, see LICENSE.txt file in the repo root
 */

@isTest
public with sharing class TestRedirectConditionalUrlController {
    
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
    static void getAccountBillingAddress(){
        Account acc = [SELECT Id FROM Account WHERE Name = 'Test Account For Unit Test Purposes'];
        Test.startTest();
        Account accountFromServer = RedirectConditionalUrlController.getAccountAddress(acc.Id, 'Billing');
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
        Account accountFromServer = RedirectConditionalUrlController.getAccountAddress(acc.Id, 'Shipping');
        Test.stopTest();
        System.assertEquals('1095+Avenue+of+the+Americas,+6th+Ave', accountFromServer.ShippingStreet);
        System.assertEquals('New York', accountFromServer.ShippingCity);
        System.assertEquals('NY', accountFromServer.ShippingState);
        System.assertEquals('US',accountFromServer.ShippingCountry);
    }


}
