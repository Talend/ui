import React from 'react';
import { retrieveSchema } from 'react-jsonschema-form/lib/utils';

import Checkbox from './Checkbox';

class ShowIf extends React.Component {

	constructor(props) {
		super(props);
		this.handleChange.bind(this);
	}

	//getInitialState() {
			//this.oc = this.props.onChange;
			//return Object.assign({}, this.props);
	//}

	handleChange() {
		const p = Object.assign({}, this.props);
		p.schema = retrieveSchema(this.props.schema, this.props.registry.definitions);
		this.props.onSchemaChange(p.schema);
	}

	render() {
		console.debug(this.props);
		return (<Checkbox {...this.props} onChange={this.handleChange} />);
	}
}

ShowIf.propTypes = {
	schema: React.PropTypes.object,
	registry: React.PropTypes.object,
	onSchemaChange: React.PropTypes.func,
	onChange: React.PropTypes.func,
};

export default ShowIf;
