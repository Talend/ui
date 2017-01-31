#!/usr/bin/env bash

echo "DEPLOY"
cd "$TRAVIS_BUILD_DIR"
echo "✓ Move to Travis build dir"
if [ "$TRAVIS_PULL_REQUEST" == false ] && [ "$TRAVIS_BRANCH" == 'master' ]; then
	echo "✓ Deploy showcases to somewhere"
else
    lerna exec --scope=talend-icons -- yarn run docs
	echo "✓ Run icons docs with Lerna"
	cd packages/icons/docs
	echo "✓ Move to icons docs dir"
	surge --domain "talend-ui.$TRAVIS_PULL_REQUEST.surge.sh"
	echo "✓ Deploy PR#$TRAVIS_PULL_REQUEST to talend-ui.$TRAVIS_PULL_REQUEST.surge.sh"
fi
cd "$TRAVIS_BUILD_DIR"
echo "✓ Move to Travis build dir"
