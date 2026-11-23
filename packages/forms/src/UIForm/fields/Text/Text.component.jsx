/* eslint-disable jsx-a11y/no-autofocus */
import React from 'react';

import get from 'lodash/get';
import PropTypes from 'prop-types';

import { Form } from '@talend/design-system';

import { generateDescriptionId, generateErrorId } from '../../Message/generateId';
import { getLabelProps } from '../../utils/labels';
import { convertValue, extractDataAttributes } from '../../utils/properties';
import { isSafeUrl } from '../../utils/url';

const SAFE_LINK_TEXT_KEYS = ['target', 'title'];

/**
 * Rebuild the password field link from an explicit allowlist of string fields.
 * The UI schema is not trusted: any other key (`is`, `on*` handlers, `as`, `icon`…)
 * must never reach the design-system Link.
 */
function getSafeLink(link) {
	if (!link || typeof link !== 'object') {
		return null;
	}
	const safeLink = {};
	if (typeof link.href === 'string' && isSafeUrl(link.href)) {
		safeLink.href = link.href;
	}
	SAFE_LINK_TEXT_KEYS.forEach(key => {
		if (typeof link[key] === 'string') {
			safeLink[key] = link[key];
		}
	});
	const text = [link.children, link.label].find(value => typeof value === 'string');
	if (text !== undefined) {
		safeLink.children = text;
	}
	return safeLink;
}

export default function Text(props) {
	const { id, isValid, errorMessage, onChange, onFinish, schema, value, valueIsUpdating } = props;
	const {
		autoComplete,
		autoFocus,
		description,
		disabled = false,
		labelProps,
		link = null,
		placeholder,
		readOnly = false,
		title,
		type,
		...rest
	} = schema;

	if (type === 'hidden') {
		return <input id={id} type={type} value={value} />;
	}
	const descriptionId = generateDescriptionId(id);
	const errorId = generateErrorId(id);
	let fieldProps = {
		id,
		autoComplete,
		autoFocus,
		disabled: disabled || valueIsUpdating,
		onBlur: event => {
			if (onFinish) {
				onFinish(event, { schema });
			}
		},
		onChange: event => {
			if (onChange) {
				onChange(event, { schema, value: convertValue(type, event.target.value) });
			}
		},
		placeholder,
		readOnly,
		type,
		value,
		label: getLabelProps(title, labelProps, schema.hint, schema.required),
		required: schema.required,
		description: errorMessage || description,
		hasError: !isValid,
		'aria-invalid': !isValid,
		'aria-required': schema.required,
		'aria-describedby': `${descriptionId} ${errorId}`,
		...extractDataAttributes(rest),
	};

	if (type === 'number') {
		fieldProps = {
			...fieldProps,
			min: get(schema, 'schema.minimum'),
			max: get(schema, 'schema.maximum'),
			step: get(schema, 'schema.step'),
		};
	}

	if (type === 'password') {
		fieldProps = {
			...fieldProps,
			link: getSafeLink(link),
		};
	}

	const componentNames = {
		text: Form.Text,
		number: Form.Number,
		password: Form.Password,
	};

	return React.createElement(componentNames[type] || Form.Text, fieldProps);
}

if (process.env.NODE_ENV !== 'production') {
	Text.propTypes = {
		id: PropTypes.string,
		isValid: PropTypes.bool,
		errorMessage: PropTypes.string,
		onChange: PropTypes.func.isRequired,
		onFinish: PropTypes.func.isRequired,
		schema: PropTypes.shape({
			className: PropTypes.string,
			autoComplete: PropTypes.string,
			autoFocus: PropTypes.bool,
			description: PropTypes.string,
			disabled: PropTypes.bool,
			placeholder: PropTypes.string,
			readOnly: PropTypes.bool,
			required: PropTypes.bool,
			title: PropTypes.string,
			labelProps: PropTypes.object,
			hint: PropTypes.shape({
				icon: PropTypes.string,
				className: PropTypes.string,
				overlayComponent: PropTypes.oneOfType([PropTypes.node, PropTypes.string]).isRequired,
				overlayPlacement: PropTypes.string,
			}),
			link: PropTypes.shape({
				label: PropTypes.string,
			}),
			type: PropTypes.string,
			schema: PropTypes.object,
		}),
		value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
		valueIsUpdating: PropTypes.bool,
	};
}

Text.defaultProps = {
	isValid: true,
	schema: {},
	value: '',
};
