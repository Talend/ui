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
        git push -f -q https://frassinier:$GITHUB_API_KEY@github.com/Talend/react-talend-components gh-pages &> /dev/null
        echo "✓ Push storybook-static/ content to gh-pages"
    else
        echo "Building PR #$TRAVIS_PULL_REQUEST from branch $TRAVIS_BRANCH"
        yarn run build-storybook
        yarn global add http-server
        nohup http-server storybook-static/ -p 1337 >/dev/null 2>&1 &
        #nohup yarn start >/dev/null 2>&1 &
        sleep 5
        echo "✓ Start storybook server"
        yarn run test:slimerjs
        yarn run lint:es 1> output/eslint.txt
        yarn run lint:styles 1> output/sass-lint.txt
        echo "✓ Run yarn test:slimerjs script"
        if [ "$TRAVIS_BRANCH" != 'master' ]; then
            git checkout $TRAVIS_BRANCH
            git add screenshots/
            git add output/
            git -c user.name='travis' -c user.email='travis' commit -m 'Update screenshots from CI'
            git push -f -q https://frassinier:$GITHUB_API_KEY@github.com/Talend/react-talend-components $TRAVIS_BRANCH &> /dev/null
            echo "✓ Push screenshots to $TRAVIS_BRANCH"
        fi
    fi
    cd "$TRAVIS_BUILD_DIR"
fi
