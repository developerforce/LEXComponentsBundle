/*
 * Copyright (c) 2018, salesforce.com, inc.
 * All rights reserved.
 * Licensed under the BSD 3-Clause license.
 * For full license text, see LICENSE.txt file in the repo root
*/

({
    // Every function written here should start in this format
    // nameOfFunction : function(component, event, helper)
    highProbability : function(component, event, helper){
        //In this scenario, since we have a function that works always in the same way with different values,
        //we are going to write that function in the helper so we do not repeat code
        //so, we set the selected value in a variable and we send it to the helper along with the component.
        var p = '3';
        helper.updateProbability(p, component);

    },

    mediumProbability : function(component, event, helper){
        var p = '2';
        helper.updateProbability(p, component);
    },

    lowProbability : function(component, event, helper){
        var p = '1';
        helper.updateProbability(p, component);
    },

    cancel : function(component, event, helper){
        $A.get("e.force:closeQuickAction").fire();
    }
})
