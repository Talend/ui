#!/bin/bash
set -e

if [ "$TRAVIS_PULL_REQUEST" != "false" ]; then
	echo "We are in a pull request, not setting up release"
	exit 0
fi

echo "Remove stack dependencies in case they have been linked by lerna bootstrap"
rm -rf packages/containers/node_modules/react-talend-components/node_modules
rm -rf packages/forms/node_modules/react-talend-components/node_modules
rm -rf packages/containers/node_modules/talend-icons/node_modules
rm -rf packages/components/node_modules/talend-icons/node_modules
rm -rf packages/forms/node_modules/talend-icons/node_modules
rm -rf packages/containers/node_modules/react-cmf/node_modules
rm -rf packages/components/node_modules/bootstrap-talend-theme/node_modules
rm -rf packages/containers/node_modules/bootstrap-talend-theme/node_modules
rm -rf packages/forms/node_modules/bootstrap-talend-theme/node_modules

if [[ $TRAVIS_BRANCH == 'master' ]]; then
	rm -rf .git
	git init
	git clean -dfx
	git remote add origin https://github.com/Talend/ui.git
	git fetch origin
	git clone https://github.com/$TRAVIS_REPO_SLUG.git $TRAVIS_REPO_SLUG
	git checkout $TRAVIS_BRANCH

	git config credential.helper store
	echo "https://jmfrancois:${RELEASE_GH_TOKEN}@github.com/Talend/ui.git" > ~/.git-credentials

	npm config set //registry.npmjs.org/:_authToken=$NPM_TOKEN -q
	npm prune

	git config --global user.email "jmfrancois+lerna-ui-travis-ci@talend.com"
	git config --global user.name "Jean-Michel FRANCOIS"
	git config --global push.default simple

	# git remote set-url origin "https://github.com/Talend/ui.git"
	# git fetch --unshallow
	git fetch --tags
	git branch -u origin/$TRAVIS_BRANCH
	git fsck --full #debug
	#git tag --list #debug
	npm whoami #debug
fi
