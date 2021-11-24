import PropTypes from 'prop-types';
import React from 'react';
import { TextMode as FieldTemplate } from '../../FieldTemplate';
import TextModeArrayTemplate from '../../../fieldsets/Array/displayMode/TextModeArrayTemplate.component';

export default function TextMode(props) {
	if (Array.isArray(props.value)) {
		return <TextModeArrayTemplate {...props} />;
	}
	const { id, schema, value } = props;
	const { title, labelProps } = schema;
	return (
		<FieldTemplate id={id} label={title} labelProps={labelProps}>
			{value}
		</FieldTemplate>
	);
}

if (process.env.NODE_ENV !== 'production') {
	TextMode.propTypes = {
		id: PropTypes.string,
		schema: PropTypes.shape({
			title: PropTypes.string,
			labelProps: PropTypes.object,
		}),
		value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
	};
}

TextMode.defaultProps = {
	schema: {},
	value: '',
};
