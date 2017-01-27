#!/usr/bin/env bash
#!/bin/bash
set -e

if [ "$TRAVIS_PULL_REQUEST" != false ] && [ "$TRAVIS_BRANCH" != 'master' ]; then
    nohup http-server packages -p 1337 >/dev/null 2>&1 &
    echo "✓ Start storybook server"

    echo "Building PR #$TRAVIS_PULL_REQUEST from branch $TRAVIS_BRANCH"
    cp packages/theme/example/* packages/theme/dist/
    lerna exec --scope=react-talend-components -- yarn run build-storybook
    lerna exec --scope=react-talend-containers -- yarn run build-storybook

    lerna exec --scope=bootstrap-talend-theme -- yarn run test:slimerjs
    lerna exec --scope=react-talend-components -- yarn run test:slimerjs
    echo "✓ Run yarn test:slimerjs script"
fi
