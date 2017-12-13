#!/bin/bash

printf "Enter a name for your scratch org: "
read orgname
echo "Creating scratch org named "$orgname
sfdx force:org:create -a $orgname -f config/project-scratch-def.json
sfdx force:source:push -u $orgname
sfdx force:org:open -u $orgname