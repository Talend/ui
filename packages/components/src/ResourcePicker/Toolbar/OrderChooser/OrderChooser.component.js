import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { Icon, Button, TooltipTrigger } from '../../../';
import OverlayTrigger from '../../../OverlayTrigger';

import getPropsFrom from '../../../utils/getPropsFrom';

import theme from './OrderChooser.scss';


function OrderChooser({ icon, asc, label, tooltipPlacement, onClick, ...rest }) {
	return (
		<div
			className={classNames('order-chooser', theme['order-chooser'])}
		>
			<TooltipTrigger label={label} tooltipPlacement={tooltipPlacement}>
				<Button
					{...getPropsFrom(Button, rest)}
					onClick={onClick}
					aria-label={label}
					bsStyle=""
				>
					<Icon name={icon} />
					<Icon
						name={'talend-caret-down'}
						className={
							classNames('order-indicator', theme['order-indicator'], { [theme.asc]: asc })
						}
					/>
				</Button>
			</TooltipTrigger>
		</div>
	);
}

OrderChooser.propTypes = {
	icon: PropTypes.string,
	asc: PropTypes.boolean,
	label: PropTypes.string,
	onClick: PropTypes.func.isRequired,
	tooltipPlacement: OverlayTrigger.propTypes.placement,
};

OrderChooser.defaultProps = {
	tooltipPlacement: 'top',
};

export default OrderChooser;
