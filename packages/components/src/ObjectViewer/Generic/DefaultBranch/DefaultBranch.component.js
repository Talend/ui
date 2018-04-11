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
		<span key={'length'}>
			<sup
				key={'length-badge'}
				className={classNames(theme.badge, 'badge', 'tc-object-viewer-badge')}
			>
				{badgeValue}
			</sup>
		</span>
	);
}

function getQualityDot() {
	return (
		<div
			key={'quality'}
			className={classNames(theme['invalid-dot'], 'tc-object-viewer-invalid-dot')}
			title={'Invalid value indicator'}
		/>
	);
}

function getButton(onClick, dataKey, jsonpath, content) {
	return (
		<button
			key={'main-button'}
			aria-label={`Select ${dataKey} (${jsonpath})`}
			onClick={onClick}
			className={theme.main}
		>
			{content}
		</button>
	);
}

function getBranchContent({ getDisplayKey, type, isOpened, getQuality, ...props }, length) {
	return [
		<span key="datakey">{getDisplayKey(props)}</span>,
		type === 'array' && getLengthBadge(length),
		!isOpened && getQuality(props) === -1 && getQualityDot(),
	];
}

export default function DefaultBranch(props) {
	const {
		className,
		isOpened,
		onClick,
		onToggle,
		dataKey,
		jsonpath,
		// data,
		style,
		type,
		value,
		level,
		getIcon,
		getFields,
		getFieldsCount,
	} = props;
	const icon = getIcon(props);
	const content = getBranchContent(props, getFieldsCount(value, type));

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
						className={classNames(theme.caret, icon.className)}
						onClick={onIconClick}
					/>
				)}
				{onClick ? (
					getButton(onClick, dataKey, jsonpath, content)
				) : (
					<span key="main-text" className={theme.main}>
						{content}
					</span>
				)}
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
	data: PropTypes.any,
	value: PropTypes.any,
	getIcon: PropTypes.func,
	getFields: PropTypes.func,
	getFieldsCount: PropTypes.func,
	onClick: PropTypes.func,
	onToggle: PropTypes.func,
	level: PropTypes.number,
	isOpened: PropTypes.bool,
	jsonpath: PropTypes.string,
	dataKey: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
	style: PropTypes.object,
	type: PropTypes.string,
};
