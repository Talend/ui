import React from 'react';
import { Icon, IconsProvider } from 'react-talend-components';
import { orderProperties, retrieveSchema } from 'react-jsonschema-form/lib/utils';

function createCustomObjectField(title) {
	class CustomObjectField extends React.Component {
		static defaultProps = {
			uiSchema: {},
			formData: {},
			errorSchema: {},
			idSchema: {},
			required: false,
			disabled: false,
			readonly: false,
		};

		constructor(props) {
			super(props);
			this.toggle = this.toggle.bind(this);
			this.state = { toggled: false };
		}

		onPropertyChange = name => (value, options) => {
			const newFormData = { ...this.props.formData, [name]: value };
			this.props.onChange(newFormData, options);
		};

		isRequired(name) {
			const schema = this.props.schema;
			return Array.isArray(schema.required) && schema.required.indexOf(name) !== -1;
		}

		toggle(event) {
			event.stopPropagation();
			event.preventDefault();
			const newFormData = {
				...this.props.formData,
				isClosed: !this.props.formData.isClosed,
			};
			this.props.onChange(newFormData);
		}

		render() {
			const {
				uiSchema,
				formData,
				errorSchema,
				idSchema,
				name,
				required,
				disabled,
				readonly,
				onBlur,
				registry,
			} = this.props;
			const { definitions, fields, formContext } = registry;
			const { SchemaField, TitleField, DescriptionField } = fields;
			const schema = retrieveSchema(this.props.schema, definitions);
			let orderedProperties;
			try {
				const properties = Object.keys(schema.properties);
				orderedProperties = orderProperties(properties, uiSchema['ui:order']);
			} catch (err) {
				return (
					<div>
						<p className="config-error" style={{ color: 'red' }}>
							Invalid {name || 'root'} object field configuration:
							<em>{err.message}</em>.
						</p>
						<pre>
							{JSON.stringify(schema)}
						</pre>
					</div>
				);
			}
			const iconTransform = !formData.isClosed ? 'flip-vertical' : '';
			return (
				<fieldset>
					{title &&
						<TitleField
							id={`${idSchema.$id}__title`}
							title={title(formData)}
							required={required}
							formContext={formContext}
						/>}
					<button title="Collapse" onClick={this.toggle} className="toggle">
						<Icon name="talend-caret-down" transform={iconTransform} />
					</button>
					{(uiSchema['ui:description'] || schema.description) &&
						<DescriptionField
							id={`${idSchema.$id}__description`}
							description={uiSchema['ui:description'] || schema.description}
							formContext={formContext}
						/>}
					{!formData.isClosed &&
						orderedProperties.map((name, index) => {
							if (name !== 'isClosed') {
								return (
									<SchemaField
										key={index}
										name={name}
										required={this.isRequired(name)}
										schema={schema.properties[name]}
										uiSchema={uiSchema[name]}
										errorSchema={errorSchema[name]}
										idSchema={idSchema[name]}
										formData={formData[name]}
										onChange={this.onPropertyChange(name)}
										onBlur={onBlur}
										registry={registry}
										disabled={disabled}
										readonly={readonly}
									/>
								);
							}
							return null;
						})}
				</fieldset>
			);
		}
	}
	return CustomObjectField;
}

export default createCustomObjectField;
