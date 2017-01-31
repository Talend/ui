#!/usr/bin/env bash

echo "GIT"
echo "TRAVIS_BRANCH=$TRAVIS_BRANCH"
echo "TRAVIS_BUILD_DIR=$TRAVIS_BUILD_DIR"
echo "TRAVIS_PULL_REQUEST_BRANCH=$TRAVIS_PULL_REQUEST_BRANCH"

if [ -n "$GH_TOKEN" ]; then
    echo "✓ Token is here"
    cd "$TRAVIS_BUILD_DIR"
    echo "✓ Move to Travis build dir"
    if [ "$TRAVIS_PULL_REQUEST_BRANCH" != "" ]; then
        git config user.name 'travis'
        git config user.email no-reply@travis.com

        echo "git status"
        git status
        echo "git remote -v"
        git remote -v
        echo "git fetch origin"
        git fetch origin
        echo "git checkout $TRAVIS_PULL_REQUEST_BRANCH"
        git checkout $TRAVIS_PULL_REQUEST_BRANCH
        echo "✓ Checkout $TRAVIS_PULL_REQUEST_BRANCH"

        git add packages/theme/screenshots
        git add packages/components/screenshots
        git commit -m 'tests: update screenshots'
        echo "✓ Commit updated screenshots to $TRAVIS_PULL_REQUEST_BRANCH"

        git add output
        git commit -m 'Update code style outputs from CI'
        echo "✓ Commit updated lint output to $TRAVIS_PULL_REQUEST_BRANCH"

        git push -f -q https://jmfrancois:$GH_TOKEN@github.com/Talend/ui $TRAVIS_PULL_REQUEST_BRANCH &> /dev/null
        echo "✓ Push to $TRAVIS_PULL_REQUEST_BRANCH"
    fi
    cd "$TRAVIS_BUILD_DIR"
    echo "✓ Move to Travis build dir"
fi
