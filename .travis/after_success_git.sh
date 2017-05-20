#!/usr/bin/env bash

echo "GIT"
echo "TRAVIS_BRANCH=$TRAVIS_BRANCH"
echo "TRAVIS_BUILD_DIR=$TRAVIS_BUILD_DIR"
echo "TRAVIS_PULL_REQUEST_BRANCH=$TRAVIS_PULL_REQUEST_BRANCH"

if [ -n "$GH_TOKEN" ]; then
	echo "✓ GH Token is here"
	cd "$TRAVIS_BUILD_DIR"
	echo "✓ Move to Travis build dir"
	if [ "$TRAVIS_BRANCH" != 'master' ]; then
		git checkout $TRAVIS_BRANCH
		echo "✓ Checkout $TRAVIS_BRANCH"
		git add packages/theme/screenshots/
		git add packages/components/screenshots/
		echo "git status"
		git status
		git -c user.name="travis" -c user.email="travis" commit -m "test(ci): update screenshots"
		echo "✓ Commit updated screenshots to $TRAVIS_BRANCH"

		git add output/
		git -c user.name="travis" -c user.email="travis" commit -m "test(ci): update code style outputs"
		echo "✓ Commit updated lint output to $TRAVIS_BRANCH"

		git add packages/cmf/package.json
		git add packages/components/package.json
		git add packages/containers/package.json
		git add packages/forms/package.json
		git add packages/generator/package.json
		git add packages/icons/package.json
		git add packages/logging/package.json
		git add packages/theme/package.json
		git -c user.name="travis" -c user.email="travis" commit -m "test(ci): update dependencies"
		echo "✓ Commit updated deps to $TRAVIS_BRANCH"

		git push -q https://build-travis-ci:$GH_TOKEN@github.com/Talend/ui $TRAVIS_BRANCH
		echo "✓ Push to $TRAVIS_BRANCH"
	fi
	cd "$TRAVIS_BUILD_DIR"
	echo "✓ Move to Travis build dir"
fi
