#!/bin/bash

if [ -n "$GITHUB_API_KEY" ]; then
    cd "$TRAVIS_BUILD_DIR"
    if [ "$TRAVIS_PULL_REQUEST" == false ] && [ "$TRAVIS_BRANCH" == 'master' ]; then
        echo "Build branch master"
        npm run semantic-release
        echo "✓ Run NPM semantic-release script"
        # This generates a `docs` directory containing demo and sassdoc
        mkdir docs
        echo "✓ Create docs directory"
        cp example/index.html docs/index.html
        echo "✓ Copy HTML example to docs/"
        cp -R dist/* docs
        echo "✓ Copy assets to docs/"
        # Publish on gh-pages
        cd docs
        git init
        git checkout -b gh-pages
        git add .
        git -c user.name='travis' -c user.email='travis' commit -m 'Generate gh-pages from CI'
        git push -f -q https://frassinier:$GITHUB_API_KEY@github.com/Talend/bootstrap-theme gh-pages &> /dev/null
        echo "✓ Push docs/ content to gh-pages"
    else
        echo "Building PR #$TRAVIS_PULL_REQUEST from branch $TRAVIS_BRANCH"
        cp example/index.html dist/
        echo "✓ Copy HTML example to dist/"
        nohup http-server dist/ -p 8080 >/dev/null 2>&1 &
        echo "✓ Start static server"
        npm run test:rebase
        echo "✓ Run NPM test:rebase script"
        if [ "$TRAVIS_BRANCH" != 'master' ]; then
            git checkout $TRAVIS_BRANCH
            git add screenshots/
            git -c user.name='travis' -c user.email='travis' commit -m 'Update screenshots generated from PhantomCSS'
            git push -f -q https://frassinier:$GITHUB_API_KEY@github.com/Talend/bootstrap-theme $TRAVIS_BRANCH &> /dev/null
            echo "✓ Push screenshots to $TRAVIS_BRANCH"
        fi
    fi
    cd "$TRAVIS_BUILD_DIR"
    curl -Lo travis_after_all.py https://git.io/travis_after_all
    python travis_after_all.py
    export $(cat .to_export_back) &> /dev/null
fi
