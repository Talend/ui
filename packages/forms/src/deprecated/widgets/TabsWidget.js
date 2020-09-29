import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Tabs, Tab } from 'react-bootstrap';
import { toIdSchema } from 'react-jsonschema-form/lib/utils';
import ObjectField from '../fields/ObjectField';

class TabsField extends Component {
	constructor(props) {
		super(props);
		this.state = { ...props.formData };
	}

	render() {
		const { schema, uiSchema, formData, registry, definitions, id, onChange } = this.props;

		return (
			<Tabs defaultActiveKey={0} id={id}>
				{Object.keys(schema.properties).map((tabKey, index) => {
					const tabSchema = schema.properties[tabKey];
					const itemIdSchema = toIdSchema(tabSchema, tabKey, definitions);
					const saveToFormData = state => {
						const formDataCopy = { ...formData };
						formDataCopy[tabKey] = state;
						onChange(formDataCopy);
					};
					return (
						<Tab eventKey={index} title={tabSchema.title ? tabSchema.title : tabKey} key={index}>
							<ObjectField
								idSchema={itemIdSchema}
								formData={formData[tabKey]}
								onChange={newState => saveToFormData(newState)}
								registry={registry}
								schema={{ ...tabSchema, title: '' }}
								uiSchema={uiSchema[tabKey]}
							/>
						</Tab>
					);
				})}
			</Tabs>
		);
	}
}

if (process.env.NODE_ENV !== 'production') {
	TabsField.propTypes = {
		id: PropTypes.string,
		formData: PropTypes.object,
		onChange: PropTypes.func.isRequired,
		registry: PropTypes.shape({
			widgets: PropTypes.objectOf(PropTypes.oneOfType([PropTypes.func, PropTypes.object]))
				.isRequired,
			fields: PropTypes.objectOf(PropTypes.func).isRequired,
			definitions: PropTypes.object.isRequired,
			formContext: PropTypes.object.isRequired,
		}),
		schema: PropTypes.object.isRequired,
		uiSchema: PropTypes.object,
		definitions: PropTypes.object,
	};
}

export default TabsField;
