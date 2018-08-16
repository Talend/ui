import PropTypes from 'prop-types';
import React from 'react';
import invariant from 'invariant';
import { isObject } from 'lodash';
import classNames from 'classnames';
import { translate } from 'react-i18next';

import Icon from '../../Icon';
import TooltipTrigger from '../../TooltipTrigger';
import theme from './JSONLike.scss';
import I18N_DOMAIN_COMPONENTS from '../../constants';

function noop() {}

const VALIDE_TYPES = ['number', 'string', 'bool'];
const COMPLEX_TYPES = ['object', 'array'];

export const ARRAY_ABSTRACT = '[...]';
export const OBJECT_ABSTRACT = '{...}';

const dateTimeRegexp = new RegExp(
	/^(-?(?:[1-9][0-9]*)?[0-9]{4})-(1[0-2]|0[1-9])-(3[01]|0[1-9]|[12][0-9])T(2[0-3]|[01][0-9]):([0-5][0-9]):([0-5][0-9])(\\.[0-9]+)?(Z)?$/,
); // eslint-disable-line max-len
const dateRegexp = new RegExp(
	/^(-?(?:[1-9][0-9]*)?[0-9]{4})-(1[0-2]|0[1-9])-(3[01]|0[1-9]|[12][0-9])$/,
); // eslint-disable-line max-len
const timeRegexp = new RegExp(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]:[0-5][0-9]$/);

function stopAndSelect(event, { onSelect, jsonpath }) {
	event.stopPropagation();
	onSelect(event, jsonpath);
}

export function NativeValue({ data, edit, className, onChange, jsonpath }) {
	const type = typeof data;
	let display = data;
	let inputType = 'number';
	if (type === 'boolean') {
		display = data.toString();
		inputType = 'checkbox';
	} else if (type === 'string') {
		inputType = 'text';
	}
	if (edit) {
		return <input type={inputType} value={data} onChange={e => onChange(e, { jsonpath })} />;
	}

	const lineValueClasses = classNames(className, theme.native, theme[type]);

	return <span className={lineValueClasses}>{display}</span>;
}

NativeValue.propTypes = {
	data: PropTypes.oneOfType([PropTypes.bool, PropTypes.number, PropTypes.string]),
	edit: PropTypes.bool,
	className: PropTypes.string,
	onChange: PropTypes.func,
	jsonpath: PropTypes.string,
};
NativeValue.defaultProps = {
	className: theme.value,
};

/**
 * return JSONPath braket notation
 * @param  {string} key    object key
 * @param  {string} prefix current jsonpath
 * @param  {string} type   one of 'array' or 'object'
 * @return {string}        jsonpath
 */
export function getJSONPath(key, prefix, type) {
	if (type === 'array') {
		return `${prefix}[${key}]`;
	}
	return `${prefix}['${key}']`;
}

function getName(name) {
	if (!name) {
		return null;
	}
	return <span className={`${theme.name} ${theme.key}`}>{name}:</span>;
}

export function LineItem({
	name,
	tag,
	jsonpath,
	selectedJsonpath,
	onSelect,
	children,
	badge,
	icon,
	type,
	value,
	t,
}) {
	const isSelectedLine = selectedJsonpath && selectedJsonpath === jsonpath;
	const lineMainClassNames = classNames(theme['line-main'], {
		[theme['selected-line']]: isSelectedLine,
	});

	const lineChildren = [
		getName(name),
		value,
		type && <div className={`tc-object-viewer-line-type ${theme.type}`}>({type})</div>,
		badge,
		tag,
	];

	let line;
	if (onSelect) {
		line = [
			<span id={jsonpath} className="sr-only">
				{t('OBJECT_VIEWER_SELECT_LINE', { defaultValue: 'To select this line press ENTER' })}
			</span>,
			<button
				className={lineMainClassNames}
				type="button"
				onClick={e => stopAndSelect(e, { onSelect, jsonpath })}
				aria-describedby={jsonpath}
			>
				{lineChildren}
			</button>,
		];
	} else {
		line = <div className={lineMainClassNames}>{lineChildren}</div>;
	}

	return (
		<span className={theme.line}>
			{icon}
			{line}
			{children}
		</span>
	);
}

LineItem.propTypes = {
	name: PropTypes.string,
	tag: PropTypes.node,
	children: PropTypes.node,
	jsonpath: PropTypes.string,
	selectedJsonpath: PropTypes.string,
	onSelect: PropTypes.func.isRequired,
	badge: PropTypes.node,
	icon: PropTypes.node,
	type: PropTypes.string,
	value: PropTypes.node,
	t: PropTypes.func.isRequired,
};

/**
 * return Info object of the data
 * @param {Object|Array} 	data		The data to display
 * @param {string} 			tupleLabel 	The label that will replace the 'Object' type displayed
 * @return {Object}						DataInfo object
 */
export function getDataInfo(data, tupleLabel) {
	const info = {
		type: typeof data,
		keys: Object.keys(data),
	};

	if (VALIDE_TYPES.indexOf(info.type) === -1) {
		invariant(true, `Type ${info.type} is not supported`);
	}

	if (Array.isArray(data)) {
		info.type = 'array';
		info.length = data.length;
	} else if (info.type === 'object') {
		info.keys = Object.keys(data);
		info.length = info.keys.length;

		if (tupleLabel && tupleLabel.length > 0) {
			info.type = tupleLabel;
		}
	} else if (info.type === 'string') {
		if (dateTimeRegexp.test(data)) {
			info.type = 'datetime';
		} else if (dateRegexp.test(data)) {
			info.type = 'date';
		} else if (timeRegexp.test(data)) {
			info.type = 'time';
		}
	}

	return info;
}

/**
 * return The concatenation of already built abstract
 * and the native value or complexe types representation
 *
 * @param {string} 	acc		Accumulator
 * @param {any}		item 	Current object|literal of the iteration
 * @return {string} 		The abstract being built
 */
export function abstracter(acc, item) {
	if (Array.isArray(item)) {
		if (acc.length > 0) {
			return `${acc}, ${ARRAY_ABSTRACT}`;
		}
		return ARRAY_ABSTRACT;
	} else if (typeof item === 'object') {
		if (acc.length > 0) {
			return `${acc}, ${OBJECT_ABSTRACT}`;
		}
		return OBJECT_ABSTRACT;
	}
	if (acc.length > 0) {
		return `${acc}, ${item}`;
	}

	// interpolation is useful for boolean values
	return `${item}`;
}

/**
 * return The abstract of and array or object
 * with simple representation for complex types
 *
 * @param {Object|Array} 	data	data to abstract by values
 * @return {string} 		The abstract built
 */
export function getDataAbstract(data) {
	let abstract = '';
	if (Array.isArray(data)) {
		abstract = data.reduce((acc, item) => abstracter(acc, item), abstract);
	} else if (typeof data === 'object') {
		const oKeys = Object.keys(data);

		abstract = oKeys.reduce((acc, key) => abstracter(acc, data[key]), abstract);
	}

	return abstract;
}

function getIconLabel(isOpened, itemName, t) {
	if (isOpened) {
		return t('OBJECT_VIEWER_COLLAPSE', {
			defaultValue: "Hide the {{itemName}} item's content",
			itemName,
		});
	}
	return t('OBJECT_VIEWER_EXPAND', {
		defaultValue: "Show the {{itemName}} item's content",
		itemName,
	});
}

export function ComplexItem({
	data,
	name,
	tag,
	opened,
	edited,
	tagged,
	jsonpath,
	info,
	onSelect,
	...props
}) {
	const isOpened = opened.indexOf(jsonpath) !== -1;

	const iconName = isOpened ? 'talend-caret-down' : 'talend-chevron-left';
	const iconTransform = isOpened ? null : 'rotate-180';
	const decoratedLength = info.type === 'array' ? `[${info.length}]` : `(${info.length})`;

	return (
		<LineItem
			name={name}
			onSelect={onSelect}
			jsonpath={jsonpath}
			selectedJsonpath={props.selectedJsonpath}
			icon={
				<Icon
					name={iconName}
					transform={iconTransform}
					className={theme.icon}
					onClick={e => {
						e.preventDefault();
						e.stopPropagation();
						props.onToggle(e, { data, isOpened, jsonpath });
					}}
					aria-hidden={false}
					aria-label={getIconLabel(isOpened, name, props.t)}
				/>
			}
			badge={
				<TooltipTrigger className="offset" label={getDataAbstract(data)} tooltipPlacement="right">
					<sup className={`${theme.badge} badge`}>{decoratedLength}</sup>
				</TooltipTrigger>
			}
			tag={tag}
			type={props.showType ? info.type : null}
			t={props.t}
		>
			{isOpened ? (
				<ul className={theme['complex-item']}>
					{info.keys.map((key, i) => (
						<li key={i}>
							<Item
								{...props}
								data={data[key]}
								name={key}
								jsonpath={getJSONPath(key, jsonpath, info.type)}
								opened={opened}
								edited={edited}
								tagged={tagged}
								onSelect={onSelect}
							/>
						</li>
					))}
				</ul>
			) : null}
		</LineItem>
	);
}

ComplexItem.propTypes = {
	data: PropTypes.oneOfType([
		PropTypes.bool,
		PropTypes.number,
		PropTypes.string,
		PropTypes.object,
		PropTypes.array,
	]),
	name: PropTypes.string,
	tag: PropTypes.node,
	tagged: PropTypes.objectOf(PropTypes.node),
	opened: PropTypes.arrayOf(PropTypes.string).isRequired,
	edited: PropTypes.arrayOf(PropTypes.string).isRequired,
	jsonpath: PropTypes.string,
	tupleLabel: PropTypes.string,
	onEdit: PropTypes.func,
	onToggle: PropTypes.func.isRequired,
	onSelect: PropTypes.func.isRequired,
	selectedJsonpath: PropTypes.string,
	onSubmit: PropTypes.func,
	onChange: PropTypes.func,
	showType: PropTypes.bool,
	info: PropTypes.shape({
		type: PropTypes.string,
		keys: PropTypes.array,
		length: PropTypes.number,
	}).isRequired,
	t: PropTypes.func.isRequired,
};

export function Item({ data, name, opened, edited, tagged, jsonpath, ...props }) {
	if (props.tupleLabel) {
		COMPLEX_TYPES.push(props.tupleLabel);
	}
	const isEdited = edited.indexOf(jsonpath) !== -1 && !!props.onChange;
	const tag = tagged && tagged[jsonpath];

	if (data === undefined || data === null) {
		return (
			<LineItem
				name={name}
				tag={tag}
				onSelect={props.onSelect}
				jsonpath={jsonpath}
				selectedJsonpath={props.selectedJsonpath}
				t={props.t}
			/>
		);
	}

	const info = getDataInfo(data, props.tupleLabel);
	const isNativeType = COMPLEX_TYPES.indexOf(info.type) === -1;

	if (isNativeType) {
		return (
			<LineItem
				name={name}
				onSelect={props.onSelect}
				jsonpath={jsonpath}
				selectedJsonpath={props.selectedJsonpath}
				value={
					<NativeValue
						data={data}
						edit={isEdited}
						jsonpath={jsonpath}
						onEdit={props.onEdit}
						onChange={props.onChange}
						className={props.nativeValueClassName}
					/>
				}
				type={props.showType ? info.type : null}
				tag={tag}
				t={props.t}
			/>
		);
	}

	return (
		<ComplexItem
			{...props}
			name={name}
			tag={tag}
			jsonpath={jsonpath}
			info={info}
			data={data}
			onToggle={props.onToggle}
			onSelect={props.onSelect}
			opened={opened}
			edited={edited}
			tagged={tagged}
			selectedJsonpath={props.selectedJsonpath}
		/>
	);
}

Item.propTypes = {
	data: PropTypes.oneOfType([
		PropTypes.bool,
		PropTypes.number,
		PropTypes.string,
		PropTypes.object,
		PropTypes.array,
	]),
	name: PropTypes.string,
	opened: PropTypes.arrayOf(PropTypes.string),
	edited: PropTypes.arrayOf(PropTypes.string),
	tagged: PropTypes.objectOf(PropTypes.node),
	jsonpath: PropTypes.string,
	tupleLabel: PropTypes.string,
	onEdit: PropTypes.func,
	onToggle: PropTypes.func.isRequired,
	onSelect: PropTypes.func.isRequired,
	selectedJsonpath: PropTypes.string,
	onSubmit: PropTypes.func,
	onChange: PropTypes.func,
	nativeValueClassName: PropTypes.string,
	showType: PropTypes.bool,
	t: PropTypes.func.isRequired,
};

Item.defaultProps = {
	opened: [],
	edited: [],
	jsonpath: '$',
	onEdit: noop,
	onToggle: noop,
	onSelect: noop,
};

/**
 * display a tree view json like.
 * this is an indented list of item where each item render 'id: type #items'
 * @param {object} props react
 */
export function JSONLike({ onSubmit, className, style, ...props }) {
	const rootIsObject = isObject(props.data);

	let label = null;
	if (rootIsObject) {
		if (props.rootLabel) {
			label = (
				<TooltipTrigger label={props.rootLabel} tooltipPlacement="right">
					<div className={theme['root-label-overflow']}>{props.rootLabel}</div>
				</TooltipTrigger>
			);
		}
	}
	const containerProps = {
		id: props.id && `${props.id}-container`,
		className: classNames('tc-object-viewer', theme.container, className),
		style,
	};

	if (onSubmit) {
		return (
			<form
				{...containerProps}
				onSubmit={event => {
					onSubmit(event);
					event.preventDefault();
				}}
			>
				{label}
				<Item {...props} />
			</form>
		);
	}

	return (
		<div {...containerProps}>
			{label}
			<Item {...props} />
		</div>
	);
}

JSONLike.propTypes = {
	id: PropTypes.string,
	data: PropTypes.oneOfType([...VALIDE_TYPES, ...COMPLEX_TYPES].map(t => PropTypes[t])),
	onSubmit: PropTypes.func,
	className: PropTypes.string,
	style: PropTypes.object,
	rootLabel: PropTypes.string,
	tupleLabel: PropTypes.string,
};

export default translate(I18N_DOMAIN_COMPONENTS)(JSONLike);
