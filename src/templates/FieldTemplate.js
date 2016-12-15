import React, { PropTypes } from 'react';
import Label from './LabelTemplate';

/**
 * Custom field template
 * @param props
 * @returns {*}
 * @constructor
 */
const CustomFieldTemplate = ({
	id,
	classNames,
	label,
	children,
	errors,
	help,
	description,
	hidden,
	required,
	displayLabel,
	...rest
}) => {
	if (hidden) {
		return children;
	}
	const uiWidget = rest.uiSchema && rest.uiSchema['ui:widget'];
	const hasLabelBefore =
		uiWidget === 'checkboxes' ||
		uiWidget === 'checkbox' ||
		uiWidget === 'radio' ||
		uiWidget === 'range';
	const isToggle =
		uiWidget === 'toggle';
	return (
		<div className={classNames}>
			{hasLabelBefore && !isToggle && displayLabel &&
			<Label className="form-label" label={label} required={required} id={id}/>}
			{children}
			{!hasLabelBefore && !isToggle && displayLabel &&
			<Label label={label} required={required} id={id}/>}
			{displayLabel && description ? description : null}
			{errors}
			{help}
		</div>
	);
};

CustomFieldTemplate.propTypes = {
	id: PropTypes.string,
	classNames: PropTypes.string,
	label: PropTypes.string,
	children: PropTypes.node.isRequired,
	errors: PropTypes.element,
	rawErrors: PropTypes.arrayOf(PropTypes.string),
	help: PropTypes.element,
	rawHelp: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
	description: PropTypes.element,
	rawDescription: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
	hidden: PropTypes.bool,
	required: PropTypes.bool,
	readonly: PropTypes.bool,
	displayLabel: PropTypes.bool,
	fields: PropTypes.object,
	formContext: PropTypes.object,
};

CustomFieldTemplate.defaultProps = {
	hidden: false,
	readonly: false,
	required: false,
	displayLabel: true,
};

export default CustomFieldTemplate;
