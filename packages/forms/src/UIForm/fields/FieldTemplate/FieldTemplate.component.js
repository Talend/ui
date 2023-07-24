import PropTypes from 'prop-types';
import classNames from 'classnames';
import Message from '../../Message';
import theme from './FieldTemplate.module.scss';
import { ButtonIcon, Popover } from '@talend/design-system';

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
		hint: PropTypes.any,
	};
}

function FieldTemplate(props) {
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
				<Popover
					position={props.hint.overlayPlacement || 'auto'}
					data-test={props.hint['data-test']}
					isFixed={props.hint.overlayIsFixed}
					disclosure={
						<ButtonIcon
							data-test={props.hint['icon-data-test']}
							size="S"
							icon={props.hint.icon || 'talend-info-circle'}
						></ButtonIcon>
					}
				>
					{props.hint.overlayComponent}
				</Popover>
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
