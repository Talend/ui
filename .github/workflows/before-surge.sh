#!/bin/sh

echo "Prepare demo folder before execute surge"
rm -rf .static
mkdir .static
mkdir .static/cmf
mkdir .static/components
mkdir .static/containers
mkdir .static/dataviz
mkdir .static/design-system
mkdir .static/faceted-search
mkdir .static/forms
mkdir .static/icons
mkdir .static/theme
mkdir .static/datagrid
mkdir .static/storybook-docs
cp .surge/index.html .static
cp -R packages/cmf/jsdoc .static/cmf
cp -R packages/components/storybook-static/* .static/components
cp -R packages/containers/storybook-static/* .static/containers
cp -R packages/datagrid/storybook-static/* .static/datagrid
cp -R packages/dataviz/storybook-static/* .static/dataviz
cp -R packages/storybook/storybook-static/* .static/design-system
cp -R packages/faceted-search/storybook-static/* .static/faceted-search
cp -R packages/forms/storybook-static/* .static/forms
cp -R packages/icons/storybook-static/* .static/icons
cp -R packages/icons/dist .static/icons
cp -R packages/theme/dist/* .static/theme
cp -R packages/theme/dist .static/theme
cp -R packages/storybook-docs/storybook-static/* .static/storybook-docs
echo Size of demo:
du -d 1 -h .static
