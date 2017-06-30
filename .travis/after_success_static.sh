#!/usr/bin/env bash

echo "STATICS"
cd "$TRAVIS_BUILD_DIR"

rm -rf .static
mkdir .static
mkdir .static/components
mkdir .static/containers
mkdir .static/forms
mkdir .static/icons
mkdir .static/theme
cp .surge/index.html .static

lerna exec --scope=react-talend-components -- yarn run build-storybook
cp -R packages/components/storybook-static/* .static/components
echo "✓ Copy components showcase to .static"
lerna exec --scope=react-talend-containers -- yarn run build-storybook
cp -R packages/containers/storybook-static/* .static/containers
echo "✓ Copy containers showcase to .static"

lerna exec --scope=react-talend-forms -- yarn run build-storybook
cp -R packages/forms/storybook-static/* .static/forms
echo "✓ Copy forms showcase to .static"

lerna exec --scope=talend-icons -- yarn run docs
cp -R packages/icons/docs/index.html .static/icons
echo "✓ Copy icons showcase to .static"

cp -R packages/theme/example/index.html .static/theme
cp -R packages/theme/dist .static/theme
echo "✓ Copy theme showcase to .static"

find .static/

cd "$TRAVIS_BUILD_DIR"
