/*
 * Copyright (c) 2018, salesforce.com, inc.
 * All rights reserved.
 * Licensed under the BSD 3-Clause license.
 * For full license text, see LICENSE.txt file in the repo root
*/

({
	close : function(component, event, helper) {
		$A.get("e.force:closeQuickAction").fire();
	}
})
