#!/usr/bin/env bash
#!/bin/bash
set -e

if [ "$TRAVIS_PULL_REQUEST" != "false" ]; then
	lerna exec --scope=react-cmf -- yarn run lint:es 1> output/cmf.eslint.txt 2>/dev/null
	lerna exec --scope=react-talend-components -- yarn run lint:es 1> output/components.eslint.txt 2>/dev/null
	lerna exec --scope=react-talend-containers -- yarn run lint:es 1> output/containers.eslint.txt 2>/dev/null
	lerna exec --scope=react-talend-forms -- yarn run lint:es 1> output/forms.eslint.txt 2>/dev/null

	lerna exec --scope=bootstrap-talend-theme -- yarn run lint:style 1> output/theme.sasslint.txt 2>/dev/null
	lerna exec --scope=react-talend-components -- yarn run lint:style 1> output/components.sasslint.txt 2>/dev/null
	lerna exec --scope=react-talend-forms -- yarn run lint:style 1> output/forms.sasslint.txt 2>/dev/null

fi
