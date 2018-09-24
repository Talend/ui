import PropTypes from 'prop-types';
import React from 'react';
import invariant from 'invariant';
import isObject from 'lodash/isObject';
import classNames from 'classnames';
import { translate } from 'react-i18next';

import { Action } from '../../Actions';
import TooltipTrigger from '../../TooltipTrigger';
import theme from './JSONLike.scss';
import I18N_DOMAIN_COMPONENTS from '../../constants';
import withTreeGesture from '../../Tree/withTreeGesture';
import getDefaultT from '../../translate';

function noop() {}

const VALIDE_TYPES = ['number', 'string', 'bool'];
const COMPLEX_TYPES = ['object', 'array'];

export const ARRAY_ABSTRACT = '[...]';
export const OBJECT_ABSTRACT = '{...}';

const dateTimeRegexp = new RegExp(
	/^(-?(?:[1-9][0-9]*)?[0-9]{4})-(1[0-2]|0[1-9])-(3[01]|0[1-9]|[12][0-9])T(2[0-3]|[01][0-9]):([0-5][0-9]):([0-5][0-9])(\\.[0-9]+)?(Z)?$/, // eslint-disable-line max-len
);
const dateRegexp = new RegExp(
	/^(-?(?:[1-9][0-9]*)?[0-9]{4})-(1[0-2]|0[1-9])-(3[01]|0[1-9]|[12][0-9])$/,
);
const timeRegexp = new RegExp(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]:[0-5][0-9]$/);

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
	return (
		<span key="name" className={theme.key}>
			{name}:
		</span>
	);
}

export class LineItem extends React.Component {
	getTabIndex(isSelected) {
		let shouldBeFocusable = false;
		if (
			isSelected ||
			(!this.props.selectedJsonpath && this.props.level === 1 && this.props.index === 1)
		) {
			shouldBeFocusable = true;
		}
		return shouldBeFocusable ? 0 : -1;
	}

	isSelected() {
		const { selectedJsonpath, jsonpath } = this.props;
		return selectedJsonpath && selectedJsonpath === jsonpath;
	}

	render() {
		const {
			data,
			id,
			index,
			level,
			isOpened,
			hasChildren,
			siblings,
			name,
			tag,
			jsonpath,
			onKeyDown,
			onSelect,
			children,
			badge,
			icon,
			type,
			value,
		} = this.props;
		const isSelectedLine = this.isSelected();

		const lineChildren = [
			getName(name),
			value,
			type && (
				<div key="type" className={`tc-object-viewer-line-type ${theme.type}`}>
					({type})
				</div>
			),
			badge,
			tag,
		];

		return (
			<li // eslint-disable-line jsx-a11y/no-static-element-interactions
				id={id}
				key={id || index}
				role="treeitem"
				tabIndex={this.getTabIndex(isSelectedLine)}
				aria-expanded={hasChildren ? isOpened : undefined}
				aria-level={level}
				aria-posinset={index}
				aria-setsize={siblings ? siblings.length : 1}
				aria-selected={isSelectedLine}
				className={theme['list-item']}
				onClick={e => onSelect(e, { jsonpath })}
				onKeyDown={e => onKeyDown(e, this.ref, { data, hasChildren, isOpened, jsonpath, siblings })}
				ref={ref => {
					this.ref = ref;
				}}
			>
				<div key="line" className={theme.line}>
					{icon}
					<div key="line-main" className={theme['line-main']}>
						{lineChildren}
					</div>
				</div>
				{children}
			</li>
		);
	}
}

LineItem.propTypes = {
	badge: PropTypes.node,
	children: PropTypes.node,
	data: PropTypes.any,
	hasChildren: PropTypes.bool,
	icon: PropTypes.node,
	id: PropTypes.string,
	index: PropTypes.number,
	isOpened: PropTypes.bool,
	jsonpath: PropTypes.string,
	level: PropTypes.number,
	name: PropTypes.string,
	onKeyDown: PropTypes.func.isRequired,
	onSelect: PropTypes.func.isRequired,
	selectedJsonpath: PropTypes.string,
	siblings: PropTypes.array,
	tag: PropTypes.node,
	type: PropTypes.string,
	value: PropTypes.node,
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

export function ComplexItem(props) {
	const { data, id, info, jsonpath, level, opened, t } = props;
	const isOpened = opened.indexOf(jsonpath) !== -1;

	const decoratedLength = info.type === 'array' ? `[${info.length}]` : `(${info.length})`;

	let children = null;
	if (isOpened) {
		const childrenSiblings = info.keys.map(key => ({
			key,
			data: data[key],
			jsonpath: getJSONPath(key, jsonpath, info.type),
		}));
		children = (
			<ul key="children-group" role="group" className={theme['complex-item']}>
				{info.keys.map((key, i) => {
					const childId = id && `${id}-${key}`;
					return (
						<Item
							{...props}
							key={childId || i}
							data={data[key]}
							id={childId}
							index={i + 1}
							siblings={childrenSiblings}
							jsonpath={getJSONPath(key, jsonpath, info.type)}
							level={level + 1}
							name={key}
						/>
					);
				})}
			</ul>
		);
	}

	return (
		<LineItem
			{...props}
			hasChildren
			isOpened={isOpened}
			icon={
				<Action
					key="toggle"
					className={classNames(theme.toggle, 'tc-object-viewer-toggle')}
					icon={'talend-caret-down'}
					iconTransform={isOpened ? undefined : 'rotate-270'}
					id={id && `${id}-toggle`}
					onClick={e => props.onToggle(e, { data, isOpened, jsonpath })}
					label=""
					aria-hidden
					tabIndex="-1"
					link
				/>
			}
			badge={
				<TooltipTrigger
					key="badge-tooltip"
					className="offset"
					label={getDataAbstract(data)}
					tooltipPlacement="right"
				>
					<sup
						key="badge"
						className={`${theme.badge} badge`}
						aria-label={t('TC_OBJECT_VIEWER_NB_CHILDREN', {
							defaultValue: 'Contains {{count}} children',
							count: info.length,
						})}
					>
						{decoratedLength}
					</sup>
				</TooltipTrigger>
			}
			type={props.showType ? info.type : null}
		>
			{children}
		</LineItem>
	);
}
ComplexItem.defaultProps = {
	t: getDefaultT(),
};
ComplexItem.propTypes = {
	data: PropTypes.oneOfType([
		PropTypes.bool,
		PropTypes.number,
		PropTypes.string,
		PropTypes.object,
		PropTypes.array,
	]),
	id: PropTypes.string,
	info: PropTypes.shape({
		type: PropTypes.string,
		keys: PropTypes.array,
		length: PropTypes.number,
	}).isRequired,
	jsonpath: PropTypes.string,
	level: PropTypes.number,
	onToggle: PropTypes.func.isRequired,
	opened: PropTypes.arrayOf(PropTypes.string).isRequired,
	showType: PropTypes.bool,
	t: PropTypes.func,
};

export function Item(props) {
	const { data, tagged, jsonpath, tupleLabel } = props;

	if (tupleLabel) {
		COMPLEX_TYPES.push(tupleLabel);
	}
	const isEdited = props.edited.indexOf(jsonpath) !== -1 && !!props.onChange;
	const tag = tagged && tagged[jsonpath];

	if (data === undefined || data === null) {
		return <LineItem {...props} tag={tag} />;
	}

	const info = getDataInfo(data, tupleLabel);
	const isNativeType = COMPLEX_TYPES.indexOf(info.type) === -1;

	if (isNativeType) {
		return (
			<LineItem
				{...props}
				value={
					<NativeValue
						key="value"
						data={data}
						edit={isEdited}
						onEdit={props.onEdit}
						onChange={props.onChange}
						className={props.nativeValueClassName}
					/>
				}
				type={props.showType ? info.type : null}
				tag={tag}
			/>
		);
	}

	return <ComplexItem {...props} tag={tag} info={info} />;
}

Item.propTypes = {
	data: PropTypes.oneOfType([
		PropTypes.bool,
		PropTypes.number,
		PropTypes.string,
		PropTypes.object,
		PropTypes.array,
	]),
	edited: PropTypes.arrayOf(PropTypes.string),
	jsonpath: PropTypes.string,
	onEdit: PropTypes.func,
	onChange: PropTypes.func,
	nativeValueClassName: PropTypes.string,
	showType: PropTypes.bool,
	tagged: PropTypes.objectOf(PropTypes.node),
	tupleLabel: PropTypes.string,
};

Item.defaultProps = {
	opened: [],
	edited: [],
	jsonpath: '$',
	onEdit: noop,
};

/**
 * display a tree view json like.
 * this is an indented list of item where each item render 'id: type #items'
 * @param {function} onSubmit Submit callback.
 * @param {string} className User classname, set to the container
 * @param {object} style User inline style, set to the container
 * @param {object} props Rest of react props
 */
export function JSONLike({ onSubmit, className, style, ...props }) {
	const rootIsObject = isObject(props.data);

	let label = null;
	let labelId;
	if (rootIsObject) {
		if (props.rootLabel) {
			labelId = (props.id && `${props.id}-label`) || 'tc-object-viewer-label';
			label = (
				<TooltipTrigger key="label" label={props.rootLabel} tooltipPlacement="right">
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

	const objectTree = [
		label,
		<ul
			className={theme['tc-object-viewer-list']}
			key="tree"
			role="tree"
			aria-label={props['aria-label']}
			aria-labelledby={labelId}
		>
			<Item
				{...props}
				id={props.id && `${props.id}-root`}
				siblings={[{ data: props.data, jsonpath: '$' }]}
				level={1}
				index={1}
			/>
		</ul>,
	];

	if (onSubmit) {
		return (
			<form
				{...containerProps}
				onSubmit={event => {
					onSubmit(event);
					event.preventDefault();
				}}
			>
				{objectTree}
			</form>
		);
	}

	return <div {...containerProps}>{objectTree}</div>;
}
JSONLike.displayName = 'JSONLike';
JSONLike.propTypes = {
	'aria-label': PropTypes.string,
	id: PropTypes.string,
	data: PropTypes.oneOfType([...VALIDE_TYPES, ...COMPLEX_TYPES].map(t => PropTypes[t])),
	onSubmit: PropTypes.func,
	className: PropTypes.string,
	style: PropTypes.object,
	rootLabel: PropTypes.string,
	tupleLabel: PropTypes.string,
};

export default translate(I18N_DOMAIN_COMPONENTS)(withTreeGesture(JSONLike));
