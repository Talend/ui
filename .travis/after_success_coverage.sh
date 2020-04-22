#!/usr/bin/env bash

if [ "$ACTION" == 'test' ]; then
    echo "COVERAGE"
    cd "$TRAVIS_BUILD_DIR"

    rm -rf .static/cmf/coverage
    cp -R packages/cmf/coverage/lcov-report/ .static/cmf/coverage
    echo "✓ Copy cmf coverage to .static"

    rm -rf .static/components/coverage
    cp -R packages/components/coverage/lcov-report/ .static/components/coverage
    echo "✓ Copy components coverage to .static"

    rm -rf .static/containers/coverage
    cp -R packages/containers/coverage/lcov-report/ .static/containers/coverage
    echo "✓ Copy containers coverage to .static"

    rm -rf .static/forms/coverage
    cp -R packages/forms/coverage/lcov-report/ .static/forms/coverage
    echo "✓ Copy forms coverage to .static"

    rm -rf .static/datagrid/coverage
    cp -R packages/datagrid/coverage/lcov-report/ .static/datagrid/coverage
    echo "✓ Copy datagrid coverage to .static"

    rm -rf .static/stepper/coverage
    cp -R packages/stepper/coverage/lcov-report/ .static/stepper/coverage
    echo "✓ Copy stepper coverage to .static"
else
    echo "✓ no COVERAGE to copy"
fi
