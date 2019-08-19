#!/usr/bin/env bash
#!/bin/bash

if [ "$TRAVIS_PULL_REQUEST" != 'false' ]; then
	echo "Linting JavaScript files"
	(lerna exec --scope=@talend/react-sagas -- npm run lint:es | awk '{if(NR>2)print}') 1> output/sagas.eslint.txt
	(lerna exec --scope=@talend/react-datagrid -- npm run lint:es | awk '{if(NR>2)print}') 1> output/datagrid.eslint.txt
	(lerna exec --scope=@talend/react-stepper -- npm run lint:es | awk '{if(NR>2)print}') 1> output/stepper.eslint.txt
	(lerna exec --scope=@talend/react-cmf -- npm run lint:es | awk '{if(NR>2)print}') 1> output/cmf.eslint.txt 2>/dev/null
	(lerna exec --scope=@talend/react-cmf-webpack-plugin -- npm run lint:es | awk '{if(NR>2)print}') 1> output/cmf-webpack-plugin.eslint.txt 2>/dev/null
	(lerna exec --scope=@talend/react-components -- npm run lint:es | awk '{if(NR>2)print}') 1> output/components.eslint.txt 2>/dev/null
	(lerna exec --scope=@talend/react-containers -- npm run lint:es | awk '{if(NR>2)print}') 1> output/containers.eslint.txt 2>/dev/null
	(lerna exec --scope=@talend/react-forms -- npm run lint:es | awk '{if(NR>2)print}') 1> output/forms.eslint.txt 2>/dev/null
	(lerna exec --scope=@talend/log -- npm run lint:es | awk '{if(NR>2)print}') 1> output/logging.eslint.txt 2>/dev/null
	# not in lerna
	cd packages/router/ && (yarn run lint:es | awk '{if(NR>2)print}') 1> ../../output/router.eslint.txt 2>/dev/null && cd ../../

	echo "Linting Sass files"
	(lerna exec --scope=@talend/bootstrap-theme -- npm run lint:style | awk '{if(NR>2)print}') 1> output/theme.sasslint.txt 2>/dev/null
	(lerna exec --scope=@talend/react-components -- npm run lint:style | awk '{if(NR>2)print}') 1> output/components.sasslint.txt 2>/dev/null
	(lerna exec --scope=@talend/react-forms -- npm run lint:style | awk '{if(NR>2)print}') 1> output/forms.sasslint.txt 2>/dev/null
fi
