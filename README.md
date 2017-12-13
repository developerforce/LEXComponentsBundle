# Lightning Components Bundle
This repository contains example components to help you build lightning components actions.
This actions are used to replace javascript buttons used in Salesforce Classic.
Among these components we cover the following use cases that are common in javascript buttons:
1. Dialogues
2. Conditional URL
3. Mass Updates

## Getting Started
### For Salesforce DX use these instructions
* #### Mac or Linux
```
git clone https://github.com/developerforce/LEXComponentsBundle
cd LEXComponentsBundle
./install.sh
```
* #### Windows
```
git clone https://github.com/developerforce/LEXComponentsBundle
cd LEXComponentsBundle
install.cmd
```

### Non Salesforce DX - install unmanaged package to Developer Edition or Sandbox 
[Click here to install](https://login.salesforce.com/packaging/installPackage.apexp?p0=04t1I000002vjCN)

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
3. Select the *Account* Object to add the Quick Action to
4. Click the "Buttons, Links & Actions" in the left hand navigation
5. Click on "New Action"
6. Select in "Lightning Component in the "Action Type" drop down list
7. Select one of the ldsAccountQuickConnect component in the "Lightning Component" drop down list
8. Enter "Quick Contact" for the Label then click Save
9. Click  "Page Layouts" in the left hand navigation
10. Select the *Account Layout*
11. In the *Salesforce Mobile and Lightning Experience* section of the layout click the *override the predefined actions* link in the first sentence to enable custom Quick Actions
12. Click the *Mobile & Lightning Actions* and then drag and drop the *Quick Contact* quick action in the page layout
13. Save
14. Navigate to an account record and create a new contact using the quick action.
