#!/usr/bin/env bash

echo "STATICS"
cd "$TRAVIS_BUILD_DIR"

rm -rf .static
mkdir .static
mkdir .static/cmf
mkdir .static/components
mkdir .static/containers
mkdir .static/dataviz
mkdir .static/forms
mkdir .static/icons
mkdir .static/theme
mkdir .static/datagrid
mkdir .static/stepper
cp .surge/index.html .static
if [ "$TRAVIS_PULL_REQUEST" != 'false' ]; then
    STATIC_BRANCH_NAME=$(echo $TRAVIS_PULL_REQUEST_BRANCH | sed -e 's/\//\\\//g')
    sed -i -e 's/REPLACED_BY_CI/'$STATIC_BRANCH_NAME'/' .static/index.html
fi
echo "✓ Initialized .static"

find .static/

cd "$TRAVIS_BUILD_DIR"
