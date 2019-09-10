import PropTypes from 'prop-types';
import React from 'react';
import Icon from '@talend/react-components/lib/Icon';
import { orderProperties, retrieveSchema } from 'react-jsonschema-form/lib/utils';

import theme from '../templates/ArrayFieldTemplate.scss';

function createCollapsibleFieldset(title) {
	class CollapsibleFieldset extends React.Component {
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
						<pre>{JSON.stringify(schema)}</pre>
					</div>
				);
			}
			const iconTransform = !formData.isClosed ? 'flip-vertical' : '';
			return (
				<fieldset className={`${theme.collapsible}`}>
					<div onDoubleClick={this.toggle} id={`${idSchema.$id}__title_bar`} role="button">
						{title && (
							<div onClick={this.toggle} id={`${idSchema.$id}__title_wrapper`} role="button">
								<TitleField
									id={`${idSchema.$id}__title`}
									title={title(formData, uiSchema)}
									required={required}
									formContext={formContext}
								/>
								<button
									onClick={this.toggle}
									id={`${idSchema.$id}__collapse`}
									title="Collapse"
									type="button"
									className="toggle"
								>
									<Icon name="talend-caret-down" transform={iconTransform} />
								</button>
							</div>
						)}
					</div>
					{(uiSchema['ui:description'] || schema.description) && (
						<DescriptionField
							id={`${idSchema.$id}__description`}
							description={uiSchema['ui:description'] || schema.description}
							formContext={formContext}
						/>
					)}
					{orderedProperties.map((fieldName, index) => {
						if (fieldName !== 'isClosed') {
							return (
								<SchemaField
									key={index}
									name={fieldName}
									required={this.isRequired(fieldName)}
									schema={schema.properties[fieldName]}
									uiSchema={uiSchema[fieldName]}
									errorSchema={errorSchema[fieldName]}
									idSchema={idSchema[fieldName]}
									formData={formData[fieldName]}
									onChange={this.onPropertyChange(fieldName)}
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
	if (process.env.NODE_ENV !== 'production') {
		CollapsibleFieldset.propTypes = {
			schema: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
			uiSchema: PropTypes.object, // eslint-disable-line react/forbid-prop-types
			errorSchema: PropTypes.object, // eslint-disable-line react/forbid-prop-types
			idSchema: PropTypes.object, // eslint-disable-line react/forbid-prop-types
			formData: PropTypes.object, // eslint-disable-line react/forbid-prop-types
			onChange: PropTypes.func.isRequired,
			onBlur: PropTypes.func,
			required: PropTypes.bool,
			disabled: PropTypes.bool,
			name: PropTypes.string,
			readonly: PropTypes.bool,
			registry: PropTypes.shape({
				widgets: PropTypes.objectOf(PropTypes.oneOfType([PropTypes.func, PropTypes.object]))
					.isRequired,
				fields: PropTypes.objectOf(PropTypes.func).isRequired,
				definitions: PropTypes.object.isRequired,
				formContext: PropTypes.object.isRequired,
			}),
		};
	}
	return CollapsibleFieldset;
}

export default createCollapsibleFieldset;
