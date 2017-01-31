#!/usr/bin/env bash

cd "$TRAVIS_BUILD_DIR"
if [ "$TRAVIS_PULL_REQUEST" == false ] && [ "$TRAVIS_BRANCH" == 'master' ]; then
	echo "✓ Deploy showcases to somewhere"
else
    lerna exec --scope=talend-icons -- yarn run docs
	cd packages/icons/docs
	surge --domain "talend-ui.$TRAVIS_PULL_REQUEST.surge.sh"
	echo "✓ Deploy PR#$TRAVIS_PULL_REQUEST to talend-ui.$TRAVIS_PULL_REQUEST.surge.sh"
fi
cd "$TRAVIS_BUILD_DIR"
