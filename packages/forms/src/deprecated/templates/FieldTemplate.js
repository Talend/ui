import PropTypes from 'prop-types';
import React from 'react';
import Label from './LabelTemplate';

/**
 * Custom field template
 * @param props
 * @returns {*}
 * @constructor
 */
function CustomFieldTemplate(props) {
	const { hidden, children } = props;
	if (hidden) {
		return children;
	}

	const {
		id,
		classNames,
		label,
		errors,
		help,
		description,
		required,
		displayLabel,
		schema,
		uiSchema,
	} = props;
	const uiWidget = uiSchema && uiSchema['ui:widget'];
	const isToggle = uiWidget === 'toggle';
	const shouldDisplayLabel = displayLabel && !['listview'].includes(uiWidget);
	const hasLabelBefore = [
		'checkboxes',
		'checkbox',
		'radio',
		'code',
		'range',
		'multiSelectTag',
	].includes(uiWidget);

	if (!Object.prototype.hasOwnProperty.call(schema, 'title')) {
		schema.title = label;
	}

	function renderLabel(classPrefix) {
		if (!isToggle && shouldDisplayLabel) {
			return (
				<Label
					label={label}
					required={required || schema.required}
					id={id}
					className={`${classPrefix}-label`}
				/>
			);
		}
		return null;
	}

	return (
		<div className={classNames}>
			{hasLabelBefore && renderLabel('form')}
			{children}
			{!hasLabelBefore && renderLabel('control')}
			{shouldDisplayLabel && description ? description : null}
			{errors}
			{help}
		</div>
	);
}

if (process.env.NODE_ENV !== 'production') {
	CustomFieldTemplate.propTypes = {
		id: PropTypes.string,
		classNames: PropTypes.string,
		label: PropTypes.string,
		children: PropTypes.node.isRequired,
		errors: PropTypes.element,
		help: PropTypes.element,
		description: PropTypes.element,
		hidden: PropTypes.bool,
		required: PropTypes.bool,
		displayLabel: PropTypes.bool,
		schema: PropTypes.object,
		uiSchema: PropTypes.object,
	};
}

CustomFieldTemplate.defaultProps = {
	hidden: false,
	readonly: false,
	required: false,
	displayLabel: true,
};

export default CustomFieldTemplate;
