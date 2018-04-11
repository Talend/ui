import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { isArray } from 'lodash';
import DefaultLeaf from '../DefaultLeaf';
import DefaultBranch from '../DefaultBranch';
import theme from '../GenericViewer.scss';
import {
	defaultGetDataType,
	defaultGetFields,
	defaultGetJSONPath,
} from '../genericViewer.configuration';

const PADDING_LEFT = 30;

function TreeItem(props) {
	const { getDataType, highlighted, jsonpath, level, noRoot, onSelect, opened, value } = props;
	const isRoot = level === 0;
	const isHighlighted = highlighted.find(pattern => jsonpath.match(pattern));
	const type = getDataType(value);
	const itemContentClassName = classNames(theme.content, 'tc-object-viewer-content', {
		'tc-object-viewer-root': isRoot,
		[theme['no-root']]: isRoot && noRoot,
		[theme.highlight]: isHighlighted,
	});
	const renderProps = Object.assign(
		{ ...props },
		{
			className: itemContentClassName,
			onClick: onSelect && (event => onSelect(event, jsonpath, value)),
			isHighlighted,
			isOpened: (isRoot && noRoot) || opened.indexOf(jsonpath) !== -1,
			style: { paddingLeft: PADDING_LEFT * level },
			type,
			value,
		},
	);
	if (type === 'array' || type === 'object') {
		return <DefaultBranch {...renderProps} />;
	}
	return <DefaultLeaf {...renderProps} />;
}

TreeItem.defaultProps = {
	getDataType: defaultGetDataType,
	getFields: defaultGetFields,
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

export default function HierarchicTree({ level, jsonpath, data, value, treeItems, first, ...props }) {
	if (isArray(treeItems) && treeItems.length) {
		return (
			<ul className={classNames(theme['tc-hierarchic-list'], 'tc-hierarchic-list')}>
				{treeItems.map((item, index) => (
					<li className={classNames(theme.item)}>
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
								},
							})}
						/>
					</li>
				))}
			</ul>
		);
	}
	if (level === 0) {
		return <TreeItem {...props} jsonpath={jsonpath} value={value} level={level} />;
	}
	return (
		<li className={classNames(theme.item)}>
			<TreeItem {...props} jsonpath={jsonpath} value={value} level={level} />
		</li>
	);
}

HierarchicTree.defaultProps = {
	getJSONPath: defaultGetJSONPath,
};
