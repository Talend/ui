import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import {
	defaultGetDataType,
	defaultGetDisplayKey,
	defaultGetDisplayValue,
	defaultGetFields,
	defaultGetIcon,
	defaultGetJSONPath,
	defaultGetQuality,
} from './genericViewer.configuration';
import Icon from '../../Icon';
import theme from './GenericViewer.scss';

const paddingLeft = 30;

function DefaultValueItem(props) {
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
	const content = [
		(quality === -1) && (
			<div
				key={'quality'}
				className={classNames(theme['invalid-value'], 'tc-object-viewer-invalid-value')}
			/>
		),
		<div key={'key-value'} className={theme['key-value']}>
			<span key={'key'} className={theme.key}>
				{formattedKey}
			</span>
			{formattedValue !== undefined && ': '}
			<span key={'value'} title={formattedValue} className={theme.value}>
				{formattedValue}
			</span>
		</div>,
	];
	if (onClick) {
		return (
			<div className={className} style={style}>
				<button
					key={'main'}
					aria-label={`Select ${dataKey} (${jsonpath})`}
					onClick={onClick}
					className={theme.main}
				>
					{content}
				</button>
				{getItemMenu && getItemMenu(props)}
			</div>
		);
	}
	return (
		<div className={className} style={style}>
			{content}
		</div>
	);
}
DefaultValueItem.defaultProps = {
	getDisplayKey: defaultGetDisplayKey,
	getQuality: defaultGetQuality,
	getDisplayValue: defaultGetDisplayValue,
};
DefaultValueItem.propTypes = {
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

function DefaultItem(props) {
	const {
		className,
		data,
		fields,
		getIcon,
		getDisplayKey,
		getQuality,
		isOpened,
		jsonpath,
		dataKey,
		onClick,
		onToggle,
		style,
		type,
	} = props;

	const content = [<span key={'datakey'}>{getDisplayKey(props)}</span>];
	if (type === 'array') {
		content.push(
			<span key={'length'}>
				<sup key={'length-badge'} className={classNames(theme.badge, 'badge', 'tc-object-viewer-badge')}>
					{fields.length}
				</sup>
			</span>
		);
	}
	if (!isOpened && getQuality(props) === -1) {
		content.push(
			<div key={'quality'} className={classNames(theme['invalid-dot'], 'tc-object-viewer-invalid-dot')} />
		);
	}

	let main;
	if (onClick) {
		main = (
			<button
				key={'main-button'}
				aria-label={`Select ${dataKey} (${jsonpath})`}
				onClick={onClick}
				className={theme.main}
			>
				{content}
			</button>
		);
	} else {
		main = (<span key={'main-text'} className={theme.main}>{content}</span>);
	}

	const icon = getIcon(props);
	function onIconClick(event) {
		onToggle(event, { data, isOpened, jsonpath });
	}

	return (
		<div className={className} style={style}>
			<Icon
				key={'icon'}
				title={isOpened ? `Collapse ${dataKey} (${jsonpath})` : `Expand ${dataKey} (${jsonpath})`}
				name={icon.name}
				transform={icon.transform}
				className={classNames(theme.caret, icon.className)}
				onClick={onIconClick}
			/>
			{main}
		</div>
	);
}
DefaultItem.defaultProps = {
	getIcon: defaultGetIcon,
	getDisplayKey: defaultGetDisplayKey,
	getQuality: defaultGetQuality,
	fields: [],
};
DefaultItem.propTypes = {
	className: PropTypes.string,
	data: PropTypes.any,
	fields: PropTypes.array,
	getDisplayKey: PropTypes.func,
	getIcon: PropTypes.func,
	getQuality: PropTypes.func,
	isOpened: PropTypes.bool,
	jsonpath: PropTypes.string,
	dataKey: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
	onClick: PropTypes.func,
	onToggle: PropTypes.func,
	style: PropTypes.object,
	type: PropTypes.string,
};

function DefaultFields({ dataKey, fields, jsonpath, level, type, value, ...props }) {
	return (
		<ul className={'tc-object-viewer-nested'}>
			{fields.map((field, index) => {
				const itemProps = {
					...props,
					...field,
					key: index,
					level: level + 1,
					jsonpath: props.getJSONPath({
						dataKey: field.dataKey,
						parent: {
							dataKey,
							jsonpath,
							type,
							value,
						},
					}),
				};

				return (
					<Item {...itemProps} />
				);
			})}
		</ul>
	);
}
DefaultFields.defaultProps = {
	fields: [],
	getJSONPath: defaultGetJSONPath,
};
DefaultFields.propTypes = {
	dataKey: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
	fields: PropTypes.array,
	getJSONPath: PropTypes.func,
	jsonpath: PropTypes.string,
	level: PropTypes.number,
	type: PropTypes.string,
	value: PropTypes.any,
};

function Item(props) {
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
	const isOpened = (isRoot && noRoot) || (opened.indexOf(jsonpath) !== -1);
	const itemType = getDataType(value);

	const spaceAdjustment = { paddingLeft: paddingLeft * level };
	const onClick = onSelect && (event => onSelect(event, jsonpath, value));

	let ItemComponent;
	let FieldsComponent;
	let fields;
	switch (itemType) {
		case 'array':
			ItemComponent = DefaultItem;
			FieldsComponent = DefaultFields;
			fields = getFields(value, itemType);
			break;
		case 'object':
			ItemComponent = DefaultItem;
			FieldsComponent = DefaultFields;
			fields = getFields(value, itemType);
			break;
		default:
			ItemComponent = DefaultValueItem;
	}

	const itemContentClassName = classNames(
		theme.content,
		'tc-object-viewer-content',
		{
			'tc-object-viewer-root': level === 0,
			[theme['no-root']]: isRoot && noRoot,
			[theme.highlight]: isHighlighted,
		},
	);

	return (
		<li className={classNames(theme.item, 'tc-object-viewer-item')}>
			<ItemComponent
				{...props}
				className={itemContentClassName}
				fields={fields}
				onClick={onClick}
				isHighlighted={isHighlighted}
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
	highlighted: [],
	jsonpath: '',
	opened: [],
	value: '',
};
Item.propTypes = {
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

export default function GenericViewer({ className, style, title, ...props }) {
	const cn = classNames(
		theme['tc-viewer'],
		'tc-object-viewer',
		className,
	);
	return (
		<ul className={cn} style={style}>
			<Item
				{...props}
				dataKey={title}
				jsonpath={'$'}
				value={props.data}
				level={0}
			/>
		</ul>
	);
}
GenericViewer.propTypes = {
	className: PropTypes.string,
	data: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
	title: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
	style: PropTypes.object,
};
