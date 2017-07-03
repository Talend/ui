#!/usr/bin/env bash
#!/bin/bash

if [ "$TRAVIS_PULL_REQUEST" != 'false' ]; then
	echo "Linting JavaScript files"
	lerna exec --scope=react-cmf -- npm run lint:es 1> output/cmf.eslint.txt 2>/dev/null
	lerna exec --scope=react-talend-components -- npm run lint:es 1> output/components.eslint.txt 2>/dev/null
	lerna exec --scope=react-talend-containers -- npm run lint:es 1> output/containers.eslint.txt 2>/dev/null
	lerna exec --scope=react-talend-forms -- npm run lint:es 1> output/forms.eslint.txt 2>/dev/null
	lerna exec --scope=talend-log -- npm run lint:es 1> output/logging.eslint.txt 2>/dev/null

	echo "Linting Sass files"
	lerna exec --scope=bootstrap-talend-theme -- npm run lint:style 1> output/theme.sasslint.txt 2>/dev/null
	lerna exec --scope=react-talend-components -- npm run lint:style 1> output/components.sasslint.txt 2>/dev/null
	lerna exec --scope=react-talend-forms -- npm run lint:style 1> output/forms.sasslint.txt 2>/dev/null
fi
