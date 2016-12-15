import React, { Component, PropTypes } from 'react';
import { Tabs, Tab } from 'react-bootstrap';
import { toIdSchema } from 'react-jsonschema-form/lib/utils';
import ObjectField from './ObjectField';

class TabsField extends Component {
	constructor(props) {
		super(props);
		this.state = { ...props.formData };
	}

	render() {
		const {
		schema,
		uiSchema,
		idSchema,
		formData,
		registry,
		onChange,
		} = this.props;
		const { definitions } = registry;

		return (
			<Tabs defaultActiveKey={0} id="uncontrolled-tab-example">
				{schema.items.map((tabSchema, index) => {
					const itemIdPrefix = `${idSchema.$id}_${index}`;
					const itemIdSchema = toIdSchema(tabSchema, itemIdPrefix, definitions);
					return (<Tab eventKey={index} title={tabSchema.tabTitle} key={index}>
						<ObjectField
							idSchema={itemIdSchema}
							schema={tabSchema}
							uiSchema={uiSchema}
							formData={formData ? formData.items[index] : null}
							onChange={() => onChange()}
							registry={registry}
						/>
					</Tab>);
				})}
			</Tabs>


		);
	}
}

if (process.env.NODE_ENV !== 'production') {
	TabsField.propTypes = {
		formData: PropTypes.object,
		idSchema: PropTypes.object,
		onChange: PropTypes.func.isRequired,
		registry: PropTypes.shape({
			widgets: PropTypes.objectOf(PropTypes.oneOfType([
				PropTypes.func,
				PropTypes.object,
			])).isRequired,
			fields: PropTypes.objectOf(PropTypes.func).isRequired,
			definitions: PropTypes.object.isRequired,
			formContext: PropTypes.object.isRequired,
		}),
		schema: PropTypes.object.isRequired,
		uiSchema: PropTypes.object,
	};
}

export default TabsField;
