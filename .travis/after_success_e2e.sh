#!/usr/bin/env bash
set -e

echo "E2E TESTS"
cd packages/components/e2e/component-objects
if [ "$TRAVIS_PULL_REQUEST" == 'false' ] && [ "$TRAVIS_BRANCH" == 'master' ]; then
	# check master
	#launch cypress
	CYPRESS_baseUrl=http://talend.surge.sh/components yarn run e2e
	echo "✓ E2E tests on talend.surge.sh"
elif [ "$TRAVIS_PULL_REQUEST" != 'false' ]; then
	#check on branch
	#launch cypress
	CYPRESS_baseUrl=$TRAVIS_PULL_REQUEST.talend.surge.sh/components yarn run e2e
else
    echo "✓ No storybook to test"
fi
cd "$TRAVIS_BUILD_DIR"
