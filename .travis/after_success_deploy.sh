#!/usr/bin/env bash

echo "DEPLOY"
cd "$TRAVIS_BUILD_DIR"
if [ "$TRAVIS_PULL_REQUEST" == 'false' ] && [ "$TRAVIS_BRANCH" == 'master' ]; then
	echo "✓ Deploy showcases to somewhere"
else
    if [ "$TRAVIS_PULL_REQUEST" != 'false' ]; then
        mkdir .tmp
        cp .surge/index.html .tmp
	    echo "✓ Copy showcase index.html"
        mkdir -p .tmp/icons
        lerna exec --scope=talend-icons -- yarn run docs
        mv -v packages/icons/docs/index.html .tmp/icons
	    echo "✓ Move icons showcase"
        mkdir -p .tmp/theme
        mv -v packages/theme/example/index.html .tmp/theme
        mv -v packages/theme/dist .tmp/theme
	    echo "✓ Move theme showcase"
	    find .tmp/
	    surge --project .tmp --domain "talend-ui.$TRAVIS_PULL_REQUEST.surge.sh"
	    echo "✓ Deploy PR#$TRAVIS_PULL_REQUEST to talend-ui.$TRAVIS_PULL_REQUEST.surge.sh"
    fi
fi
cd "$TRAVIS_BUILD_DIR"
