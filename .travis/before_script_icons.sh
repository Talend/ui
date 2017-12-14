#!/usr/bin/env bash

echo "OPTIMIZE ICONS"
cd "$TRAVIS_BUILD_DIR"
if [ "$TRAVIS_PULL_REQUEST" == 'false' ] && [ "$TALEND_COMMIT_MSG" =~ 'icon' ]; then
	lerna exec --scope=@talend/icons -- yarn svgo
	echo "✓ Icons have been optimized"
	yarn build-icons
	echo "✓ Components snapshots have been updated with optimized icons"
else
	echo "✓ No icons to optimize"
fi
cd "$TRAVIS_BUILD_DIR"
