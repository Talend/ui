import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import Button from 'react-bootstrap/lib/Button';
import Icon from '../../../../Icon';
import TooltipTrigger from '../../../../TooltipTrigger';
import OverlayTrigger from '../../../../OverlayTrigger';
import getPropsFrom from '../../../../utils/getPropsFrom';

import theme from './OrderChooser.scss';

function OrderChooser({ icon, asc, label, tooltipPlacement, onClick, ...rest }) {
	return (
		<div className={classNames('order-chooser', theme['order-chooser'])}>
			<TooltipTrigger label={label} tooltipPlacement={tooltipPlacement}>
				<Button
					{...getPropsFrom(Button, rest)}
					onClick={onClick}
					aria-label={label}
					className={classNames(theme['chooser-button'])}
					bsStyle=""
				>
					<Icon name={icon} />
					<Icon
						name={'talend-caret-down'}
						className={classNames('order-indicator', theme['order-indicator'], {
							[theme.asc]: asc,
						})}
					/>
				</Button>
			</TooltipTrigger>
		</div>
	);
}

OrderChooser.propTypes = {
	icon: PropTypes.string,
	asc: PropTypes.bool,
	label: PropTypes.string,
	onClick: PropTypes.func.isRequired,
	tooltipPlacement: OverlayTrigger.propTypes.placement,
};

OrderChooser.defaultProps = {
	tooltipPlacement: 'top',
};

export default OrderChooser;
