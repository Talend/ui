#!/usr/bin/env bash

echo "cp UMD"
cd "$TRAVIS_BUILD_DIR"

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
cp -R packages/router/dist/* .static/@talend/react-cmf-router/dist
echo "✓ Copy router UMD to .static"

mkdir -p .static/@talend/react-sagas/dist
cp -R packages/sagas/dist/* .static/@talend/react-sagas/dist
echo "✓ Copy sagas UMD to .static"

mkdir -p .static/@talend/react-stepper/dist
cp -R packages/stepper/dist/* .static/@talend/react-stepper/dist
echo "✓ Copy stepper UMD to .static"

mkdir -p .static/@talend/bootstrap-theme/dist
cp -R packages/theme/dist/* .static/@talend/bootstrap-theme/dist
echo "✓ Copy bootstrap-theme UMD to .static"
