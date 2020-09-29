#!/usr/bin/env bash
#!/bin/bash

if [ "$TRAVIS_PULL_REQUEST" != 'false' ]; then
	echo "Linting JavaScript files"
	(lerna exec --scope=@talend/react-sagas -- npm run lint:es -- -o ../../output/sagas.eslint.txt --no-color)
	(lerna exec --scope=@talend/react-datagrid -- npm run lint:es -- -o ../../output/datagrid.eslint.txt --no-color)
	(lerna exec --scope=@talend/react-stepper -- npm run lint:es -- -o ../../output/stepper.eslint.txt --no-color)
	(lerna exec --scope=@talend/react-cmf -- npm run lint:es -- -o ../../output/cmf.eslint.txt --no-color)
	(lerna exec --scope=@talend/react-cmf-webpack-plugin -- npm run lint:es -- -o ../../output/cmf-webpack-plugin.eslint.txt --no-color)
	(lerna exec --scope=@talend/react-components -- npm run lint:es -- -o ../../output/components.eslint.txt --no-color)
	(lerna exec --scope=@talend/react-containers -- npm run lint:es -- -o ../../output/containers.eslint.txt --no-color)
	(lerna exec --scope=@talend/react-forms -- npm run lint:es -- -o ../../output/forms.eslint.txt --no-color)
	# not in lerna
	cd packages/router/ && (yarn run lint:es -- -o ../../output/router.eslint.txt --no-color | awk '{if(NR>2)print}') 2>/dev/null && cd ../../

	echo "Linting Sass files"
	(lerna exec --scope=@talend/bootstrap-theme -- npm run lint:style | awk '{if(NR>2)print}') 1> output/theme.sasslint.txt 2>/dev/null
	(lerna exec --scope=@talend/react-components -- npm run lint:style | awk '{if(NR>2)print}') 1> output/components.sasslint.txt 2>/dev/null
	(lerna exec --scope=@talend/react-forms -- npm run lint:style | awk '{if(NR>2)print}') 1> output/forms.sasslint.txt 2>/dev/null
fi
