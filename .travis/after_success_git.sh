#!/usr/bin/env bash
#!/bin/bash

if [ -n "$GH_TOKEN" ]; then
    cd "$TRAVIS_BUILD_DIR"
    if [ "$TRAVIS_PULL_REQUEST" != "false" ] && [ "$TRAVIS_BRANCH" != 'master' ]; then
        git config user.name 'travis'
        git config user.email no-reply@travis.com

        git status
        git checkout $TRAVIS_BRANCH
        echo "✓ Checkout $TRAVIS_BRANCH"

        git add packages/theme/screenshots
        git add packages/components/screenshots
        git commit -m 'tests: update screenshots'
        echo "✓ Commit updated screenshots to $TRAVIS_BRANCH"

        git add output
        git commit -m 'Update code style outputs from CI'
        echo "✓ Commit updated lint output to $TRAVIS_BRANCH"

        git push -f -q https://jmfrancois:$GH_TOKEN@github.com/Talend/ui $TRAVIS_BRANCH &> /dev/null
        echo "✓ Push to $TRAVIS_BRANCH"
    fi
    cd "$TRAVIS_BUILD_DIR"
fi
