#!/usr/bin/env bash

if [ -n "$GH_TOKEN" ]; then
    cd "$TRAVIS_BUILD_DIR"
    if [ "$TRAVIS_PULL_REQUEST" == false ] && [ "$TRAVIS_BRANCH" == 'master' ]; then
        echo "Build branch master"
        npm run semantic-release
        echo "✓ Run NPM semantic-release script"
        # This generates a `docs` directory containing demo and sassdoc
        npm run build-storybook
        npm run docs:cleanup
        npm run docs:js
        echo "✓ Create storybook-static directory"
        # Publish on gh-pages
        cd docs
        git init
        git checkout -b gh-pages
        git add .
        git -c user.name='travis' -c user.email='travis' commit -m 'Generate gh-pages from CI'
        git push -f -q https://jmfrancois:$GH_TOKEN@github.com/Talend/react-talend-containers gh-pages &> /dev/null
        echo "✓ Push storybook-static/ content to gh-pages"
    else
        echo "Building PR #$TRAVIS_PULL_REQUEST from branch $TRAVIS_BRANCH"
    fi
    cd "$TRAVIS_BUILD_DIR"
fi
