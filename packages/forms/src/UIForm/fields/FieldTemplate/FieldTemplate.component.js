import PropTypes from 'prop-types';
import React from 'react';
import classNames from 'classnames';
import { useTranslation } from 'react-i18next';
import { Button } from 'react-bootstrap';
import OverlayTrigger from '@talend/react-components/lib/OverlayTrigger';
import Icon from '@talend/react-components/lib/Icon';
import Message from '../../Message';
import { I18N_DOMAIN_FORMS } from '../../../constants';
import theme from './FieldTemplate.scss';

function Label({ id, label, ...rest }) {
	return (
		<label htmlFor={id} className="control-label" {...rest}>
			{label}
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
	const { t } = useTranslation(I18N_DOMAIN_FORMS);
	const groupsClassNames = classNames('form-group', theme.template, props.className, {
		'has-error': !props.isValid,
		required: props.required,
		[theme.updating]: props.valueIsUpdating,
	});

	let title = <Label id={props.id} label={props.label} {...props.labelProps} />;

	if (props.hint) {
		title = (
			<div className={theme['field-template-title']}>
				{title}
				<OverlayTrigger
					overlayId={`${props.id}-hint-overlay`}
					overlayPlacement={props.hint.overlayPlacement || 'right'}
					overlayComponent={props.hint.overlayComponent}
				>
					<Button
						id={`${props.id}-hint`}
						bsStyle="link"
						className={props.hint.className}
						aria-label={t('FIELD_TEMPLATE_HINT_LABEL', {
							defaultValue: 'Display the input {{inputLabel}} hint',
							inputLabel: props.label,
						})}
						aria-haspopup
					>
						<Icon name={props.hint.icon || 'talend-info-circle'} />
					</Button>
				</OverlayTrigger>
			</div>
		);
	}
	const labelAfter = props.hint ? false : props.labelAfter;

	return (
		<div className={groupsClassNames} aria-busy={props.valueIsUpdating}>
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
