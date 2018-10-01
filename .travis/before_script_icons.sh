#!/usr/bin/env bash

echo "OPTIMIZE ICONS"
cd "$TRAVIS_BUILD_DIR"
echo "$TRAVIS_PULL_REQUEST"
echo "$TALEND_COMMIT_MSG"
if [ "$TRAVIS_PULL_REQUEST" != 'false' ] && [[ "$TALEND_COMMIT_MSG" =~ 'icon' ]]; then
	lerna exec --scope=@talend/icons -- npm run svgo
	echo "✓ Icons have been optimized"
	npm run build-icons
	echo "✓ Components snapshots have been updated with optimized icons"
else
	echo "✓ No icons to optimize"
fi
cd "$TRAVIS_BUILD_DIR"
