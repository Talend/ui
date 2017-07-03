#!/usr/bin/env bash

if [ "$TRAVIS_PULL_REQUEST" != 'false' ]; then
    nohup http-server .static/ -p 1337 >/dev/null 2>&1 &
    sleep 5
    echo "✓ Start static server"

	#lerna exec --scope=react-talend-components -- yarn run test:slimerjs
	#echo "✓ Run yarn test:slimerjs script for components"

	lerna exec --scope=bootstrap-talend-theme -- yarn run test:slimerjs
	echo "✓ Run yarn test:slimerjs script for theme"
fi
