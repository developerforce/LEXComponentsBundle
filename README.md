# Sample Components for Lightning Component Actions
This repository contains sample components to help you build Lightning component actions, which can be used to replace JavaScript buttons used in Salesforce Classic. These components cover the following use cases that are common in JavaScript buttons:
1. Dialogues
2. Conditional URL
3. Mass Updates

## Getting Started
### Using Salesforce DX:
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

### Not using Salesforce DX: Install this unmanaged package to your Developer Edition or Sandbox org.
[Click here to install](https://login.salesforce.com/packaging/installPackage.apexp?p0=04t1I000002y2Ih)

## How to Choose a Component
1. Look at your org to determine which JavaScript buttons are still in use and need to be converted.
2. Pick a button that you’d like to replace.
3. From the component list, pick one that closely matches what your JavaScript button is doing.
4. Edit the component sample code to match your needs. Tip: Make a copy of the component's files and modify those instead. 
5. Test and deploy per the "Create and Test Your Lightning Component Action" section below.

## Classes & Components
##### Components are listed by name. Details include the use case it applies to, the object it acts upon, its description, and the set of files that make up the component.
&nbsp;
##### Components that use Lightning Data Service begin with “lds”. Components that don’t use Lightning Data Service have Apex classes associated with them.

1. accountQuickContact
    * Use case: Dialogues
    * Object: Account
    * Description: Opens a form to create a contact related to the account. This is similar to ldsAccountQuickContact, but in this case the data is sent to an Apex class instead.
    * Files:
        * accountQuickContact.cmp
        * accountQuickContactController.js
        * accountQuickContact.css
        * AccountQuickContactController.cls
        * TestAccountQuickContactController.cls
2. ldsAccountQuickContact
    * Use case: Dialogues
    * Object: Account
    * Description: An example of how Lightning Data Service works for creating a new record. Opens a form to create a contact related to the account. The data is sent to the server through the JavaScript controller, so no Apex class is needed.
    * Files:
        * ldsAccountQuickContact.cmp
        * ldsAccountQuickContactController.js
        * ldsAccountQuickContactLDS.css
3. ldsDisplayRecord
    * Use case: Dialogues
    * Object: Account
    * Description: An example of how Lightning Data Service works for displaying a record. A popup window opens showing data about the current record. In this case, neither a JavaScript controller nor an Apex controller are needed.
    * Files: 
        * ldsDisplayRecord.cmp
        * ldsDisplayRecordController.js
        * ldsDisplayRecord.css
4. ldsDeleteRecord
    * Use case: Dialogues
    * Object: Any
    * Description: An example of how Lightning Data Service works for deleting a record. When the user executes the component, the JavaScript controller calls the server to delete the record, so no Apex class is needed.
    * Files: 
        * ldsDeleteRecord.cmp
        * ldsDeleteRecordController.js
        * ldsDeleteRecord.css
5. ldsSaveRecord
    * Use case: Dialogues
    * Object: Account
    * Description: An example of how Lightning Data Service works for updating a record. A popup window opens with information about the record and an editing form. Upon saving, the record is updated. The JavaScript controller sends the updated data to the server, so no Apex class is needed.
    * Files: 
        * ldsSaveRecord.cmp
        * ldsSaveRecordController.js
        * ldsSaveRecord.css
6. massUpdateAccountCases
    * Use case: Mass updates
    * Object: Account
    * Description: Updates all the cases related to the account. It changes the case priority to “Low”, the status to “Closed” and the description to “Case Closed.”
    * Files: 
        * massUpdateAccountCases.cmp
        * massUpdateAccountCases.css
        * MassUpdateAccountCasesController.js
        * MassUpdateAccountCasesController.cls
        * TestMassUpdateAccountCasesController.cls
7. probonoOpportunity
    * Use case: Dialogues
    * Object: Opportunity
    * Description: When executing this component in an opportunity, a popup window opens, asking for confirmation to convert the record to a pro-bono opportunity. If the user clicks “Confirm”, the opportunity amount updates to $0 and the page refreshes.
    * Files: 
        * probonoOpportunity.cmp
        * probonoOpportunityController.js
        * probonoOpportunity.css
        * ProBonoOpportunityController.cls
        * TestProBonoOpportunityController.cls
8. redirectConditionalUrl
    * Use case: Conditional URL
    * Object: Account
    * Description: Opens a popup window with two options: One opens the billing address in Google Maps, and the other opens the shipping address. This uses the record ID, sends it to the server, and retrieves the address data.
    * Files: 
        * redirectConditionalUrl.cmp
        * redirectConditionalUrlController.js
        * recirectConditionalUrlHelper.js
        * redirectConditionalUrl.css
        * RedirectConditionalUrlController.cls
        * TestRedirectConditionalUrlController.cls
9. setOpportunityProbability
    * Use case: Dialogues
    * Object: Opportunity
    * Description: Opens a popup window with three buttons. One button sets the probability of the opportunity to a High value (%80), another sets it to a medium value (%50), and the last to a low value (%20). The Javascript controller sends the record ID and the option selected to the Apex class.
    * Files: 
        * setOpportunityProbability.cmp
        * setOpportunityProbabilityController.js
        * setOpportunityProbabilityHelper.js
        setOpportunityProbability.css
        * setOpportunityProbabilityController.cls
        * TestSetOpportunityProbabilityController.cls

## Create and Test Your Lightning Component Action
1. Make sure the Lightning components are installed in your org.
2. In Setup, go to the Object Manager.
3. Select the object that you want to add the action to.
4. Click **Buttons, Links & Actions**, then click **New Action**.
5. From the Action Type drop down list, select **Lightning Component**.
6. Select the component you want to be called by the action.
7. Enter a label for the action, then click **Save**.
8. Add the action to the object’s page layout. <br>
    a. Click **Page Layouts**. <br>
    b. Select the layout you want to add the action to. <br>
    c. If you haven’t already, click **override the predefined actions** in the *Salesforce Mobile and Lightning Experience* section of the layout. <br>
    d. In the palette, click the **Mobile & Lightning Actions** category, and then drag the action that you created to the *Salesforce Mobile and Lightning Experience* section.<br>
    e. Click **Save**.
9. Navigate to a record and give the quick action a try. You’ll likely find it in the page-level actions menu in the record highlights panel.


*Let us know how you feel about the components. Post your feedback and questions to the [Lightning Now! group](https://success.salesforce.com/featuredGroupDetail?id=a1z3A000007SBrQQAW) in the Trailblazer Community with the hashtag #JS_Alternatives.*