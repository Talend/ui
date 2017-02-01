#!/usr/bin/env bash

echo "DEPLOY"
cd "$TRAVIS_BUILD_DIR"
if [ "$TRAVIS_PULL_REQUEST" == 'false' ] && [ "$TRAVIS_BRANCH" == 'master' ]; then
	echo "✓ TODO: Deploy showcases to somewhere"
else
	if [ "$TRAVIS_PULL_REQUEST" != 'false' ]; then
		surge --project .static --domain "talend-ui.$TRAVIS_PULL_REQUEST.surge.sh"
		echo "✓ Deploy PR#$TRAVIS_PULL_REQUEST to talend-ui.$TRAVIS_PULL_REQUEST.surge.sh"
	fi
fi
cd "$TRAVIS_BUILD_DIR"
