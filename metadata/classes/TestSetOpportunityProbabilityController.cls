/*
 * Copyright (c) 2018, salesforce.com, inc.
 * All rights reserved.
 * Licensed under the BSD 3-Clause license.
 * For full license text, see LICENSE.txt file in the repo root
 */

@isTest
public with sharing class TestSetOpportunityProbabilityController {
    
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
    }

    @isTest
    static void updateHighProbability(){
        Opportunity op = [SELECT Id FROM Opportunity WHERE Name = 'Test Opportunity For Unit Test Purposes'];
        Test.startTest();
        SetOpportunityProbabilityController.updateProbability(op.Id, '3');
        Test.stopTest();
        Opportunity updatedOp = [SELECT Id, Probability FROM Opportunity WHERE Name = 'Test Opportunity For Unit Test Purposes'];
        System.assertEquals(80.0, updatedOp.Probability);
    }

    @isTest
    static void updateMediumProbability(){
        Opportunity op = [SELECT Id FROM Opportunity WHERE Name = 'Test Opportunity For Unit Test Purposes'];
        Test.startTest();
        SetOpportunityProbabilityController.updateProbability(op.Id, '2');
        Test.stopTest();
        Opportunity updatedOp = [SELECT Id, Probability FROM Opportunity WHERE Name = 'Test Opportunity For Unit Test Purposes'];
        System.assertEquals(50.0, updatedOp.Probability);
    }

    @isTest
    static void updateLowProbability(){
        Opportunity op = [SELECT Id FROM Opportunity WHERE Name = 'Test Opportunity For Unit Test Purposes'];
        Test.startTest();
        SetOpportunityProbabilityController.updateProbability(op.Id, '1');
        Test.stopTest();
        Opportunity updatedOp = [SELECT Id, Probability FROM Opportunity WHERE Name = 'Test Opportunity For Unit Test Purposes'];
        System.assertEquals(20.0, updatedOp.Probability);
    }

}
