#!/usr/bin/env bash

if [ -n "$GITHUB_API_KEY" ]; then
    cd "$TRAVIS_BUILD_DIR"
    if [ "$TRAVIS_PULL_REQUEST" == false ] && [ "$TRAVIS_BRANCH" == 'master' ]; then
        echo "Build branch master"
        npm run semantic-release
        echo "✓ Run NPM semantic-release script"
        # This generates a `docs` directory containing demo and sassdoc
        npm run build-storybook
        echo "✓ Create storybook-static directory"
        # Publish on gh-pages
        cd storybook-static
        git init
        git checkout -b gh-pages
        git add .
        git -c user.name='travis' -c user.email='travis' commit -m 'Generate gh-pages from CI'
        git push -f -q https://frassinier:$GITHUB_API_KEY@github.com/Talend/react-talend-forms gh-pages &> /dev/null
        echo "✓ Push storybook-static/ content to gh-pages"
    else
        echo "Building PR #$TRAVIS_PULL_REQUEST from branch $TRAVIS_BRANCH"
    fi
    cd "$TRAVIS_BUILD_DIR"
    curl -Lo travis_after_all.py https://git.io/travis_after_all
    python travis_after_all.py
    export $(cat .to_export_back) &> /dev/null
fi
