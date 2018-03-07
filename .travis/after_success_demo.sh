#!/usr/bin/env bash

echo "cp DEMO"
cd "$TRAVIS_BUILD_DIR"

cp -R packages/cmf/docs/jsdoc .static/cmf
echo "✓ Copy cmf jsdoc to .static"

cp -R packages/components/storybook-static/* .static/components
echo "✓ Copy components showcase to .static"

cp -R packages/containers/storybook-static/* .static/containers
echo "✓ Copy containers showcase to .static"

cp -R packages/datagrid/storybook-static/* .static/datagrid
echo "✓ Copy datagrid showcase to .static"

cp -R packages/forms/storybook-static/* .static/forms
echo "✓ Copy forms showcase to .static"

cp -R packages/icons/docs/index.html .static/icons
echo "✓ Copy icons showcase to .static"

cp -R packages/theme/example/index.html .static/theme
cp -R packages/theme/dist .static/theme
echo "✓ Copy theme showcase to .static"
