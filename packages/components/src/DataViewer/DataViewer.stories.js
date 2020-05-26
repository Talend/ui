// eslint-disable-next-line
import { storiesOf } from '@storybook/react';
import talendIcons from '@talend/icons/dist/react';
import mock, { Provider } from '@talend/react-cmf/lib/mock';
import classNames from 'classnames';
import get from 'lodash/get';
import words from 'lodash/words';
import React from 'react';
import IconsProvider from '../IconsProvider';
import ModelViewer from './ModelViewer';
import RecordsViewer from './RecordsViewer';
import hierarchicSample from './sample.raw.json';
import theme from './theme.scss';

const icons = {
	'talend-chevron-left': talendIcons['talend-chevron-left'],
	'talend-caret-down': talendIcons['talend-caret-down'],
	'talend-minus-circle': talendIcons['talend-minus-circle'],
	'talend-plus-circle': talendIcons['talend-plus-circle'],
};

const stories = storiesOf('Data/Tree/DataViewer', module);

stories
	.addDecorator(story => (
		<div style={{ backgroundColor: 'white', height: '400px' }} className="col-lg-offset-2 col-lg-8">
			<IconsProvider defaultIcons={icons} />
			{story()}
		</div>
	))
	.add('DataTree with highlight', () => {
		const layoutCn = classNames(theme['tc-twoviewers-layout'], 'tc-twoviewers-layout');

		const highlighted = [/^\$\['category']$/];
		let jsonPathSelection = '';
		const onSelect = (event, jsonpath, value) => {
			highlighted[0] = buildRegExpJsonpath(jsonpath);
			jsonPathSelection = jsonpath;
		};

		const isUnion = item => {
			return Array.isArray(item.type);
		};
		const getDisplayValue = item => {
			if (typeof item === 'string') {
				return item;
			}
			return get(item, 'doc', item.name);
		};

		return (
			<Provider
				state={{
					...mock.state(),
					routing: {
						locationBeforeTransitions: { pathname: '/datasets-details/dataset-42' },
					},
				}}
			>
				<div className={layoutCn}>
					<div
						className={classNames(theme['tc-twoviewers-layout-left'], 'tc-twoviewers-layout-left')}
					>
						<ModelViewer
							componentId="ModelViewer"
							highlighted={highlighted}
							jsonPathSelection={jsonPathSelection}
							onSelect={onSelect}
							sample={hierarchicSample}
							renderLeafOptions={() => {}}
							getDisplayValue={getDisplayValue}
							isUnion={isUnion}
							hasSemanticAwareness
						/>
					</div>
					<div
						className={classNames(
							theme['tc-twoviewers-layout-right'],
							'tc-twoviewers-layout-right',
						)}
					>
						<RecordsViewer
							componentId="RecordsViewer"
							highlighted={highlighted}
							onVerticalScroll={() => {}}
							sample={hierarchicSample}
							renderLeafAdditionalValue={() => {}}
							renderBranchAdditionalValue={() => {}}
						/>
					</div>
				</div>
			</Provider>
		);
	})
	.add('DataTree with type display on records', () => {
		return (
			<div style={{ height: '100%' }}>
				<RecordsViewer
					componentId="RecordsViewer"
					sample={hierarchicSample}
					displayTypes
					typesRenderer={schema => <>- of type {schema.type[0].type}</>}
				/>
			</div>
		);
	});

/**
 * Transform the jsonpath $['pathParent']['pathChildren],
 * to a regexp ^$['pathParent'](['pathChildren'])?$.
 * That helps to make a deep match for the highlighting.
 * @param {string} jsonpath
 */
export function buildRegExpJsonpath(jsonpath) {
	const splitJsonPath = words(jsonpath, /\[(.*?)\]+/g).reverse();
	const deepJsonPath = splitJsonPath.reduce((acc, jsonPathWord, index) => {
		if (index === splitJsonPath.length - 1) {
			return `^\\$\\${jsonPathWord}${acc}$`;
		}
		if (jsonPathWord === '[]') {
			return `(\\[[0-9]]${acc})?`;
		}
		return `(\\${jsonPathWord}${acc})?`;
	}, '');
	return new RegExp(deepJsonPath);
}
