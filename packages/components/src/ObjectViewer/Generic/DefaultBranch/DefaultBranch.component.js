import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import theme from '../GenericViewer.scss';
import {
	defaultGetDisplayKey,
	defaultGetIcon,
	defaultGetJSONPath,
	defaultGetQuality,
} from '../genericViewer.configuration';
import Icon from '../../../Icon';
import TreeItem from '../TreeItem';

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
		<span key={'datakey'}>{getDisplayKey(props)}</span>,
		type === 'array' && getLengthBadge(length),
		!isOpened && getQuality(props) === -1 && getQualityDot(),
	];
}

function DefaultBranchChildren({
	dataKey,
	branchChildren,
	jsonpath,
	level,
	type,
	value,
	...props
}) {
	return (
		<ul className={'tc-object-viewer-nested'}>
			{branchChildren.map((branchChild, index) => (
				<TreeItem
					{...props}
					{...branchChild}
					key={index}
					level={level + 1}
					jsonpath={props.getJSONPath({
						dataKey: branchChild.dataKey,
						parent: {
							dataKey,
							jsonpath,
							type,
							value,
						},
					})}
				/>
			))}
		</ul>
	);
}
DefaultBranchChildren.defaultProps = {
	branchChildren: [],
	getJSONPath: defaultGetJSONPath,
};
DefaultBranchChildren.propTypes = {
	dataKey: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
	branchChildren: PropTypes.array,
	getJSONPath: PropTypes.func,
	jsonpath: PropTypes.string,
	level: PropTypes.number,
	type: PropTypes.string,
	value: PropTypes.any,
};

export default function DefaultBranch(props) {
	const {
		className,
		data,
		// fields,
		getIcon,
		// getDisplayKey,
		// getQuality,
		isOpened,
		jsonpath,
		dataKey,
		onClick,
		onToggle,
		style,
		type,
		value,
		getFields,
	} = props;
	// TODO getCount instead of getFields
	const icon = getIcon(props);
	const content = getBranchContent(props, getFields(value, type).length);

	function onIconClick(event) {
		onToggle(event, { data, isOpened, jsonpath });
	}
	return (
		<div>
			<div className={className} style={style}>
				<Icon
					key={'icon'}
					title={isOpened ? `Collapse ${dataKey} (${jsonpath})` : `Expand ${dataKey} (${jsonpath})`}
					name={icon.name}
					transform={icon.transform}
					className={classNames(theme.caret, icon.className)}
					onClick={onIconClick}
				/>
				{onClick ? (
					getButton(onClick, dataKey, jsonpath, content)
				) : (
					<span key={'main-text'} className={theme.main}>
						{content}
					</span>
				)}
			</div>
			{isOpened && (
				<DefaultBranchChildren {...props} type={type} branchChildren={getFields(value, type)} />
			)}
		</div>
	);
}
DefaultBranch.defaultProps = {
	getIcon: defaultGetIcon,
	getDisplayKey: defaultGetDisplayKey,
	getQuality: defaultGetQuality,
	fields: [],
};
DefaultBranch.propTypes = {
	className: PropTypes.string,
	data: PropTypes.any,
	// fields: PropTypes.array,
	// getDisplayKey: PropTypes.func,
	getIcon: PropTypes.func,
	// getQuality: PropTypes.func,
	isOpened: PropTypes.bool,
	jsonpath: PropTypes.string,
	dataKey: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
	onClick: PropTypes.func,
	onToggle: PropTypes.func,
	style: PropTypes.object,
	type: PropTypes.string,
};
