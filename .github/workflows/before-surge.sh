#!/bin/sh

echo "Prepare demo folder before execute surge"
rm -rf .static
mkdir .static
mkdir .static/cmf
mkdir .static/components
mkdir .static/containers
mkdir .static/dataviz
mkdir .static/design-system
mkdir .static/design-system-docs
mkdir .static/faceted-search
mkdir .static/forms
mkdir .static/icons
mkdir .static/theme
mkdir .static/storybook-docs
mkdir .static/storybook-one
cp .surge/index.html .static
cp -R packages/cmf/jsdoc .static/cmf
cp -R packages/containers/storybook-static/* .static/containers
cp -R packages/storybook-one/storybook-static/* .static/storybook-one
cp -R packages/design-system-docs/storybook-static/* .static/design-system
cp -R packages/icons/dist .static/icons
cp -R packages/theme/dist/* .static/theme
cp -R packages/theme/dist .static/theme
cp -R packages/storybook-docs/storybook-static/* .static/storybook-docs
echo Size of demo:
du -d 1 -h .static
