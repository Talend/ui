import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import theme from '../GenericViewer.scss';
import {
	defaultGetDisplayKey,
	defaultGetDisplayValue,
	defaultGetQuality,
} from '../genericViewer.configuration';

function getLeafContent(quality, formattedKey, formattedValue) {
	return [
		quality === -1 && (
			<div
				key="quality"
				className={classNames(
					theme['tc-hierarchic-item-content-invalid-value'],
					'tc-hierarchic-item-content-invalid-value',
				)}
				title="Invalid value indicator"
			/>
		),
		<div
			key="key-value"
			className={classNames(
				theme['tc-hierarchic-item-content-key-value'],
				'tc-hierarchic-item-content-key-value',
			)}
		>
			<span
				key="key"
				className={classNames(
					theme['tc-hierarchic-item-content-key'],
					'tc-hierarchic-item-content-key',
				)}
			>
				{formattedKey}
			</span>
			{formattedValue !== undefined && ': '}
			<span
				key="value"
				title={formattedValue}
				className={classNames(
					theme['tc-hierarchic-item-content-value'],
					'tc-hierarchic-item-content-value',
				)}
			>
				{formattedValue}
			</span>
		</div>,
	];
}

export default function DefaultLeaf(props) {
	const {
		className,
		dataKey,
		getDisplayKey,
		getQuality,
		getItemMenu,
		getDisplayValue,
		jsonpath,
		onClick,
		style,
	} = props;
	const quality = getQuality(props);
	const formattedKey = getDisplayKey(props);
	const formattedValue = getDisplayValue(props);
	if (onClick) {
		return (
			<div className={className} style={style}>
				<button className={classNames(theme['tc-hierarchic-item-content-button'], 'tc-hierarchic-item-content-button')} key="main" aria-label={`Select ${dataKey} (${jsonpath})`} onClick={onClick}>
					{getLeafContent(quality, formattedKey, formattedValue)}
				</button>
				{getItemMenu && getItemMenu(props)}
			</div>
		);
	}
	return (
		<div className={className} style={style}>
			{getLeafContent(quality, formattedKey, formattedValue)}
		</div>
	);
}
DefaultLeaf.defaultProps = {
	getDisplayKey: defaultGetDisplayKey,
	getQuality: defaultGetQuality,
	getDisplayValue: defaultGetDisplayValue,
};
DefaultLeaf.propTypes = {
	className: PropTypes.string,
	dataKey: PropTypes.string,
	getDisplayKey: PropTypes.func,
	getItemMenu: PropTypes.func,
	getQuality: PropTypes.func,
	getDisplayValue: PropTypes.func,
	jsonpath: PropTypes.string,
	onClick: PropTypes.func,
	style: PropTypes.object,
};
