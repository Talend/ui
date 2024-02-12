import classNames from 'classnames';
import PropTypes from 'prop-types';

import { Form, StackVertical } from '@talend/design-system';

import Message from '../../Message';
import { getLabelProps } from '../../utils/labels';

function FieldTemplate(props) {
	const groupsClassNames = classNames(props.className, {
		'has-error': !props.isValid,
	});

	const title = (
		<Form.Label
			htmlFor={props.id}
			{...getLabelProps(props.label, props.labelProps, props.hint)}
			required={props.required}
		/>
	);
	const labelAfter = props.hint ? false : props.labelAfter;

	return (
		<div className={groupsClassNames} aria-busy={props.valueIsUpdating}>
			<StackVertical gap="XXS" align="stretch" justify="start" height="100%" noShrink>
				{props.label && !labelAfter && title}
				{props.children}
				{props.label && labelAfter && title}
				<Message
					description={props.description}
					descriptionId={props.descriptionId}
					errorId={props.errorId}
					errorMessage={props.errorMessage}
					isValid={props.isValid}
				/>
			</StackVertical>
		</div>
	);
}

if (process.env.NODE_ENV !== 'production') {
	FieldTemplate.propTypes = {
		children: PropTypes.node,
		hint: PropTypes.shape({
			icon: PropTypes.string,
			overlayComponent: PropTypes.oneOfType([PropTypes.node, PropTypes.string]).isRequired,
			overlayPlacement: PropTypes.string,
			overlayIsFixed: PropTypes.bool,
			'data-test': PropTypes.string,
			'icon-data-test': PropTypes.string,
		}),
		className: PropTypes.string,
		description: PropTypes.string,
		descriptionId: PropTypes.string.isRequired,
		errorId: PropTypes.string.isRequired,
		errorMessage: PropTypes.string,
		id: PropTypes.string,
		isValid: PropTypes.bool,
		label: PropTypes.string,
		labelProps: PropTypes.object,
		labelAfter: PropTypes.bool,
		required: PropTypes.bool,
		valueIsUpdating: PropTypes.bool,
	};
}

FieldTemplate.defaultProps = {
	isValid: true,
};
FieldTemplate.displayName = 'FieldTemplate';

export default FieldTemplate;
