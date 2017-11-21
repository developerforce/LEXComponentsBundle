# Lightning Components Bundle
This repository contains example components to help you build lightning components actions.
This actions are used to replace javascript buttons used in Salesforce Classic.
Among these components we cover the following use cases that are common in javascript buttons:
1. Dialogues
2. Conditional URL
3. Mass Updates

## Getting Started
1. Install the unmanaged package in your developer org
    * [Download](https://login.salesforce.com/packaging/installPackage.apexp?p0=04t1I000002vjCI)

## Classes & Components
1. Apex class: CustomController.apxc
    * Apex class where the server side methods of the components are written.
2. Apex class: TestUnitController.apxc
    * Apex class where the unit test of the server-side methods are written.
3. Component: probonoOpportunity
    * Converts an Opportunity into a pro-bono one (Amount equals 0).
    * It uses an Apex controller for server-side process.
4. Component: accountQuickContact
    * A small form to create contacts for an account
    * It uses an Apex controller for server-side process.
5. Component: setOpportunityProbability:
    * It opens a dialogue with different buttons, each button updates the Opportunity with a different probability number.
    * It uses an Apex controller for server-side process.
6. Component: massUpdateAccountCases:
    * Updates the status and priority of all the cases related to the account.
    * It uses an Apex controller for server-side process.
7. Component: redirectConditionalUrl:
    * Opens a dialogue to choose if you want to open the billing address or the shipping address on a map.
    * It uses an Apex controller for server-side process.
8. Component: ldsDisplayRecord:
    * Opens a window showing details about an account.
    * It uses Lightning Data Service.
9. Component: ldsSaveRecord:
    * Opens a window that updates the account record.
    * It uses Lightning Data Service
10. Component: ldsDeleteRecord:
    * Deletes a contact record
    * It uses Lightning Data Service
11. Component: ldsAccountQuickContact:
    * A small form to create contacts for an Account.
    * It's similar to accountQuickContact component but using Lightning Data Service.

## How to create a Lightning Quick Action in Salesforce
1. Go to Setup
2. Click on Object Manager
3. Select an Object to add the Component
4. Go to "Buttons, Links & Actions"
5. Click on "New Action"
6. Select in "Action Type" the option "Lightning Component"
7. Select one of the components in "Lightning Component"
8. Add a Label, a Name and Save
9. Go to "Page Layouts"
10. Select the layout that you will add the quick action.
11. From "Mobile & Lightning Actions" drag and drop the quick action in the page layout
12. Save
