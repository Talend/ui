#!/usr/bin/env bash

echo "CHROMA"
if [[ $TRAVIS_EVENT_TYPE == 'pull_request' &&  $TRAVIS_PULL_REQUEST_SLUG == $TRAVIS_REPO_SLUG ]];
then
    # https://docs.chromaticqa.com/setup_ci#configuring-specific-ci-services
    echo "✓ No chroma to publish: it's an internal PR event, we publish only on push. For more details: https://docs.chromaticqa.com/setup_ci#configuring-specific-ci-services"
    exit 0;
fi
if [ "$TRAVIS_PULL_REQUEST" == 'false' ] && [ "$TRAVIS_BRANCH" == 'master' ]; then
	yarn chroma --auto-accept-changes
elif [ "$TRAVIS_PULL_REQUEST" != 'false' ]; then
    yarn chroma
else
    echo "✓ No chroma to publish"
fi
