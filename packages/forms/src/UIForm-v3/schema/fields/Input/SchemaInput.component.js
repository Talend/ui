import React from 'react';
import PropTypes from 'prop-types';
import get from 'lodash/get';
import omit from 'lodash/omit';
import { PROPS_TO_REMOVE_FROM_INPUTS } from '../../Widget.component';
import Input from '../../../fields/Input';

export default function SchemaInput(props) {
	const { schema } = props;

	return (
		<Input
			{...omit(props, PROPS_TO_REMOVE_FROM_INPUTS)}
			autoFocus={schema.autoFocus}
			description={schema.description}
			disabled={schema.disabled}
			label={schema.title}
			placeholder={schema.placeholder}
			readOnly={schema.readOnly}
			required={schema.required}
			type={schema.type}
			min={get(schema, 'schema.minimum')}
			max={get(schema, 'schema.maximum')}
			step={get(schema, 'schema.step')}
		/>
	);
}

if (process.env.NODE_ENV !== 'production') {
	SchemaInput.propTypes = {
		schema: PropTypes.shape({
			autoFocus: PropTypes.bool,
			description: PropTypes.string,
			disabled: PropTypes.bool,
			title: PropTypes.string.isRequired,
			placeholder: PropTypes.string,
			readOnly: PropTypes.bool,
			type: PropTypes.string,
			schema: PropTypes.shape({
				minimum: PropTypes.number,
				maximum: PropTypes.maximum,
				step: PropTypes.step,
			}),
		}),
	};
}
