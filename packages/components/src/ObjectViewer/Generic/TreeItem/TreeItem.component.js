import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import DefaultLeaf from '../DefaultLeaf';
import DefaultBranch from '../DefaultBranch';
import theme from '../GenericViewer.scss';
import {
	defaultGetDataType,
	defaultGetFields,
} from '../genericViewer.configuration';

const paddingLeft = 30;

export default function TreeItem(props) {
	const {
		getDataType,
		// getFields,
		highlighted,
		jsonpath,
		level,
		noRoot,
		onSelect,
		opened,
		value,
	} = props;
	const isRoot = level === 0;
	const isHighlighted = highlighted.find(pattern => jsonpath.match(pattern));
	const itemType = getDataType(value);
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
			style: { paddingLeft: paddingLeft * level },
			type: itemType,
			value,
		},
	);
	return (
		<li className={classNames(theme.item, 'tc-object-viewer-item')}>
			{itemType === 'array' || itemType === 'object' ? (
				<DefaultBranch {...renderProps} />
			) : (
				<DefaultLeaf {...renderProps} />
			)}
		</li>
	);
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
	// getFields: PropTypes.func,
	highlighted: PropTypes.array,
	jsonpath: PropTypes.string,
	level: PropTypes.number,
	noRoot: PropTypes.bool,
	onSelect: PropTypes.func,
	opened: PropTypes.arrayOf(PropTypes.string),
	value: PropTypes.any,
};
