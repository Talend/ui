#!/bin/sh

echo "Prepare demo folder before execute surge"
rm -rf .static
mkdir .static
mkdir .static/cmf
mkdir .static/containers
mkdir .static/design-system
mkdir .static/faceted-search
mkdir .static/theme
mkdir .static/storybook-one
cp .surge/index.html .static
cp -R packages/cmf/jsdoc .static/cmf
cp -R packages/containers/storybook-static/* .static/containers
cp -R packages/storybook-one/storybook-static/* .static/storybook-one
cp -R packages/design-docs/storybook-static/* .static/design-system
cp -R packages/theme/dist/* .static/theme
echo Size of demo:
du -d 1 -h .static
