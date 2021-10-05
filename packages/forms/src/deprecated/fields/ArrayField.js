import React, { Component } from 'react';
import PropTypes from 'prop-types';

import UnsupportedField from 'react-jsonschema-form/lib/components/fields/UnsupportedField';
import {
	getWidget,
	getDefaultFormState,
	getUiOptions,
	isMultiSelect,
	isFilesArray,
	isFixedItems,
	allowAdditionalItems,
	optionsList,
	retrieveSchema,
	toIdSchema,
	getDefaultRegistry,
} from 'react-jsonschema-form/lib/utils';

function ArrayFieldTitle({ TitleField, idSchema, title, required }) {
	if (!title) {
		// See #312: Ensure compatibility with old versions of React.
		return <div />;
	}
	const id = `${idSchema.$id}__title`;
	return <TitleField id={id} title={title} required={required} />;
}

function ArrayFieldDescription({ DescriptionField, idSchema, description }) {
	if (!description) {
		// See #312: Ensure compatibility with old versions of React.
		return <div />;
	}
	const id = `${idSchema.$id}__description`;
	return <DescriptionField id={id} description={description} />;
}

function IconBtn(props) {
	const { type = 'default', icon, className, ...otherProps } = props;
	return (
		<button type="button" className={`btn btn-${type} ${className}`} {...otherProps}>
			<i className={`glyphicon glyphicon-${icon}`} />
		</button>
	);
}

// Used in the two templates
function DefaultArrayItem(props) {
	const btnStyle = {
		flex: 1,
		paddingLeft: 6,
		paddingRight: 6,
		fontWeight: 'bold',
	};
	return (
		<div key={props.index} className={props.className}>
			<div className={props.hasToolbar ? 'col-xs-9' : 'col-xs-12'}>{props.children}</div>

			{props.hasToolbar ? (
				<div className="col-xs-3 array-item-toolbox">
					<div className="btn-group" style={{ display: 'flex', justifyContent: 'space-around' }}>
						{props.hasMoveUp || props.hasMoveDown ? (
							<IconBtn
								icon="arrow-up"
								className="array-item-move-up"
								tabIndex="-1"
								style={btnStyle}
								disabled={props.disabled || props.readonly || !props.hasMoveUp}
								onClick={props.onReorderClick(props.index, props.index - 1)}
							/>
						) : null}

						{props.hasMoveUp || props.hasMoveDown ? (
							<IconBtn
								icon="arrow-down"
								className="array-item-move-down"
								tabIndex="-1"
								style={btnStyle}
								disabled={props.disabled || props.readonly || !props.hasMoveDown}
								onClick={props.onReorderClick(props.index, props.index + 1)}
							/>
						) : null}

						{props.hasRemove ? (
							<IconBtn
								type="danger"
								icon="remove"
								className="array-item-remove"
								tabIndex="-1"
								style={btnStyle}
								disabled={props.disabled || props.readonly}
								onClick={props.onDropIndexClick(props.index)}
							/>
						) : null}
					</div>
				</div>
			) : null}
		</div>
	);
}

function DefaultFixedArrayFieldTemplate(props) {
	return (
		<fieldset className={props.className}>
			<ArrayFieldTitle
				key={`array-field-title-${props.idSchema.$id}`}
				TitleField={props.TitleField}
				idSchema={props.idSchema}
				title={props.uiSchema['ui:title'] || props.title}
				required={props.required}
			/>

			{props.uiSchema['ui:description'] || props.schema.description ? (
				<div className="field-description" key={`field-description-${props.idSchema.$id}`}>
					{props.uiSchema['ui:description'] || props.schema.description}
				</div>
			) : null}

			<div className="row array-item-list" key={`array-item-list-${props.idSchema.$id}`}>
				{props.items && props.items.map(DefaultArrayItem)}
			</div>

			{props.canAdd ? (
				<AddButton onClick={props.onAddClick} disabled={props.disabled || props.readonly} />
			) : null}
		</fieldset>
	);
}

function DefaultNormalArrayFieldTemplate(props) {
	return (
		<fieldset className={props.className}>
			<ArrayFieldTitle
				key={`array-field-title-${props.idSchema.$id}`}
				TitleField={props.TitleField}
				idSchema={props.idSchema}
				title={props.uiSchema['ui:title'] || props.title}
				required={props.required}
			/>

			{props.uiSchema['ui:description'] || props.schema.description ? (
				<ArrayFieldDescription
					key={`array-field-description-${props.idSchema.$id}`}
					DescriptionField={props.DescriptionField}
					idSchema={props.idSchema}
					description={props.uiSchema['ui:description'] || props.schema.description}
				/>
			) : null}
			<div className="row array-item-list" key={`array-item-list-${props.idSchema.$id}`}>
				{props.items && props.items.map(DefaultArrayItem)}
			</div>

			{props.canAdd ? (
				<AddButton onClick={props.onAddClick} disabled={props.disabled || props.readonly} />
			) : null}
		</fieldset>
	);
}

class ArrayField extends Component {
	static defaultProps = {
		uiSchema: {},
		formData: [],
		idSchema: {},
		registry: getDefaultRegistry(),
		required: false,
		disabled: false,
		readonly: false,
		autofocus: false,
	};

	constructor(props) {
		super(props);
		this.onAddClick = this.onAddClick.bind(this);
		this.onDropIndexClick = this.onDropIndexClick.bind(this);
		this.onReorderClick = this.onReorderClick.bind(this);
		this.onChangeForIndex = this.onChangeForIndex.bind(this);
		this.onSelectChange = this.onSelectChange.bind(this);
	}

	onAddClick(event) {
		event.preventDefault();
		const { schema, formData, registry } = this.props;
		const { definitions } = registry;
		let itemSchema = schema.items;
		if (isFixedItems(schema) && allowAdditionalItems(schema)) {
			itemSchema = schema.additionalItems;
		}
		formData.forEach(item => Object.assign(item, { isClosed: true }));
		this.props.onChange([...formData, getDefaultFormState(itemSchema, undefined, definitions)], {
			validate: false,
		});
	}

	onDropIndexClick(index) {
		return event => {
			if (event) {
				event.preventDefault();
			}
			const { formData, onChange } = this.props;
			// refs #195: revalidate to ensure properly reindexing errors
			onChange(formData.filter((_, i) => i !== index), { validate: true });
		};
	}

	onReorderClick(index, newIndex) {
		return event => {
			if (event) {
				event.preventDefault();
				event.target.blur();
			}
			const { formData, onChange } = this.props;
			onChange(
				formData.map((item, i) => {
					if (i === newIndex) {
						return formData[index];
					} else if (i === index) {
						return formData[newIndex];
					}
					return item;
				}),
				{ validate: true },
			);
		};
	}

	onChangeForIndex(index) {
		return value => {
			const { formData, onChange } = this.props;
			onChange(
				formData.map((item, i) => {
					// We need to treat undefined items as nulls to have validation.
					// See https://github.com/tdegrunt/jsonschema/issues/206
					const jsonValue = typeof value === 'undefined' ? null : value;
					return index === i ? jsonValue : item;
				}),
				{ validate: false },
			);
		};
	}

	onSelectChange(value) {
		this.props.onChange(value, { validate: false });
	}

	get itemTitle() {
		const { schema } = this.props;
		return schema.items.title || schema.items.description || 'Item';
	}

	renderNormalArray() {
		const {
			schema,
			uiSchema,
			formData,
			errorSchema,
			idSchema,
			name,
			required,
			disabled,
			readonly,
			autofocus,
			registry,
			formContext,
			onBlur,
			onChange,
			onFocus,
		} = this.props;
		const title = schema.title === undefined ? name : schema.title;
		const { ArrayFieldTemplate, definitions, fields, widgets } = registry;
		const { TitleField, DescriptionField } = fields;
		const itemsSchema = retrieveSchema(schema.items, definitions);
		const { widget, addable = true, type = 'element', ...options } = getUiOptions(uiSchema);
		if (typeof widget === 'string') {
			if (widget === 'hidden') {
				return null;
			}
			const Widget = getWidget(schema, widget, widgets);
			const onChangeHandler = value => {
				onChange(value, options);
			};
			return (
				<Widget
					id={idSchema && idSchema.$id}
					onChange={onChangeHandler}
					onBlur={onBlur}
					schema={schema}
					formData={formData}
					uiSchema={uiSchema}
					registry={this.props.registry}
					definitions={definitions}
				/>
			);
		}

		const arrayProps = {
			type,
			canAdd: addable,
			minItems: schema.minItems || 0,
			maxItems: schema.maxItems || 999,
			items: formData.map((item, index) => {
				const itemErrorSchema = errorSchema ? errorSchema[index] : undefined;
				const itemIdPrefix = `${idSchema.$id}_${index}`;
				const itemIdSchema = toIdSchema(itemsSchema, itemIdPrefix, definitions);
				return this.renderArrayFieldItem({
					index,
					canMoveUp: index > 0,
					canMoveDown: index < formData.length - 1,
					itemSchema: itemsSchema,
					itemIdSchema,
					itemErrorSchema,
					itemData: item,
					itemUiSchema: uiSchema.items,
					autofocus: autofocus && index === 0,
					onBlur,
					onFocus,
				});
			}),
			className: `field field-array field-array-of-${itemsSchema.type}`,
			DescriptionField,
			disabled,
			idSchema,
			uiSchema,
			onAddClick: this.onAddClick,
			readonly,
			required,
			schema,
			title,
			TitleField,
			formContext,
			formData,
		};

		// Check if a custom render function was passed in
		const TemplateComponent = ArrayFieldTemplate || DefaultNormalArrayFieldTemplate;
		return <TemplateComponent {...arrayProps} />;
	}

	renderMultiSelect() {
		const {
			schema,
			idSchema,
			uiSchema,
			disabled,
			readonly,
			autofocus,
			onBlur,
			onFocus,
			registry,
		} = this.props;
		const items = this.props.formData;
		const { widgets, definitions, formContext } = registry;
		const itemsSchema = retrieveSchema(schema.items, definitions);
		const enumOptions = optionsList(itemsSchema);
		const { widget = 'select', ...options } = {
			...getUiOptions(uiSchema),
			enumOptions,
		};
		const Widget = getWidget(schema, widget, widgets);
		return (
			<Widget
				id={idSchema && idSchema.$id}
				multiple
				onChange={this.onSelectChange}
				onBlur={onBlur}
				onFocus={onFocus}
				options={options}
				schema={schema}
				value={items}
				disabled={disabled}
				readonly={readonly}
				formContext={formContext}
				autofocus={autofocus}
			/>
		);
	}

	renderFiles() {
		const {
			schema,
			uiSchema,
			idSchema,
			name,
			disabled,
			readonly,
			autofocus,
			onBlur,
			onFocus,
			registry,
		} = this.props;
		const title = schema.title || name;
		const items = this.props.formData;
		const { widgets, formContext } = registry;
		const { widget = 'files', ...options } = getUiOptions(uiSchema);
		const Widget = getWidget(schema, widget, widgets);
		return (
			<Widget
				options={options}
				id={idSchema && idSchema.$id}
				multiple
				onChange={this.onSelectChange}
				onBlur={onBlur}
				onFocus={onFocus}
				schema={schema}
				title={title}
				value={items}
				disabled={disabled}
				readonly={readonly}
				formContext={formContext}
				autofocus={autofocus}
			/>
		);
	}

	renderFixedArray() {
		const {
			schema,
			uiSchema,
			errorSchema,
			idSchema,
			name,
			required,
			disabled,
			readonly,
			autofocus,
			registry,
			onBlur,
			onFocus,
		} = this.props;
		const title = schema.title || name;
		let items = this.props.formData;
		const { ArrayFieldTemplate, definitions, fields } = registry;
		const { TitleField } = fields;
		const itemSchemas = schema.items.map(item => retrieveSchema(item, definitions));
		const additionalSchema = allowAdditionalItems(schema)
			? retrieveSchema(schema.additionalItems, definitions)
			: null;
		const { addable = true } = getUiOptions(uiSchema);
		const canAdd = addable && additionalSchema;
		if (!items || items.length < itemSchemas.length) {
			// to make sure at least all fixed items are generated
			items = items || [];
			items = items.concat(new Array(itemSchemas.length - items.length));
		}

		// These are the props passed into the render function
		const arrayProps = {
			canAdd,
			className: 'field field-array field-array-fixed-items',
			disabled,
			idSchema,
			items: items.map((item, index) => {
				const additional = index >= itemSchemas.length;
				const itemSchema = additional ? additionalSchema : itemSchemas[index];
				const itemIdPrefix = `${idSchema.$id}_${index}`;
				const itemIdSchema = toIdSchema(itemSchema, itemIdPrefix, definitions);

				const itemErrorSchema = errorSchema ? errorSchema[index] : undefined;
				let itemUiSchema = null;
				if (additional) {
					itemUiSchema = uiSchema.additionalItems || {};
				} else if (Array.isArray(uiSchema.items)) {
					itemUiSchema = uiSchema.items[index];
				} else {
					itemUiSchema = uiSchema.items || {};
				}

				return this.renderArrayFieldItem({
					index,
					canRemove: additional,
					canMoveUp: index >= itemSchemas.length + 1,
					canMoveDown: additional && index < items.length - 1,
					itemSchema,
					itemData: item,
					itemUiSchema,
					itemIdSchema,
					itemErrorSchema,
					autofocus: autofocus && index === 0,
					onBlur,
					onFocus,
				});
			}),
			onAddClick: this.onAddClick,
			readonly,
			required,
			schema,
			uiSchema,
			title,
			TitleField,
		};

		// Check if a custom template template was passed in
		const Template = ArrayFieldTemplate || DefaultFixedArrayFieldTemplate;
		return <Template {...arrayProps} />;
	}

	renderArrayFieldItem(props) {
		const {
			index,
			canRemove = true,
			canMoveUp = true,
			canMoveDown = true,
			itemSchema,
			itemData,
			itemUiSchema,
			itemIdSchema,
			itemErrorSchema,
			autofocus,
			onBlur,
			onFocus,
		} = props;
		const { disabled, readonly, uiSchema, registry } = this.props;
		const {
			fields: { SchemaField },
		} = registry;
		const { orderable, removable } = {
			orderable: true,
			removable: true,
			...uiSchema['ui:options'],
		};
		const has = {
			moveUp: orderable && canMoveUp,
			moveDown: orderable && canMoveDown,
			remove: removable && canRemove,
		};
		has.toolbar = Object.keys(has).some(key => has[key]);

		return {
			children: (
				<SchemaField
					schema={itemSchema}
					uiSchema={itemUiSchema}
					formData={itemData}
					errorSchema={itemErrorSchema}
					idSchema={itemIdSchema}
					required={itemSchema.type === 'string' && itemSchema.minLength > 0}
					onChange={this.onChangeForIndex(index)}
					onBlur={onBlur}
					onFocus={onFocus}
					registry={this.props.registry}
					disabled={this.props.disabled}
					readonly={this.props.readonly}
					autofocus={autofocus}
				/>
			),
			className: 'array-item',
			disabled,
			hasToolbar: has.toolbar,
			hasMoveUp: has.moveUp,
			hasMoveDown: has.moveDown,
			hasRemove: has.remove,
			index,
			itemData,
			onDropIndexClick: this.onDropIndexClick,
			onReorderClick: this.onReorderClick,
			readonly,
		};
	}

	render() {
		const { schema, uiSchema, idSchema, registry } = this.props;
		const { definitions } = registry;
		// eslint-disable-next-line no-prototype-builtins
		if (!schema.hasOwnProperty('items')) {
			return (
				<UnsupportedField schema={schema} idSchema={idSchema} reason="Missing items definition" />
			);
		}
		if (isFixedItems(schema)) {
			return this.renderFixedArray();
		}
		if (isFilesArray(schema, uiSchema, definitions)) {
			return this.renderFiles();
		}
		if (isMultiSelect(schema, definitions)) {
			return this.renderMultiSelect();
		}
		return this.renderNormalArray();
	}
}

function AddButton({ onClick, disabled }) {
	return (
		<div className="row">
			<p className="col-xs-3 col-xs-offset-9 array-item-add text-right">
				<IconBtn
					type="info"
					icon="plus"
					className="btn-add col-xs-12"
					tabIndex="0"
					onClick={onClick}
					disabled={disabled}
				/>
			</p>
		</div>
	);
}

if (process.env.NODE_ENV !== 'production') {
	ArrayField.propTypes = {
		schema: PropTypes.object.isRequired,
		uiSchema: PropTypes.shape({
			'ui:options': PropTypes.shape({
				addable: PropTypes.bool,
				orderable: PropTypes.bool,
				removable: PropTypes.bool,
			}),
		}),
		idSchema: PropTypes.object,
		errorSchema: PropTypes.object,
		onChange: PropTypes.func.isRequired,
		onBlur: PropTypes.func,
		onFocus: PropTypes.func,
		formData: PropTypes.array,
		required: PropTypes.bool,
		disabled: PropTypes.bool,
		readonly: PropTypes.bool,
		autofocus: PropTypes.bool,
		name: PropTypes.string,
		formContext: PropTypes.object,
		registry: PropTypes.shape({
			widgets: PropTypes.objectOf(PropTypes.oneOfType([PropTypes.func, PropTypes.object]))
				.isRequired,
			fields: PropTypes.objectOf(PropTypes.func).isRequired,
			definitions: PropTypes.object.isRequired,
			formContext: PropTypes.object.isRequired,
		}),
	};

	ArrayFieldTitle.propTypes = {
		idSchema: PropTypes.object,
		required: PropTypes.bool,
		title: PropTypes.string,
		TitleField: PropTypes.element,
	};

	ArrayFieldDescription.propTypes = {
		idSchema: PropTypes.object,
		description: PropTypes.string,
		DescriptionField: PropTypes.element,
	};

	IconBtn.propTypes = {
		type: PropTypes.string,
		icon: PropTypes.string,
		className: PropTypes.string,
	};

	DefaultArrayItem.propTypes = {
		index: PropTypes.number,
		className: PropTypes.string,
		hasToolbar: PropTypes.bool,
		children: PropTypes.node,
		hasMoveUp: PropTypes.bool,
		hasMoveDown: PropTypes.bool,
		hasRemove: PropTypes.bool,
		disabled: PropTypes.bool,
		readonly: PropTypes.bool,
		onReorderClick: PropTypes.func,
		onDropIndexClick: PropTypes.func,
	};

	DefaultFixedArrayFieldTemplate.propTypes = {
		className: PropTypes.string,
		idSchema: PropTypes.object,
		schema: PropTypes.object,
		TitleField: PropTypes.element,
		title: PropTypes.string,
		required: PropTypes.bool,
		items: PropTypes.arrayOf(PropTypes.shape(DefaultArrayItem.propTypes)),
		canAdd: PropTypes.bool,
		onAddClick: PropTypes.func,
		disabled: PropTypes.bool,
		readonly: PropTypes.bool,
		uiSchema: PropTypes.shape({
			'ui:title': PropTypes.string,
			'ui:description': PropTypes.string,
		}),
	};

	DefaultNormalArrayFieldTemplate.propTypes = {
		className: PropTypes.string,
		title: PropTypes.string,
		TitleField: PropTypes.element,
		DescriptionField: PropTypes.element,
		required: PropTypes.bool,
		disabled: PropTypes.bool,
		readonly: PropTypes.bool,
		canAdd: PropTypes.bool,
		idSchema: PropTypes.object,
		schema: PropTypes.object,
		onAddClick: PropTypes.func,
		items: PropTypes.arrayOf(PropTypes.DefaultArrayItem),
		uiSchema: PropTypes.shape({
			'ui:title': PropTypes.string,
			'ui:description': PropTypes.string,
		}),
	};

	AddButton.propTypes = {
		onClick: PropTypes.func,
		disabled: PropTypes.bool,
	};
}

export default ArrayField;
