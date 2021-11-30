import PropTypes from 'prop-types';
import React, { useState, useCallback } from 'react';
import invariant from 'invariant';
import isObject from 'lodash/isObject';
import classNames from 'classnames';
import { withTranslation } from 'react-i18next';

import { Action } from '../../Actions';
import TooltipTrigger from '../../TooltipTrigger';
import theme from './JSONLike.scss';
import I18N_DOMAIN_COMPONENTS from '../../constants';
import withTreeGesture from '../../Gesture/withTreeGesture';
import getDefaultT from '../../translate';

function noop() {}

const VALIDE_TYPES = ['number', 'string', 'bool'];
const COMPLEX_TYPES = ['object', 'array'];

export const ARRAY_ABSTRACT = '[...]';
export const OBJECT_ABSTRACT = '{...}';

const dateTimeISOStringRegexp = new RegExp(
	/^(-?(?:[1-9][0-9]*)?[0-9]{4})-(1[0-2]|0[1-9])-(3[01]|0[1-9]|[12][0-9])T(2[0-3]|[01][0-9]):([0-5][0-9]):([0-5][0-9])(.*)?(Z)?$/, // eslint-disable-line max-len
);

const dateTimeRegexp = new RegExp(
	/^(-?(?:[1-9][0-9]*)?[0-9]{4})-(1[0-2]|0[1-9])-(3[01]|0[1-9]|[12][0-9])T(2[0-3]|[01][0-9]):([0-5][0-9]):([0-5][0-9])(\\.[0-9]+)?(Z)?$/, // eslint-disable-line max-len
);
const dateRegexp = new RegExp(
	/^(-?(?:[1-9][0-9]*)?[0-9]{4})-(1[0-2]|0[1-9])-(3[01]|0[1-9]|[12][0-9])$/,
);
const timeRegexp = new RegExp(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]:[0-5][0-9]$/);

export function NativeValue({ data, edit, className, onChange, jsonpath, wrap, isValueOverflown }) {
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

	const lineValueClasses = classNames(className, theme.native, theme[type], {
		[`${theme['wrap-string']}`]: wrap,
		[theme['shrink-value']]: isValueOverflown,
	});

	return <span className={lineValueClasses}>{display}</span>;
}

NativeValue.propTypes = {
	data: PropTypes.oneOfType([PropTypes.bool, PropTypes.number, PropTypes.string]),
	edit: PropTypes.bool,
	className: PropTypes.string,
	onChange: PropTypes.func,
	jsonpath: PropTypes.string,
	wrap: PropTypes.bool,
	isValueOverflown: PropTypes.bool,
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

export function getName(name, t) {
	if (!name) {
		return null;
	}
	return (
		<span key="name" className={theme.key}>
			{name}
			{t('COLON', { defaultValue: ':' })}
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
			isValueOverflown,
			t,
		} = this.props;
		const isSelectedLine = this.isSelected();

		const lineClass = classNames(theme.line, { [theme['full-width']]: isValueOverflown });
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
				onClick={e => {
					e.stopPropagation();
					onSelect(e, { jsonpath });
				}}
				onKeyDown={e => onKeyDown(e, this.ref, { data, hasChildren, isOpened, jsonpath, siblings })}
				ref={ref => {
					this.ref = ref;
				}}
			>
				<div key="line" className={lineClass}>
					{icon}
					<div
						key="line-main"
						className={classNames(theme['line-main'], {
							[theme['shrink-value']]: isValueOverflown,
						})}
					>
						{getName(name, t)}
						{value}
						{type && (
							<div key="type" className={`tc-object-viewer-line-type ${theme.type}`}>
								({type})
							</div>
						)}
						{badge}
						{tag}
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
	isValueOverflown: PropTypes.bool,
	t: PropTypes.func,
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
		} else if (dateTimeISOStringRegexp.test(data)) {
			info.type = 'datetime';
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

function UntranslatedComplexItem(props) {
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
					icon="talend-caret-down"
					iconTransform={isOpened ? undefined : 'rotate-270'}
					id={id && `${id}-toggle`}
					onClick={e => {
						e.stopPropagation();
						props.onToggle(e, { data, isOpened, jsonpath });
					}}
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
						aria-label={t('TC_OBJECT_VIEWER_NB_CHILD', {
							defaultValue: 'Contains {{count}} child',
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
UntranslatedComplexItem.defaultProps = {
	t: getDefaultT(),
};

UntranslatedComplexItem.displayName = 'ComplexItem';

UntranslatedComplexItem.propTypes = {
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

/**
 * translated complex item is still exported as is, the UntranslatedComplexItem undecorated const
 * was kept to avoid import breaking change on client app
 * I think translation probably should not have crept in UI/components.
 * First it create a strong cooupling between the translation stack and the component stack.
 * Second it make UI much more complex.
 *
 * Anyway the next release that may contains breaking changes would be a good opportunity to
 * rename the undecorated component to ComplexItem
 * rename the exported variable containing the translated component to TranslatedComplexItem
 *
 * AxelC
 */
export const ComplexItem = withTranslation(I18N_DOMAIN_COMPONENTS)(UntranslatedComplexItem);

export function Item(props) {
	const { data, tagged, jsonpath, tupleLabel } = props;

	const [lineItemWidth, setLineItemWidth] = useState(false);
	const [nativeValueWrap, setNativeValueWrap] = useState(false);

	const lineItemRef = useCallback(node => {
		if (node) {
			if (node.ref.offsetParent.offsetWidth < node.ref.scrollWidth) {
				setLineItemWidth(true);
			}
		}
	}, []);

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
				ref={lineItemRef}
				{...props}
				value={
					<NativeValue
						key="value"
						data={data}
						edit={isEdited}
						onEdit={props.onEdit}
						onChange={props.onChange}
						className={props.nativeValueClassName}
						wrap={nativeValueWrap}
						isValueOverflown={lineItemWidth}
					/>
				}
				type={props.showType ? info.type : null}
				tag={tag}
				isValueOverflown={lineItemWidth}
				// icon is shown when LineItem value is a long field and needs to be wrapped
				icon={
					lineItemWidth && (
						<Action
							key="toggle"
							className={classNames(theme.chevron, { [theme['chevron-filled']]: nativeValueWrap })}
							icon="talend-chevron-left"
							iconTransform={nativeValueWrap ? 'rotate-90' : 'rotate-270'}
							onClick={e => {
								e.stopPropagation();
								setNativeValueWrap(val => !val);
							}}
							label=""
							aria-hidden
							tabIndex="-1"
							link
						/>
					)
				}
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

export default withTreeGesture(JSONLike);
