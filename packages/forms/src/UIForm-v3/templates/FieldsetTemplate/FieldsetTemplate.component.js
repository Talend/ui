import PropTypes from 'prop-types';
import React from 'react';
import classnames from 'classnames';

import Message from '../Message';
import { generateDescriptionId, generateErrorId } from '../utils';

function FieldsetTemplate(props) {
	const { children, className, description, error, hideLegend, legend, ...restProps } = props;
	const groupsClassNames = classnames('form-group', className);

	const descriptionId = restProps.id && generateDescriptionId(restProps.id);
	const errorId = restProps.id && generateErrorId(restProps.id);
	const ariaDescribedBy = restProps.id && `${descriptionId} ${errorId}`;

	return (
		<fieldset {...restProps} className={groupsClassNames} aria-describedby={ariaDescribedBy}>
			<legend className={classnames({ 'sr-only': hideLegend })}>{legend}</legend>
			{restProps.id && (
				<Message
					description={description}
					descriptionId={descriptionId}
					error={error}
					errorId={errorId}
				/>
			)}
			{children}
		</fieldset>
	);
}

if (process.env.NODE_ENV !== 'production') {
	FieldsetTemplate.propTypes = {
		children: PropTypes.node,
		className: PropTypes.string,
		description: PropTypes.string,
		error: PropTypes.object,
		hideLegend: PropTypes.bool,
		id: PropTypes.string,
		label: PropTypes.string,
		legend: PropTypes.string,
	};
}

FieldsetTemplate.displayName = 'FieldsetTemplate';

export default FieldsetTemplate;
