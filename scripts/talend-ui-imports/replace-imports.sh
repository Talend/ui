#!/bin/bash

# install jscodeshift if needed
if ! type jscodeshift > /dev/null
then
    echo "You will need jscodeshift to run this script, but it is not installed."
    echo "Let's install it : sudo npm install -g jscodeshift"
    sudo npm install -g jscodeshift
fi

# ensure that a project directory is provided
if [ -z $1 ]
then
    echo "Please provide the path of your project local directory"
    exit 1
fi

# ensure that the project directory exists
if [ ! -d $1 ]
then
    echo "$1 is not a directory"
fi

# replace js imports
BASEDIR=$(dirname "$0")
jscodeshift -t "${BASEDIR}/codemod.js" $1/examples
jscodeshift -t "${BASEDIR}/codemod.js" $1/stories
jscodeshift -t "${BASEDIR}/codemod.js" $1/src

# replace bootstrap-talend-theme in all scss
find $1/src -iregex '.*\.scss' | xargs sed -i 's/bootstrap-talend-theme/@talend\/bootstrap-theme/g'

# replace modules in package.json
REPLACE_THEME_SCHEMA='s/bootstrap-talend-theme/@talend\/bootstrap-theme/g'
REPLACE_ICON_SCHEMA='s/talend-icons/@talend\/icons/g'
REPLACE_LOG_SCHEMA='s/talend-log/@talend\/log/g'
REPLACE_CMF_SCHEMA='s/react-cmf/@talend\/react-cmf/g'
REPLACE_COMPONENTS_SCHEMA='s/react-talend-components/@talend\/react-components/g'
REPLACE_CONTAINERS_SCHEMA='s/react-talend-containers/@talend\/react-containers/g'
REPLACE_FORMS_SCHEMA='s/react-talend-forms/@talend\/react-forms/g'
ALL_REPLACE="$REPLACE_THEME_SCHEMA; $REPLACE_ICON_SCHEMA; $REPLACE_LOG_SCHEMA; $REPLACE_CMF_SCHEMA; $REPLACE_COMPONENTS_SCHEMA; $REPLACE_CONTAINERS_SCHEMA; $REPLACE_FORMS_SCHEMA"
sed -i "$ALL_REPLACE" $1/package.json

# replace webpack sass data config
REPLACE_TALEND_MODULES='s/react-talend-/@talend\\\//g'
ALL_REPLACE_WITH_WILDCARD="$ALL_REPLACE; $REPLACE_TALEND_MODULES"
sed -i "$ALL_REPLACE_WITH_WILDCARD" $1/*.js
sed -i "$ALL_REPLACE_WITH_WILDCARD" $1/config/*.js
