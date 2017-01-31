#!/usr/bin/env bash

echo "DEPLOY"
cd "$TRAVIS_BUILD_DIR"
if [ "$TRAVIS_PULL_REQUEST" == 'false' ] && [ "$TRAVIS_BRANCH" == 'master' ]; then
	echo "✓ Deploy showcases to somewhere"
else
    mkdir .tmp
    cp .surge/index.html .tmp
	echo "✓ Copy showcase index.html"
    mkdir -p .tmp/icons
    lerna exec --scope=talend-icons -- yarn run docs
    mv packages/icons/docs .tmp/icons
	echo "✓ Move icons showcase"
    mkdir -p .tmp/theme
    mv packages/theme/example/index.html .tmp/theme
    mv packages/theme/dist .tmp/theme
	echo "✓ Move theme showcase"
	ls -larth .tmp
	surge --project .tmp --domain "talend-ui.$TRAVIS_PULL_REQUEST.surge.sh"
	echo "✓ Deploy PR#$TRAVIS_PULL_REQUEST to talend-ui.$TRAVIS_PULL_REQUEST.surge.sh"
fi
cd "$TRAVIS_BUILD_DIR"
