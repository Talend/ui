#!/bin/bash

if [ -n "$GH_TOKEN" ]; then
	if [ "$TRAVIS_PULL_REQUEST" != false ] && [ "$TRAVIS_BRANCH" == 'master' ]; then
		echo "IN PULL_REQUEST target to the master"
	fi
	if [ "$TRAVIS_PULL_REQUEST" == false ] && [ "$TRAVIS_BRANCH" == 'master' ]; then
		cd "$TRAVIS_BUILD_DIR"
		npm run docs
		cd docs
		git add .
		git -c user.name='travis' -c user.email='travis' commit -m 'Generate docs from CI'
		git push -f -q https://jmfrancois:$GH_TOKEN@github.com/Talend/icons master &> /dev/null
		echo "✓ Push docs"
	fi
fi
