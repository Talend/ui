import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { isArray } from 'lodash';
import DefaultLeaf from '../DefaultLeaf';
import DefaultBranch from '../DefaultBranch';
import theme from '../GenericViewer.scss';
import {
	defaultGetDataType,
	defaultGetJSONPath,
} from '../genericViewer.configuration';

const PADDING_LEFT = 30;

function isRoot(level) {
	return level === 0;
}

function isBranch(type) {
	return type === 'array' || type === 'object';
}

function isOpened(itemIsRoot, itemHasNoRoot, jsonpath, openedPaths) {
	return (itemIsRoot && itemHasNoRoot) || openedPaths.indexOf(jsonpath) !== -1;
}

function TreeItem(props) {
	const { getDataType, jsonpath, level, noRoot, onSelect, opened, value } = props;
	const itemIsRoot = isRoot(level);
	const highlightedPath = props.highlighted.find(pattern => jsonpath.match(pattern));
	const type = getDataType(value);
	const renderProps = Object.assign(
		{ ...props },
		{
			className: classNames(theme['tc-hierarchic-item-content'], 'tc-hierarchic-item-content', {
				[theme['tc-hierarchic-item-content-no-root']]: itemIsRoot && noRoot,
				'tc-hierarchic-item-content-no-root': itemIsRoot && noRoot,
				[theme['tc-hierarchic-item-content-highlight']]: !!highlightedPath,
				'tc-hierarchic-item-content-highlight': !!highlightedPath,
			}),
			onClick: onSelect && (event => onSelect(event, jsonpath, value)),
			isOpened: isOpened(itemIsRoot, noRoot, jsonpath, opened),
			style: { paddingLeft: PADDING_LEFT * level },
			value,
			type,
		},
	);
	if (isBranch(type)) {
		return <DefaultBranch {...renderProps} />;
	}
	return <DefaultLeaf {...renderProps} />;
}

TreeItem.defaultProps = {
	getDataType: defaultGetDataType,
	highlighted: [],
	jsonpath: '',
	opened: [],
	value: '',
};
TreeItem.propTypes = {
	getDataType: PropTypes.func,
	highlighted: PropTypes.array,
	jsonpath: PropTypes.string,
	level: PropTypes.number,
	noRoot: PropTypes.bool,
	onSelect: PropTypes.func,
	opened: PropTypes.arrayOf(PropTypes.string),
	value: PropTypes.any,
};

export default function HierarchicTree({ level, jsonpath, value, treeItems, type, ...props }) {
	const cn = classNames(theme['tc-hierarchic-item'], 'tc-hierarchic-item');
	if (isArray(treeItems) && treeItems.length) {
		return (
			<ul className={classNames(theme['tc-hierarchic-list'], 'tc-hierarchic-list')}>
				{treeItems.map((item, index) => (
					<li className={cn}>
						<TreeItem
							{...props}
							{...item}
							key={index}
							level={level + 1}
							jsonpath={props.getJSONPath({
								dataKey: item.dataKey,
								parent: {
									jsonpath,
									value,
									type,
								},
							})}
						/>
					</li>
				))}
			</ul>
		);
	}
	if (isRoot(level)) {
		return <TreeItem {...props} jsonpath={jsonpath} value={value} level={level} type={type} />;
	}
	return (
		<li className={cn}>
			<TreeItem {...props} jsonpath={jsonpath} value={value} level={level} type={type} />
		</li>
	);
}

HierarchicTree.defaultProps = {
	getJSONPath: defaultGetJSONPath,
};

HierarchicTree.propTypes = {
	getJSONPath: PropTypes.func,
	level: PropTypes.number,
	jsonpath: PropTypes.string,
	value: PropTypes.any,
	treeItems: PropTypes.array,
	type: PropTypes.string,
};
