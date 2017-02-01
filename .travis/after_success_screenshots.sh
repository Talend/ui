#!/usr/bin/env bash

if [ "$TRAVIS_BRANCH" != 'master' ]; then
    lerna exec --scope=react-talend-components -- yarn run build-storybook

    mkdir .static
    cp packages/components/storybook-static .static/components
    nohup http-server .static/ -p 1337 >/dev/null 2>&1 &
    echo "✓ Start static server"

    lerna exec --scope=react-talend-components -- yarn run test:slimerjs
    echo "✓ Run yarn test:slimerjs script for components"

    rm -rf .static/*

    cp packages/theme/dist .static
    cp packages/theme/example/index.html .static

    lerna exec --scope=bootstrap-talend-theme -- yarn run test:slimerjs
    echo "✓ Run yarn test:slimerjs script for theme"
fi
