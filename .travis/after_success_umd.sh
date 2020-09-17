#!/usr/bin/env bash

echo "cp UMD"
cd "$TRAVIS_BUILD_DIR"

cp -R packages/cmf/dist/* .static
echo "✓ Copy cmf UMD to .static"

cp -R packages/cmf-cqrs/dist/* .static
echo "✓ Copy cmf-cqrs UMD to .static"

cp -R packages/components/dist/* .static
echo "✓ Copy components UMD to .static"

cp -R packages/containers/dist/* .static
echo "✓ Copy containers UMD to .static"

cp -R packages/datagrid/dist/* .static
echo "✓ Copy datagrid UMD to .static"

# cp -R packages/faceted-search/dist/* .static
# echo "✓ Copy faceted-search UMD to .static"

cp -R packages/forms/dist/* .static
echo "✓ Copy forms UMD to .static"

cp -R packages/icons/dist/* .static
echo "✓ Copy icons UMD to .static"

cp -R packages/stepper/dist/* .static
echo "✓ Copy stepper UMD to .static"

cp -R packages/theme/dist/* .static
echo "✓ Copy theme UMD to .static"
