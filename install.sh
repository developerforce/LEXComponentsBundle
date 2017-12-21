#!/bin/bash

printf "Enter a name for your scratch org: "
read orgname
echo "Creating scratch org named "$orgname
sfdx force:org:create -a $orgname -f config/project-scratch-def.json
echo "Pushing LEX Components source to $orgname..."
sfdx force:source:push -u $orgname
echo "Opening $orgname in the browser..."
sfdx force:org:open -u $orgname