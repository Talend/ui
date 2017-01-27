#!/usr/bin/env bash
#!/bin/bash
set -e

if [ "$TRAVIS_PULL_REQUEST" != "false" ]; then
	git config user.name 'travis'
	git config user.email no-reply@travis.com

	git checkout $TRAVIS_BRANCH
	git add packages/theme/screenshots
	git add packages/components/screenshots
	git commit -m 'Update screenshots from CI'

	git add output
	git commit -m 'Update code style outputs from CI'

	git push -f -q https://jmfrancois:$GITHUB_API_KEY@github.com/Talend/ui $TRAVIS_BRANCH &> /dev/null
	echo "✓ Push screenshots to $TRAVIS_BRANCH"
fi
