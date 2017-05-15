import React, { Component, PropTypes } from 'react';
import { Col, Row } from 'react-bootstrap';
import { toIdSchema } from 'react-jsonschema-form/lib/utils';
import ObjectField from '../fields/ObjectField';

const TOTAL_SPANS = 12;
/***
 * Display form fields in multiple columns
 */
class ColumnsWidget extends Component {

	render() {
		const {
			schema,
			uiSchema,
			formData,
			registry,
			definitions,
			onChange,
		} = this.props;

		const spans = TOTAL_SPANS/(Object.keys(schema.properties).length||1);

		return (
				<Row>
					{
						Object.keys(schema.properties).map((col, idx) => {

							const columnsSchema = schema.properties[col];
							const itemIdSchema = toIdSchema(columnsSchema, col, definitions);

							return (<Col key={idx} md={spans} sm={spans} xs={12}>
								<ObjectField
										idSchema={itemIdSchema}
										formData={formData[col]}
										onChange={(newState => onChange(newState))}
										registry={registry}
										schema={columnsSchema}
										uiSchema={uiSchema[col]}
								/>
							</Col>);
						})
					}
				</Row>
		);
	}
}
if (process.env.NODE_ENV !== 'production') {
	ColumnsWidget.propTypes = {
		id: PropTypes.string,
		formData: PropTypes.object,
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
		definitions: PropTypes.object,
	};
}
export default ColumnsWidget;
