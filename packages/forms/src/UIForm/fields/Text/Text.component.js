import PropTypes from 'prop-types';
import React from 'react';
import { OverlayTrigger, Popover } from 'react-bootstrap';

import FieldTemplate from '../FieldTemplate';
import { generateDescriptionId, generateErrorId } from '../../Message/generateId';
import { convertValue } from '../../utils/properties';

export default function Text(props) {
	const {
		id,
		isValid, errorMessage,
		onChange,
		onFinish,
		schema,
		value,
		overlayComponent,
		overlayPlacement,
	} = props;

	const {
		autoFocus,
		description,
		disabled = false,
		placeholder,
		readOnly = false,
		title,
		type,
	} = schema;

	if (type === 'hidden') {
		return <input id={id} type={type} value={value} />;
	}
	const descriptionId = generateDescriptionId(id);
	const errorId = generateErrorId(id);

	const input = (<input
		id={id}
		autoFocus={autoFocus}
		className="form-control"
		disabled={disabled}
		onBlur={event => onFinish(event, { schema })}
		onChange={event => onChange(event, { schema, value: convertValue(type, event.target.value) })}
		placeholder={placeholder}
		readOnly={readOnly}
		type={type}
		value={value}
		aria-invalid={!isValid} // eslint-disable-line jsx-a11y/aria-proptypes
		aria-required={schema.required}
		aria-describedby={`${descriptionId} ${errorId}`}
	/>);

	let field;

	if (overlayComponent) {
		const overlayProps = {
			overlay: <Popover>{overlayComponent}</Popover>,
			placement: overlayPlacement || 'right',
		};

		field = <OverlayTrigger {...overlayProps}>{input}</OverlayTrigger>;
	} else {
		field = input;
	}

	return (
		<FieldTemplate
			description={description}
			descriptionId={descriptionId}
			errorId={errorId}
			errorMessage={errorMessage}
			id={id}
			isValid={isValid}
			label={title}
			labelAfter
			required={schema.required}
		>
			{field}
		</FieldTemplate>
	);
}

if (process.env.NODE_ENV !== 'production') {
	Text.propTypes = {
		id: PropTypes.string,
		isValid: PropTypes.bool,
		errorMessage: PropTypes.string,
		onChange: PropTypes.func.isRequired,
		onFinish: PropTypes.func.isRequired,
		schema: PropTypes.shape({
			autoFocus: PropTypes.bool,
			description: PropTypes.string,
			disabled: PropTypes.bool,
			placeholder: PropTypes.string,
			readOnly: PropTypes.bool,
			title: PropTypes.string,
			type: PropTypes.string,
		}),
		value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
		overlayComponent: PropTypes.element,
		overlayPlacement: OverlayTrigger.propTypes.placement,
	};
}

Text.defaultProps = {
	isValid: true,
	schema: {},
	value: '',
};
