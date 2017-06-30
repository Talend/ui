#!/usr/bin/env bash

mkdir -p .static

mkdir .static/cmf
rm -rf .static/cmf/coverage
cp -R packages/cmf/coverage/lcov-report/ .static/cmf/coverage
echo "✓ Copy cmf coverage to .static"

mkdir .static/components
rm -rf .static/components/coverage
cp -R packages/components/coverage/lcov-report/ .static/components/coverage
echo "✓ Copy components coverage to .static"

mkdir .static/containers
rm -rf .static/containers/coverage
cp -R packages/containers/coverage/lcov-report/ .static/containers/coverage
echo "✓ Copy containers coverage to .static"

lerna exec --scope=react-talend-forms -- yarn run test:cov
mkdir .static/forms
rm -rf .static/forms/coverage
cp -R packages/forms/coverage/lcov-report/ .static/forms/coverage
echo "✓ Copy forms coverage to .static"

lerna exec --scope=talend-log -- yarn run test:cov
mkdir .static/logging
rm -rf .static/logging/coverage
cp -R packages/logging/coverage/lcov-report/ .static/logging/coverage
echo "✓ Copy logging coverage to .static"

echo "✓ Run coverage"
