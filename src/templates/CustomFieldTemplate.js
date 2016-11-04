import React from 'react';

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
}) => {
	if (hidden) {
		return children;
	}
	return (
		<div className={classNames}>
			{displayLabel ? <label className="control-label" htmlFor={id}>{label}{required ? "*" : null}</label> : null}
			{displayLabel && description ? description : null}
			{children}
			{errors}
			{help}
		</div>
	);
};

CustomFieldTemplate.propTypes = {
	id: React.PropTypes.string,
	classNames: React.PropTypes.string,
	label: React.PropTypes.string,
	children: React.PropTypes.node.isRequired,
	errors: React.PropTypes.element,
	rawErrors: React.PropTypes.arrayOf(
		React.PropTypes.string
	),
	help: React.PropTypes.element,
	rawHelp: React.PropTypes.string,
	description: React.PropTypes.element,
	rawDescription: React.PropTypes.string,
	hidden: React.PropTypes.bool,
	required: React.PropTypes.bool,
	readonly: React.PropTypes.bool,
	displayLabel: React.PropTypes.bool,
	fields: React.PropTypes.object,
	formContext: React.PropTypes.object,
};

export default CustomFieldTemplate;
