#!/bin/bash

sfdx force:data:soql:query -q 'Select Id, Name from Account Limit 2' -u $OrgId --json
