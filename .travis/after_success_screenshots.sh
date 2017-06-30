#!/usr/bin/env bash

nohup http-server .static/ -p 1337 >/dev/null 2>&1 &
sleep 5
echo "✓ Start static server"

if [ "$TRAVIS_BRANCH" != 'master' ]; then
	#lerna exec --scope=react-talend-components -- yarn run test:slimerjs
	#echo "✓ Run yarn test:slimerjs script for components"

	lerna exec --scope=bootstrap-talend-theme -- yarn run test:slimerjs
	echo "✓ Run yarn test:slimerjs script for theme"
fi
