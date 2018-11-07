#!/usr/bin/env bash
set -e

echo "E2E TESTS"
cd packages/components/e2e/component-objects
if [ "$TRAVIS_PULL_REQUEST" == 'false' ] && [ "$TRAVIS_BRANCH" == 'master' ]; then
	CYPRESS_baseUrl=http://talend.surge.sh/components yarn 2e2
	echo "✓ E2E tests on talend.surge.sh"
elif [ "$TRAVIS_PULL_REQUEST" != 'false' ]; then
	CYPRESS_baseUrl=$TRAVIS_PULL_REQUEST.talend.surge.sh/components yarn 2e2
else
    echo "✓ No storybook to test"
fi
cd "$TRAVIS_BUILD_DIR"
