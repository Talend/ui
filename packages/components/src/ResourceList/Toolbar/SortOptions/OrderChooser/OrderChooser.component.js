import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import Button from 'react-bootstrap/lib/Button';
import Icon from '../../../../Icon';
import TooltipTrigger from '../../../../TooltipTrigger';
import OverlayTrigger from '../../../../OverlayTrigger';
import getPropsFrom from '../../../../utils/getPropsFrom';

import theme from './OrderChooser.scss';

function OrderChooser({ icon, label, tooltipPlacement, onClick, ...rest }) {
	return (
		<TooltipTrigger label={label} tooltipPlacement={tooltipPlacement}>
			<Button
				{...getPropsFrom(Button, rest)}
				aria-label={label}
				onClick={onClick}
				className={classNames(
					'tc-resource-picker-order-chooser',
					theme['tc-resource-picker-order-chooser'],
				)}
				bsStyle="link"
			>
				<Icon name={icon} />
			</Button>
		</TooltipTrigger>
	);
}

OrderChooser.propTypes = {
	t: PropTypes.func,
	icon: PropTypes.string,
	label: PropTypes.string,
	onClick: PropTypes.func.isRequired,
	tooltipPlacement: OverlayTrigger.propTypes.overlayPlacement,
};

OrderChooser.defaultProps = {
	tooltipPlacement: 'top',
};

export default OrderChooser;
