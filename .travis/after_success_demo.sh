#!/usr/bin/env bash

echo "cp DEMO"
cd "$TRAVIS_BUILD_DIR"

cp -R packages/cmf/jsdoc .static/cmf
cp -R packages/cmf/website/build/cmf-doc/* .static/cmf
echo "✓ Copy cmf jsdoc to .static"

cp -R packages/components/storybook-static/* .static/components
echo "✓ Copy components showcase to .static"

cp -R packages/containers/storybook-static/* .static/containers
echo "✓ Copy containers showcase to .static"

cp -R packages/datagrid/storybook-static/* .static/datagrid
echo "✓ Copy datagrid showcase to .static"

cp -R packages/stepper/storybook-static/* .static/stepper
echo "✓ Copy stepper showcase to .static"

cp -R packages/forms/storybook-static/* .static/forms
echo "✓ Copy forms showcase to .static"

cd packages/faceted-search
yarn build-storybook
cd "$TRAVIS_BUILD_DIR"
cp -R packages/faceted-search/storybook-static/* .static/faceted-search
echo "✓ Copy faceted-search showcase to .static"

cp -R packages/icons/docs/index.html .static/icons
echo "✓ Copy icons showcase to .static"

cp -R packages/theme/example/index.html .static/theme
cp -R packages/theme/dist .static/theme
echo "✓ Copy theme showcase to .static"
