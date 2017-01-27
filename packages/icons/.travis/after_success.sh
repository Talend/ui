#!/bin/bash

if [ -n "$GH_TOKEN" ]; then
	if [ "$TRAVIS_PULL_REQUEST" != false ]; then
		echo "Building PR #$TRAVIS_PULL_REQUEST from branch $TRAVIS_BRANCH"
		cd "$TRAVIS_BUILD_DIR"
		npm run svgo
		git add src/svg
		git -c user.name='travis' -c user.email='travis' commit -m 'Optimize SVGs'
		git push -f -q https://jmfrancois:$GH_TOKEN@github.com/Talend/icons $TRAVIS_BRANCH &> /dev/null
		echo "✓ Push SVG to $TRAVIS_BRANCH"
	fi
	if [ "$TRAVIS_PULL_REQUEST" == false ] && [ "$TRAVIS_BRANCH" == 'master' ]; then
		cd "$TRAVIS_BUILD_DIR"
		npm run docs
		cd docs
		git init
		git checkout -b gh-pages
		git add .
		git -c user.name='travis' -c user.email='travis' commit -m 'Generate gh-pages from CI'
		git push -f -q https://jmfrancois:$GH_TOKEN@github.com/Talend/icons gh-pages &> /dev/null
		echo "✓ Push docs"
	fi
fi
