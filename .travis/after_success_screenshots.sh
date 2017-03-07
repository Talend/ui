#!/usr/bin/env bash

if [ "$TRAVIS_BRANCH" != 'master' ]; then
	#lerna exec --scope=react-talend-components -- yarn run test:slimerjs
	#echo "✓ Run yarn test:slimerjs script for components"

	lerna exec --scope=bootstrap-talend-theme -- yarn run test:slimerjs
	echo "✓ Run yarn test:slimerjs script for theme"
fi
