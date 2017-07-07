import React, { PropTypes } from 'react';
import classnames from 'classnames';

import ArrayField from 'react-jsonschema-form/lib/components/fields/ArrayField';

import theme from './FilterWidget.scss';

export default function FilterWidget(props) {
	console.log('props', props);
	return (
		<div className={classnames(theme['filter-widget'], 'tf-filter-widget')}>
			<h1>Filter</h1>
			<ArrayField
				schema={props.schema}
				formData={props.formData}
				onChange={props.onChange}
				registry={props.registry}
			/>
		</div>
	);
}

if (process.env.NODE_ENV !== 'production') {
	FilterWidget.propTypes = {
		schema: PropTypes.object.isRequired,
		formData: PropTypes.object.isRequired,
		onChange: PropTypes.func.isRequired,
	};
}
