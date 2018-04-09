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
		getFields,
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
	const isOpened = (isRoot && noRoot) || opened.indexOf(jsonpath) !== -1;
	const itemType = getDataType(value);

	const spaceAdjustment = { paddingLeft: paddingLeft * level };
	const onClick = onSelect && (event => onSelect(event, jsonpath, value));

	const isBranch = itemType === 'array' || itemType === 'object';
	const itemContentClassName = classNames(theme.content, 'tc-object-viewer-content', {
		'tc-object-viewer-root': level === 0,
		[theme['no-root']]: isRoot && noRoot,
		[theme.highlight]: isHighlighted,
	});

	const tmpProps = Object.assign(
		{ ...props },
		{
			className: itemContentClassName,
			onClick,
			isHighlighted,
			isOpened,
			style: spaceAdjustment,
			type: itemType,
		},
	);
	return (
		<li className={classNames(theme.item, 'tc-object-viewer-item')}>
			{isBranch ? (
				<DefaultBranch {...tmpProps} fields={getFields(value, itemType)} />
			) : (
				<DefaultLeaf {...tmpProps} />
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
	getFields: PropTypes.func,
	highlighted: PropTypes.array,
	jsonpath: PropTypes.string,
	level: PropTypes.number,
	noRoot: PropTypes.bool,
	onSelect: PropTypes.func,
	opened: PropTypes.arrayOf(PropTypes.string),
	value: PropTypes.any,
};
