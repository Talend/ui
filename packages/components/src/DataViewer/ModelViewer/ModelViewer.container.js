import React from 'react';
import PropTypes from 'prop-types';
import has from 'lodash/has';
import get from 'lodash/get';
import head from 'lodash/head';
import { withTranslation } from 'react-i18next';
import Component from './ModelViewer.component';
import Branch from './Branch';
import Leaf from './Leaf';
import { TreeManager } from '../Managers';
import formatJSONPath from '../jsonPath';
import I18N_DOMAIN_COMPONENTS from '../../constants';
import getDefaultT from '../../translate';

const QUALITY_KEY = '@talend-quality@';

/**
 * If quality is present we assume that it is an union.
 * WARNING this is not a relevant way to do it.
 * @param {object} item
 */
export function isUnion(item) {
	return Array.isArray(item.type) || has(item, QUALITY_KEY);
}

/**
 * Extract the type and quality from the item.
 * @param {object} item
 */
export function getQuality(item) {
	return get(item, 'type.@talend-quality@', item['@talend-quality@']);
}

/**
 * Return the attribute to display from the item.
 * @param {object} item
 */
export function defaultGetDisplayValue(item) {
	if (typeof item === 'string') {
		return item;
	}
	return get(item, 'doc', item.name);
}

/**
 * Return the attribute displayed for type.
 * @param {object} item
 */
export function getDqType(item) {
	return item.dqType || item.type;
}
/**
 * Return the type.
 * @param {object} item
 */
export function defaultGetDisplayKey(item) {
	if (typeof item.type === 'object') {
		return `(${getDqType(item.type)})`;
	}
	if (typeof item.dqType === 'string' || typeof item.type === 'string') {
		return `(${getDqType(item)})`;
	}
	return '';
}

/**
 * Return an array of the next items to display.
 * @param {object} item
 */
export function getChilds(item) {
	return (
		get(item, 'type.items.fields') ||
		get(item, 'type.fields') ||
		get(item, 'type.symbols') ||
		get(item, 'fields') ||
		get(item, 'type')
	);
}

/**
 * Filtering the union removing the null value.
 * Return a new structure to represent the union.
 * @param {object} union
 */
export function filterNullUnion(union) {
	const typeWithoutNull = union.type
		.filter(type => type.type !== 'null')
		.map(item => {
			if (!item.name) {
				return { ...item, name: union.name, path: union.path };
			}
			return item;
		});
	return {
		name: union.name,
		type: typeWithoutNull.length === 1 ? head(typeWithoutNull) : typeWithoutNull,
		optional: typeWithoutNull.length < union.type.length,
		path: union.path,
	};
}

/**
 * Make operation on union in the childs.
 * Return new array with the transformed union.
 * @param {array} childs
 */
export function transformUnions(childs) {
	return childs.reduce((acc, child) => {
		if (Array.isArray(child.type)) {
			acc.push(filterNullUnion(child));
		} else {
			acc.push(child);
		}
		return acc;
	}, []);
}

/**
 * Return the array of childs, used in the branch.
 * @param {object} item
 */
export function defaultTransformChilds(item) {
	const childs = getChilds(item);
	return transformUnions(childs).map(field => ({ dataKey: field.name, value: field }));
}

/**
 * Return the string representing the jsonpapth of the current element.
 * @param {String} dataKey
 * @param {object} parent
 */
export function getJSONPath(dataKey, parent) {
	if (get(parent, 'value.value.type.type') === 'array') {
		return formatJSONPath([''], `${parent.jsonpath}['${dataKey}']`, 'array');
	}
	return formatJSONPath([dataKey], parent.jsonpath);
}

/**
 * Used in TreeNode, helps to determine if it's a branch or a leaf.
 * Return the type of the childs.
 * @param {object} item
 */
export function getItemType(item) {
	if (Array.isArray(getChilds(item))) {
		return 'object';
	}
	return null;
}

export class ModelViewer extends React.Component {
	static displayName = 'Container(ModelViewer)';

	static propTypes = {
		getQuality: PropTypes.func,
		componentId: PropTypes.string,
		getChilds: PropTypes.func,
		getDisplayKey: PropTypes.func,
		getDisplayValue: PropTypes.func,
		getJSONPath: PropTypes.func,
		getItemType: PropTypes.func,
		hasSemanticAwareness: PropTypes.bool,
		jsonPathSelection: PropTypes.string,
		menuActions: PropTypes.arrayOf({ label: PropTypes.string }),
		onSelect: PropTypes.func,
		sample: PropTypes.shape({ schema: PropTypes.any, data: PropTypes.any }),
		t: PropTypes.func,
		renderSemanticChooser: PropTypes.func,
		renderQualities: PropTypes.func,
	};

	static defaultProps = {
		getChilds: defaultTransformChilds,
		getDisplayKey: defaultGetDisplayKey,
		getDisplayValue: defaultGetDisplayValue,
		getJSONPath,
		getQuality,
		getItemType,
		hasSemanticAwareness: true,
		quality: { qualityKey: QUALITY_KEY },
		t: getDefaultT(),
		withTreeBorder: false,
	};

	renderLeaf = args => (
		<Leaf
			{...args}
			getDisplayKey={this.props.getDisplayKey}
			getDisplayValue={this.props.getDisplayValue}
			hasSemanticAwareness={this.props.hasSemanticAwareness}
			menu={this.props.menuActions}
			onSelect={this.props.onSelect}
			getQuality={this.props.getQuality}
			isUnion={isUnion}
			t={this.props.t}
			renderSemanticChooser={this.props.renderSemanticChooser}
			renderQualities={this.props.renderQualities}
		/>
	);

	renderBranch = args => (
		<Branch
			{...args}
			getChilds={this.props.getChilds}
			getDisplayKey={this.props.getDisplayKey}
			getDisplayValue={this.props.getDisplayValue}
			hasSemanticAwareness={this.props.hasSemanticAwareness}
			isUnion={isUnion}
			t={this.props.t}
		/>
	);

	renderComponent = args => {
		const componentProps = {
			...this.props,
			branch: this.renderBranch,
			getJSONPath: this.props.getJSONPath,
			getItemType: this.props.getItemType,
			leaf: this.renderLeaf,
			t: this.props.t,
			value: this.props.getChilds(this.props.sample.schema),
		};
		return <Component {...args} {...componentProps} />;
	};

	render() {
		return (
			<TreeManager
				componentId={this.props.componentId || 'ModelViewer'}
				jsonPathSelection={this.props.jsonPathSelection}
				wrappedComponent={this.renderComponent}
				sample={this.props.sample}
			/>
		);
	}
}

export default withTranslation(I18N_DOMAIN_COMPONENTS)(ModelViewer);
