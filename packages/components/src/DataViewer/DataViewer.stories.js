import { useState } from 'react';
import classNames from 'classnames';
import get from 'lodash/get';
import words from 'lodash/words';
import ModelViewer from './ModelViewer';
import RecordsViewer from './RecordsViewer';
import hierarchicSample from './sample.raw.json';
import theme from './theme.module.scss';

/**
 * Transform the jsonpath $['pathParent']['pathChildren],
 * to a regexp ^$['pathParent'](['pathChildren'])?$.
 * That helps to make a deep match for the highlighting.
 * @param {string} jsonpath
 */
function buildRegExpJsonpath(jsonpath) {
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

export default {
	title: 'Data/Tree/DataViewer',
};

export const DataTreeWithHighlight = () => {
	const [jsonPathSelection, setJsonPathSelection] = useState("$['category']");
	const layoutCn = classNames(theme['tc-twoviewers-layout'], 'tc-twoviewers-layout');

	const highlighted = [buildRegExpJsonpath(jsonPathSelection)];
	const onSelect = (_, jsonpath) => setJsonPathSelection(jsonpath);
	const isUnion = item => Array.isArray(item.type);
	const getDisplayValue = item => (typeof item === 'string' ? item : get(item, 'doc', item.name));

	return (
		<div className={layoutCn}>
			<div className={classNames(theme['tc-twoviewers-layout-left'], 'tc-twoviewers-layout-left')}>
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
				className={classNames(theme['tc-twoviewers-layout-right'], 'tc-twoviewers-layout-right')}
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
	);
};

export const DataTreeWithoutSemanticAwareness = () => {
	const [jsonPathSelection, setJsonPathSelection] = useState("$['category']");
	const layoutCn = classNames(theme['tc-twoviewers-layout'], 'tc-twoviewers-layout');

	const highlighted = [buildRegExpJsonpath(jsonPathSelection)];
	const onSelect = (_, jsonpath) => setJsonPathSelection(jsonpath);
	const isUnion = item => Array.isArray(item.type);
	const getDisplayValue = item => (typeof item === 'string' ? item : get(item, 'doc', item.name));

	return (
		<div className={layoutCn}>
			<div className={classNames(theme['tc-twoviewers-layout-left'], 'tc-twoviewers-layout-left')}>
				<ModelViewer
					componentId="ModelViewer"
					highlighted={highlighted}
					jsonPathSelection={jsonPathSelection}
					onSelect={onSelect}
					sample={hierarchicSample}
					renderLeafOptions={() => {}}
					getDisplayValue={getDisplayValue}
					isUnion={isUnion}
					hasSemanticAwareness={false}
				/>
			</div>
			<div
				className={classNames(theme['tc-twoviewers-layout-right'], 'tc-twoviewers-layout-right')}
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
	);
};

export const DataTreeWithTypeDisplayOnRecords = () => {
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
};
