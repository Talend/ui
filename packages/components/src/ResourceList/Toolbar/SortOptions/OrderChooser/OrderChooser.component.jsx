import classNames from 'classnames';
import PropTypes from 'prop-types';

import { Action } from '../../../../Actions';
import Icon from '../../../../Icon';
import OverlayTrigger from '../../../../OverlayTrigger';
import getPropsFrom from '../../../../utils/getPropsFrom';

import theme from './OrderChooser.module.scss';

function OrderChooser({ icon, asc, label, tooltipPlacement, onClick, ...rest }) {
	return (
		<Action
			{...getPropsFrom(Action, rest)}
			label={label}
			onClick={onClick}
			className={classNames(
				'tc-resource-picker-order-chooser',
				theme['tc-resource-picker-order-chooser'],
			)}
			hideLabel
			bsStyle="link"
		>
			<Icon name={icon} />
			<Icon
				name="talend-caret-down"
				className={classNames(
					'tc-resource-picker-order-indicator',
					theme['tc-resource-picker-order-indicator'],
					{
						[theme.asc]: asc,
					},
				)}
			/>
		</Action>
	);
}

OrderChooser.propTypes = {
	t: PropTypes.func,
	icon: PropTypes.string,
	asc: PropTypes.bool,
	label: PropTypes.string,
	onClick: PropTypes.func.isRequired,
	tooltipPlacement: OverlayTrigger.propTypes.overlayPlacement,
};

OrderChooser.defaultProps = {
	tooltipPlacement: 'top',
};

export default OrderChooser;
