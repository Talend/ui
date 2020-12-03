#!/usr/bin/env bash

echo "DEPLOY"
cd "$TRAVIS_BUILD_DIR"
if [ "$TRAVIS_PULL_REQUEST" == 'false' ] && [ "$TRAVIS_BRANCH" == 'master' ]; then
	surge --project .static --domain "talend.surge.sh"
	echo "✓ Deploy to talend.surge.sh"
elif [ "$TRAVIS_PULL_REQUEST" == 'false' ] && [ "$TRAVIS_BRANCH" == 'jsomsanith/chore/6_0' ]; then
	surge --project .static --domain "6_0.talend.surge.sh"
	echo "✓ Deploy to talend.surge.sh"
elif [ "$TRAVIS_PULL_REQUEST" != 'false' ]; then
    surge --project .static --domain "$TRAVIS_PULL_REQUEST.talend.surge.sh"
    echo "✓ Deploy PR#$TRAVIS_PULL_REQUEST to $TRAVIS_PULL_REQUEST.talend.surge.sh"
    curl -f -XPOST -H "Authorization: token $GH_TOKEN" https://api.github.com/repos/Talend/ui/issues/$TRAVIS_PULL_REQUEST/comments -d "{\"body\": \":octocat: [Demo is available here](http://$TRAVIS_PULL_REQUEST.talend.surge.sh) \"}"
else
    echo "✓ No storybook to publish"
fi
cd "$TRAVIS_BUILD_DIR"
