#!/usr/bin/env bash

echo "I18N"
cd "$TRAVIS_BUILD_DIR"
if [ "$TRAVIS_PULL_REQUEST" == 'false' ] && [ "$TRAVIS_BRANCH" == 'master' ]; then
    yarn run extract-i18n
    curl \
        -F "files[/tui-components.json]=@packages/components/locales/template/tui-components.json" \
        -F "files[/tui-forms.json]=@packages/forms/locales/template/tui-forms.json" \
        https://api.crowdin.com/api/project/talendui/update-file?key=$CROWDIN_TOKEN
    echo "✓ New keys pushed to crowdin"
else
    echo "✓ No i18n needed"
fi
cd "$TRAVIS_BUILD_DIR"
