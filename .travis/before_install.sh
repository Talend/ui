#!/bin/bash
set -e

if [ "$TRAVIS_PULL_REQUEST" != "false" ]; then
	echo "We are in a pull request, not setting up release"
	exit 0
fi

if [[ $TRAVIS_BRANCH == 'master' ]]; then
	rm -rf .git
	git init
	git clean -dfx
	git remote add origin https://github.com/Talend/ui.git
	git fetch origin
	git clone https://github.com/$TRAVIS_REPO_SLUG.git $TRAVIS_REPO_SLUG
	git checkout $TRAVIS_BRANCH

	git config credential.helper store
	echo "https://build-travis-ci:${GH_TOKEN}@github.com/Talend/ui.git" > ~/.git-credentials

	npm prune

	git config --global user.email "build-travis-ci@talend.com"
	git config --global user.name "Talend travis ci"
	git config --global push.default simple

	git fetch --tags
	git branch -u origin/$TRAVIS_BRANCH
	git fsck --full #debug
fi
