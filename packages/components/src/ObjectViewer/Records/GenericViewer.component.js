import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import theme from './GenericViewer.scss';
import getJSONPath from '../jsonPath';
import Icon from '../../Icon';

const paddingLeft = 30;
const marginLeft = 6;

function defaultFormatValue(value) {
	if (typeof value === 'string') {
		return `"${value}"`;
	}
	return value;
}

function defaultGetDataType(data) {
	if (Array.isArray(data)) {
		return 'array';
	}
	return typeof data;
}

function defaultGetFields(data, type) {
	if (type === 'object') {
		return Object.keys(data).map(dataKey => ({ dataKey, value: data[dataKey] }));
	}
	return data;
}

function defaultGetValue(value) {
	return value;
}

function getDefaultIcon(type, isOpened, onClick) {
	const name = isOpened ? 'talend-caret-down' : 'talend-chevron-left';
	const transform = isOpened ? null : 'rotate-180';

	return (
		<Icon
			name={name}
			transform={transform}
			className={theme.caret}
			onClick={onClick}
		/>
	);
}

function DefaultValueItem({ dataKey, formatValue, getValue, style, value }) {
	return (
		<span className={theme.title} style={style}>
			<span className={theme.key}>{dataKey}</span>:
			<span className={theme.value}>{formatValue(getValue(value))}</span>
		</span>
	);
}
DefaultValueItem.defaultProps = {
	formatValue: defaultFormatValue,
	getValue: defaultGetValue,
	value: '',
};
DefaultValueItem.propTypes = {
	dataKey: PropTypes.string,
	formatValue: PropTypes.func,
	getValue: PropTypes.func,
	style: PropTypes.object,
	value: PropTypes.any,
};

function DefaultItem(props) {
	const {
		data,
		fields,
		getIcon,
		isOpened,
		jsonpath,
		dataKey,
		onClick,
		onToggle,
		style,
		type,
	} = props;
	function onIconClick(event) {
		onToggle(event, { data, isOpened, jsonpath });
	}

	const content = [<span>{dataKey}</span>];
	if (type === 'array') {
		content.push(
			<span>
				<sup className={classNames(theme.badge, 'badge')}>{fields.length}</sup>
			</span>
		);
	}

	let main;
	if (onClick) {
		main = (<button onClick={onClick} className={theme.main}>{content}</button>);
	} else {
		main = (<span className={theme.main}>{content}</span>);
	}

	return (
		<div className={theme.title} style={style}>
			{getIcon(type, isOpened, onIconClick)}
			{main}
		</div>
	);
}
DefaultItem.defaultProps = {
	getIcon: getDefaultIcon,
	fields: [],
};
DefaultItem.propTypes = {
	data: PropTypes.any,
	fields: PropTypes.array,
	getIcon: PropTypes.func,
	isOpened: PropTypes.bool,
	jsonpath: PropTypes.string,
	dataKey: PropTypes.string,
	onClick: PropTypes.func,
	onToggle: PropTypes.func,
	style: PropTypes.object,
	type: PropTypes.string,
};

function DefaultFields({ fields, jsonpath, level, type, ...props }) {
	return (
		<ul>
			{fields.map((field, index) => {
				const itemProps = {
					...props,
					key: index,
					level: level + 1,
					jsonpath: getJSONPath(index, jsonpath, type),
				};
				if (type === 'array') {
					itemProps.dataKey = index;
					itemProps.value = field;
				} else if (type === 'object') {
					itemProps.dataKey = field.dataKey;
					itemProps.value = field.value;
				}
				return (
					<Item {...itemProps} />
				);
			})}
		</ul>
	);
}
DefaultFields.defaultProps = {
	fields: [],
};
DefaultFields.propTypes = {
	fields: PropTypes.array,
	jsonpath: PropTypes.string,
	level: PropTypes.number,
	type: PropTypes.string,
};

function Item(props) {
	const {
		getDataType,
		getFields,
		jsonpath,
		level,
		nodeRenderers,
		onSelect,
		opened,
		value,
	} = props;
	const isOpened = opened.indexOf(jsonpath) !== -1;
	const itemType = getDataType(value);

	const caretSpaceAdjustment = Math.max(marginLeft * level, 0);
	const levelSpaceAdjustment = Math.max(paddingLeft * (level - 1), 0);
	const spaceAdjustment = { paddingLeft: caretSpaceAdjustment + levelSpaceAdjustment };
	const onClick = onSelect && (event => onSelect(event, jsonpath, value));

	let ItemComponent;
	let FieldsComponent;
	let fields;
	switch (itemType) {
		case 'array':
			ItemComponent = nodeRenderers.array || DefaultItem;
			FieldsComponent = nodeRenderers.arrayFields || DefaultFields;
			fields = getFields(value, itemType);
			break;
		case 'object':
			ItemComponent = nodeRenderers.object || DefaultItem;
			FieldsComponent = nodeRenderers.objectFields || DefaultFields;
			fields = getFields(value, itemType);
			break;
		default:
			ItemComponent = nodeRenderers.value || DefaultValueItem;
	}

	return (
		<li className={classNames(theme.item, 'tc-viewer-item')}>
			<ItemComponent
				{...props}
				fields={fields}
				onClick={onClick}
				isOpened={isOpened}
				style={spaceAdjustment}
				type={itemType}
			/>
			{isOpened &&
				<FieldsComponent {...props} type={itemType} fields={fields} />
			}
		</li>
	);
}
Item.defaultProps = {
	getDataType: defaultGetDataType,
	getFields: defaultGetFields,
	jsonpath: '',
	nodeRenderers: {},
	value: '',
};
Item.propTypes = {
	getDataType: PropTypes.func,
	getFields: PropTypes.func,
	jsonpath: PropTypes.string,
	level: PropTypes.number,
	nodeRenderers: PropTypes.shape({
		array: PropTypes.func,
		object: PropTypes.func,
		value: PropTypes.func,
	}),
	onSelect: PropTypes.func,
	opened: PropTypes.arrayOf(PropTypes.string),
	value: PropTypes.any,
};

export default function GenericViewer({ className, style, ...props }) {
	return (
		<ul className={classNames(theme['tc-viewer'], 'tc-viewer', className)} style={style}>
			<Item {...props} value={props.data} level={0} />
		</ul>
	);
}
GenericViewer.defaultProps = {
	opened: [],
};
GenericViewer.propTypes = {
	className: PropTypes.string,
	data: PropTypes.oneOfType(PropTypes.array, PropTypes.object),
	style: PropTypes.object,
};
