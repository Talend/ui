#!/usr/bin/env bash

echo "CHROMA"
echo "TRAVIS_EVENT_TYPE : $TRAVIS_EVENT_TYPE"
echo "TRAVIS_PULL_REQUEST_SLUG : $TRAVIS_PULL_REQUEST_SLUG"
echo "TRAVIS_REPO_SLUG : $TRAVIS_REPO_SLUG"
if [[ $TRAVIS_EVENT_TYPE != 'pull_request' ||  $TRAVIS_PULL_REQUEST_SLUG != $TRAVIS_REPO_SLUG ]];
then
    yarn chroma
    echo "✓ Chroma published for PR"
fi

 # https://docs.chromaticqa.com/setup_ci#configuring-specific-ci-services
echo "✓ No chroma to publish: it's an internal PR event, we publish only on push. For more details: https://docs.chromaticqa.com/setup_ci#configuring-specific-ci-services"
exit 0;


# if [ "$TRAVIS_PULL_REQUEST" == 'false' ] && [ "$TRAVIS_BRANCH" == 'master' ]; then
# 	yarn chroma --auto-accept-changes
#     echo "✓ Chroma published for master with all changes automatically accepted"
# elif [ "$TRAVIS_PULL_REQUEST" != 'false' ]; then
#     yarn chroma
#     echo "✓ Chroma published for PR"
# else
#     echo "✓ No chroma to publish"
# fi
