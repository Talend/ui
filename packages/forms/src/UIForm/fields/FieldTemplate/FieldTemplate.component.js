import PropTypes from 'prop-types';
import React from 'react';
import classNames from 'classnames';
import Action from '@talend/react-components/lib/Actions/Action';
import Message from '../../Message';
import theme from './FieldTemplate.scss';

function Label(props) {
	return (
		<label htmlFor={props.id} className="control-label">
			{props.label}
		</label>
	);
}

if (process.env.NODE_ENV !== 'production') {
	Label.propTypes = {
		id: PropTypes.string,
		label: PropTypes.string,
	};
}

function FieldTemplate(props) {
	const groupsClassNames = classNames('form-group', theme.template, props.className, {
		'has-error': !props.isValid,
		required: props.required,
		[theme.updating]: props.valueIsUpdating,
	});

	const title = (
		<div className={theme['field-template-title']}>
			<Label id={props.id} label={props.label} />
			{props.hint && (
				<Action
					id={`${props.id}-hint`}
					className={props.hint.className}
					icon={props.hint.icon || 'talend-info-circle'}
					link
					overlayComponent={props.hint.overlayComponent}
					overlayId={`${props.id}-hint-overlay`}
					overlayPlacement={props.hint.overlayPlacement || 'right'}
				/>
			)}
		</div>
	);

	return (
		<div className={groupsClassNames} aria-busy={props.valueIsUpdating}>
			{props.label && !props.labelAfter && title}
			{props.children}
			{props.label && props.labelAfter && title}
			<Message
				description={props.description}
				descriptionId={props.descriptionId}
				errorId={props.errorId}
				errorMessage={props.errorMessage}
				isValid={props.isValid}
			/>
		</div>
	);
}

if (process.env.NODE_ENV !== 'production') {
	FieldTemplate.propTypes = {
		children: PropTypes.node,
		hint: PropTypes.shape({
			icon: PropTypes.string,
			className: PropTypes.string,
			overlayComponent: PropTypes.oneOfType([PropTypes.node, PropTypes.string]).isRequired,
			overlayPlacement: PropTypes.string,
		}),
		className: PropTypes.string,
		description: PropTypes.string,
		descriptionId: PropTypes.string.isRequired,
		errorId: PropTypes.string.isRequired,
		errorMessage: PropTypes.string,
		id: PropTypes.string,
		isValid: PropTypes.bool,
		label: PropTypes.string,
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
