#!/usr/bin/env bash

if [ "$TRAVIS_BRANCH" != 'master' ]; then
    #lerna exec --scope=react-talend-components -- yarn run build-storybook
    #lerna exec --scope=react-talend-containers -- yarn run build-storybook

    cp packages/theme/example/index.html packages/theme/dist
    nohup http-server packages/theme/dist -p 1337 >/dev/null 2>&1 &
    echo "✓ Start static server"

    lerna exec --scope=bootstrap-talend-theme -- yarn run test:slimerjs
    #lerna exec --scope=react-talend-components -- yarn run test:slimerjs
    echo "✓ Run yarn test:slimerjs script"
fi
