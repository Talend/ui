#!/usr/bin/env bash

echo "STORYBOOK"
cd "$TRAVIS_BUILD_DIR"

lerna exec --scope=@talend/react-cmf -- jsdoc -c docs.json
cp -R packages/cmf/docs/jsdoc .static/cmf
echo "✓ Copy cmf jsdoc to .static"

lerna exec --scope=@talend/react-components -- yarn run build-storybook
cp -R packages/components/storybook-static/* .static/components
echo "✓ Copy components showcase to .static"

lerna exec --scope=@talend/react-containers -- yarn run build-storybook
cp -R packages/containers/storybook-static/* .static/containers
echo "✓ Copy containers showcase to .static"

lerna exec --scope=@talend/react-forms -- yarn run build-storybook
cp -R packages/forms/storybook-static/* .static/forms
echo "✓ Copy forms showcase to .static"

lerna exec --scope=@talend/icons -- yarn run docs
cp -R packages/icons/docs/index.html .static/icons
echo "✓ Copy icons showcase to .static"

cp -R packages/theme/example/index.html .static/theme
cp -R packages/theme/dist .static/theme
echo "✓ Copy theme showcase to .static"
