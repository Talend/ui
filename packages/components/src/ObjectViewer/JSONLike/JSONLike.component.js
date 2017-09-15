import PropTypes from 'prop-types';
import React from 'react';
import classNames from 'classnames';
import invariant from 'invariant';

import Icon from '../../Icon';
import TooltipTrigger from '../../TooltipTrigger';
import theme from './JSONLike.scss';

function noop() { }

const VALIDE_TYPES = ['number', 'string', 'boolean'];
const COMPLEX_TYPES = ['object', 'array'];

export const ARRAY_ABSTRACT = '[...]';
export const OBJECT_ABSTRACT = '{...}';

export function NativeValue({ data, edit, onSelect, onEdit, onChange, jsonpath, selectedJsonpath }) {
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

	const isSelectedLine = (selectedJsonpath && (selectedJsonpath === jsonpath));

	const stopAndEdit = (e) => {
		e.stopPropagation();
		onEdit(e, { data, edit, jsonpath });
	};
	//to use until edit is implemented
	const stopAndSelect = (e) => {
		e.stopPropagation();
		onSelect(e, jsonpath);
	};

	if (isSelectedLine) {
		return (
			<div
				className={`${theme.native} ${theme.lineValueSelected}`}
				onClick={stopAndSelect}
			>
				{display}
			</div>
		);
	}

	return (
		<div
			className={`${theme[type]} ${theme.native} ${theme.lineValue}`}
			onClick={stopAndSelect}
		>
			{display}
		</div>
	);
}

NativeValue.propTypes = {
	data: PropTypes.oneOfType([
		PropTypes.bool,
		PropTypes.number,
		PropTypes.string,
	]),
	edit: PropTypes.bool,
	onEdit: PropTypes.func,
	onSelect: PropTypes.func,
	onChange: PropTypes.func,
	jsonpath: PropTypes.string,
	selectedJsonpath: PropTypes.string,
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

export function LineItem({ name, onMouseOver, mouseOverData, jsonpath, selectedJsonpath, onSelect, children }) {
	const props = {};

	if (onMouseOver && onMouseOver !== noop) {
		props.onMouseOver = e => onMouseOver(e, mouseOverData);
	}

	const isHovered = (mouseOverData.data.jsonpath === jsonpath);

	const isSelectedLine = (selectedJsonpath && (selectedJsonpath === jsonpath));

	const stopAndSelect = (e) => {
		e.stopPropagation();
		onSelect(e, jsonpath);
	};

	return (
		<span
			className={isSelectedLine ? theme.selectedLine : isHovered ? theme.unselectedLineHover : null}
			onClick={stopAndSelect}
			{...props }
		>
			{name ? <span className={`${theme.name} ${theme.lineKey}`}> {name}</span > : null}
			{children}
		</span >
	);
}

LineItem.propTypes = {
	name: PropTypes.string,
	onMouseOver: PropTypes.func,
	children: PropTypes.node,
	mouseOverData: PropTypes.object,  // eslint-disable-line react/forbid-prop-types
	jsonpath: PropTypes.string,
	selectedJsonpath: PropTypes.string,
	onSelect: PropTypes.func,
};

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
	}

	return info;
}

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

	if (typeof item === 'boolean') {
		return item.toString();
	}

	return item;
}

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

export function Item({ data, name, opened, edited, jsonpath, ...props }) {
	if (props.tupleLabel) {
		COMPLEX_TYPES.push(props.tupleLabel);
	}

	if (data === undefined) {
		return null;
	}
	const info = getDataInfo(data, props.tupleLabel);
	const isNativeType = COMPLEX_TYPES.indexOf(info.type) === -1;
	const isEdited = edited.indexOf(jsonpath) !== -1 && !!props.onChange;
	const isOpened = opened.indexOf(jsonpath) !== -1;


	if (isNativeType) {
		return (
			<LineItem
				name={name}
				onMouseOver={props.onMouseOver}
				mouseOverData={{ data, isOpened, isEdited }}
				onSelect={props.onSelect}
				jsonpath={jsonpath}
				selectedJsonpath={props.selectedJsonpath}
			>
				<NativeValue
					data={data}
					edit={isEdited}
					jsonpath={jsonpath}
					onSelect={props.onSelect}
					onEdit={props.onEdit}
					onChange={props.onChange}
					selectedJsonpath={props.selectedJsonpath}
				/>
				<div className={theme.lineType}>
					({info.type})
				</div>
			</LineItem >
		);
	}

	const iconName = isOpened ? 'talend-caret-down' : 'talend-chevron-left';
	const iconTransform = isOpened ? null : 'rotate-180';


	return (
		<div>
			<Icon
				name={iconName}
				transform={iconTransform}
				className={theme.widerIconSelection}
				onClick={(e) => {
					e.stopPropagation();
					props.onToggle(e, { data, isOpened, jsonpath });
				}}
			/>
			<LineItem
				name={name}
				mouseOverData={{ data, isOpened, isEdited }}
				onSelect={props.onSelect}
				onToggle={props.onToggle}
				jsonpath={jsonpath}
				selectedJsonpath={props.selectedJsonpath}>
				<span className={theme.hierarchical}>
					<div
						className={`${theme.lineType}`}
						onClick={e => props.onSelect(e, { data, isOpened, jsonpath })}
					>
						&nbsp;&nbsp;({info.type})
					</div>
					<TooltipTrigger className="offset" label={getDataAbstract(data)} tooltipPlacement="right">
						<sup className="badge">{info.length}</sup>
					</TooltipTrigger>
					<ul className={!isOpened ? 'hidden' : `${theme.verticalLine}`}>

						{info.keys.map((key, i) => {
							const jpath = getJSONPath(key, jsonpath, info.type);
							return (
								<li key={i}>
									<Item
										{...props}
										data={data[key]}
										name={key}
										jsonpath={jpath}
										opened={opened}
										edited={edited}
									/>
								</li>
							);
						})}

					</ul>
				</span>
			</LineItem>
		</div >
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
	jsonpath: PropTypes.string,
	tupleLabel: PropTypes.string,
	onMouseOver: PropTypes.func,
	onEdit: PropTypes.func,
	onToggle: PropTypes.func,
	onSelect: PropTypes.func,
	selectedJsonpath: PropTypes.string,
	onSubmit: PropTypes.func,
	onChange: PropTypes.func,
};

Item.defaultProps = {
	opened: [],
	edited: [],
	jsonpath: '$',
	onMouseOver: noop,
	onEdit: noop,
	onToggle: noop,
	onSelect: noop,
};

/**
 * display a tree view json like.
 * this is an indented list of item where each item render 'id: type #items'
 * @param {object} props react
 */
export function JSONLike({ onSubmit, ...props }) {
	if (onSubmit) {
		return (
			<form
				className={`tc-object-viewer ${theme.container} `}
				onSubmit={(event) => {
					onSubmit(event);
					event.preventDefault();
				}}
			>
				<TooltipTrigger
					label={props.rootLabel || 'root'}
					tooltipPlacement="right"
				>
					<div className={theme.rootLabelOverflow}>
						{props.rootLabel || 'root'}
					</div>
				</TooltipTrigger>
				<Item {...props} />
			</form>
		);
	}

	return (
		<div className={`tc-object-viewer ${theme.container} `}>
			<TooltipTrigger
				label={props.rootLabel || 'root'}
				tooltipPlacement="right"
			>
				<div className={theme.rootLabelOverflow}>
					{props.rootLabel || 'root'}
				</div>
			</TooltipTrigger>

			<Item {...props} />
		</div>
	);
}

JSONLike.propTypes = {
	onSubmit: PropTypes.func,
	rootLabel: PropTypes.string,
	tupleLabel: PropTypes.string,
};

export default JSONLike;
