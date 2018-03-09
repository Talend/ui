#!/usr/bin/env bash

echo "E2E TESTS"
cd packages/components/e2e/component-objects
if [ "$TRAVIS_PULL_REQUEST" == 'false' ] && [ "$TRAVIS_BRANCH" == 'master' ]; then
	mvn clean verify -Premote -Dstorybook.host="talend.surge.sh" -Dstorybook.port=80 -Dstorybook.context="/components/"
	echo "✓ E2E tests on talend.surge.sh"
elif [ "$TRAVIS_PULL_REQUEST" != 'false' ]; then
    mvn clean verify -Premote -Dstorybook.host="$TRAVIS_PULL_REQUEST.talend.surge.sh" -Dstorybook.port=80 -Dstorybook.context="/components/"
    echo "✓ E2E tests for PR#$TRAVIS_PULL_REQUEST on $TRAVIS_PULL_REQUEST.talend.surge.sh"
else
    echo "✓ No storybook to test"
fi
cd "$TRAVIS_BUILD_DIR"
