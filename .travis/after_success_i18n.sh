#!/usr/bin/env bash

echo "I18N"
cd "$TRAVIS_BUILD_DIR"
if [ "$TRAVIS_PULL_REQUEST" == 'false' ] && [ "$TRAVIS_BRANCH" == 'master' ]; then
    curl
        -F "files[/tui-components.json]=@i18n/components/en/tui-components.json"
        -F "files[/tui-forms.json]=@i18n/forms/en/tui-forms.json"
        https://api.crowdin.com/api/project/talendui/update-file?key=$CROWDIN_TOKEN
	echo "✓ Pushed new keys to crowdin"
else
    echo "✓ No i18n needed"
fi
cd "$TRAVIS_BUILD_DIR"
