import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import theme from '../GenericViewer.scss';
import {
	defaultGetIcon,
	defaultGetJSONPath,
	defaultGetQuality,
	defaultGetDisplayKey,
	defaultGetFieldsCount,
} from '../genericViewer.configuration';
import Icon from '../../../Icon';
import HierarchicTree from '../HierarchicTree';

function getLengthBadge(badgeValue) {
	return (
		<span key="length">
			<sup
				key="length-badge"
				className={classNames(
					theme['tc-hierarchic-item-content-badge'],
					'tc-hierarchic-item-content-badge',
					'badge',
				)}
			>
				{badgeValue}
			</sup>
		</span>
	);
}

function getQualityDot() {
	return (
		<div
			key="quality"
			className={classNames(
				theme['tc-hierarchic-item-content-invalid-dot'],
				'tc-hierarchic-item-content-invalid-dot',
			)}
			title="Invalid value indicator"
		/>
	);
}

function getBranchItemOptions(props) {
	const { type, value, isOpened, getQuality, getFieldsCount } = props;
	return [
		type === 'array' && getLengthBadge(getFieldsCount(value, type)),
		!isOpened && getQuality(props) === -1 && getQualityDot(),
	];
}

function getRenderDisplayedKey(value) {
	return <span key="datakey">{value}</span>;
}

function getRenderBranchItemContent(props) {
	const { onClick, dataKey, jsonpath, getDisplayKey } = props;
	const renderedDisplayedKey = getRenderDisplayedKey(getDisplayKey(props));
	if (onClick) {
		return (
			<button
				className={classNames(
					theme['tc-hierarchic-item-content-button'],
					'tc-hierarchic-item-content-button',
				)}
				key="main-button"
				aria-label={`Select ${dataKey} (${jsonpath})`}
				onClick={onClick}
			>
				{renderedDisplayedKey}
			</button>
		);
	}
	return (
		<span
			key="main-text"
			className={classNames(
				theme['tc-hierarchic-item-content-options'],
				'tc-hierarchic-item-content-options',
			)}
		>
			{renderedDisplayedKey}
			{getBranchItemOptions(props)}
		</span>
	);
}

export default function DefaultBranch(props) {
	const {
		className,
		isOpened,
		onToggle,
		dataKey,
		jsonpath,
		style,
		type,
		value,
		level,
		getIcon,
		getFields,
	} = props;
	const icon = getIcon(props);
	function onIconClick(event) {
		onToggle(event, { value, isOpened, jsonpath });
	}
	return (
		<div>
			<div className={className} style={style}>
				{icon && (
					<Icon
						key="Icon"
						title={
							isOpened ? `Collapse ${dataKey} (${jsonpath})` : `Expand ${dataKey} (${jsonpath})`
						}
						name={icon.name}
						transform={icon.transform}
						className={classNames(
							theme['tc-hierarchic-item-content-caret'],
							'tc-hierarchic-item-content-caret',
							icon.className,
						)}
						onClick={onIconClick}
					/>
				)}
				{getRenderBranchItemContent(props)}
			</div>
			{isOpened && (
				<HierarchicTree
					{...props}
					jsonpath={jsonpath}
					treeItems={getFields(value, type)}
					level={level}
					value={value}
				/>
			)}
		</div>
	);
}
DefaultBranch.defaultProps = {
	getIcon: defaultGetIcon,
	getQuality: defaultGetQuality,
	getJSONPath: defaultGetJSONPath,
	getDisplayKey: defaultGetDisplayKey,
	getFieldsCount: defaultGetFieldsCount,
	fields: [],
};
DefaultBranch.propTypes = {
	className: PropTypes.string,
	value: PropTypes.any,
	getIcon: PropTypes.func,
	getFields: PropTypes.func,
	onToggle: PropTypes.func,
	level: PropTypes.number,
	isOpened: PropTypes.bool,
	jsonpath: PropTypes.string,
	dataKey: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
	style: PropTypes.object,
	type: PropTypes.string,
};
