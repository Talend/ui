#!/bin/sh

echo "Prepare demo folder before execute surge"
mkdir .static
mkdir .static/cmf
mkdir .static/components
mkdir .static/containers
mkdir .static/playground
mkdir .static/dataviz
mkdir .static/forms
mkdir .static/icons
mkdir .static/theme
mkdir .static/datagrid
mkdir .static/stepper
cp .surge/index.html .static
cp -R packages/cmf/jsdoc .static/cmf
cp -R packages/cmf/website/build/cmf-doc/* .static/cmf
cp -R packages/components/storybook-static/* .static/components
cp -R packages/containers/storybook-static/* .static/containers
cp -R packages/playground/dist/* .static/playground
cp -R packages/datagrid/storybook-static/* .static/datagrid
cp -R packages/stepper/storybook-static/* .static/stepper
cp -R packages/forms/storybook-static/* .static/forms
cp -R packages/dataviz/storybook-static/* .static/dataviz
cp -R packages/icons/docs/index.html .static/icons
cp -R packages/icons/dist .static/icons
cp -R packages/theme/dist/* .static/theme
cp -R packages/theme/dist .static/theme

mkdir -p .static/@talend/react-cmf/dist
cp -R packages/cmf/dist/* .static/@talend/react-cmf/dist
echo "✓ Copy cmf UMD to .static"

mkdir -p .static/@talend/react-cmf-cqrs/dist
cp -R packages/cmf-cqrs/dist/* .static/@talend/react-cmf-cqrs/dist
echo "✓ Copy cmf-cqrs UMD to .static"

mkdir -p .static/@talend/react-components/dist
cp -R packages/components/dist/* .static/@talend/react-components/dist
echo "✓ Copy components UMD to .static"

mkdir -p .static/@talend/react-containers/dist
cp -R packages/containers/dist/* .static/@talend/react-containers/dist
echo "✓ Copy containers UMD to .static"

mkdir -p .static/@talend/react-datagrid/dist
cp -R packages/datagrid/dist/* .static/@talend/react-datagrid/dist
echo "✓ Copy datagrid UMD to .static"

mkdir -p .static/@talend/react-forms/dist
cp -R packages/forms/dist/* .static/@talend/react-forms/dist
echo "✓ Copy forms UMD to .static"

mkdir -p .static/@talend/icons/dist
cp -R packages/icons/dist/* .static/@talend/icons/dist
echo "✓ Copy icons UMD to .static"

mkdir -p .static/@talend/react-cmf-router/dist
cp -R packages/cmf-router/dist/* .static/@talend/react-cmf-router/dist
echo "✓ Copy cmf-router UMD to .static"

mkdir -p .static/@talend/react-sagas/dist
cp -R packages/sagas/dist/* .static/@talend/react-sagas/dist
echo "✓ Copy sagas UMD to .static"

mkdir -p .static/@talend/react-stepper/dist
cp -R packages/stepper/dist/* .static/@talend/react-stepper/dist
echo "✓ Copy stepper UMD to .static"

mkdir -p .static/@talend/bootstrap-theme/dist
cp -R packages/theme/dist/* .static/@talend/bootstrap-theme/dist
echo "✓ Copy bootstrap-theme UMD to .static"
