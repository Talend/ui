#!/usr/bin/env bash

echo "OPTIMIZE ICONS"
cd "$TRAVIS_BUILD_DIR"
if [ "$TRAVIS_PULL_REQUEST" != 'false' ]; then
    if [[ "$TALEND_COMMIT_MSG" =~ 'icons' ]]; then
	    lerna exec --scope=@talend/icons -- yarn svgo
    	echo "✓ Icons have been optimized"
	    lerna exec --scope=@talend/react-components -- yarn test -- src/IconsProvider/IconsProvider.test.js -u
    	echo "✓ Components snapshots have been updated with optimized icons"
	fi
else
    echo "✓ No icons to optimize"
fi
cd "$TRAVIS_BUILD_DIR"
