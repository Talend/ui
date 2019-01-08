import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { Icon, Button, TooltipTrigger } from '../../../';

import theme from './OrderChooser.scss';


function OrderChooser({ id, icon, label, tooltipPlacement }) {
	return (
		<div
			className={classNames('order-chooser', theme['order-chooser'])}
		>
			<TooltipTrigger label={label} tooltipPlacement={tooltipPlacement}>
				<Button
					id={id}
					aria-label={label}
					bsStyle=""
				>
					<Icon name={icon} />
					<Icon
						name={'talend-caret-down'}
						className={classNames('order-indicator', theme['order-indicator'])}
					/>
				</Button>
			</TooltipTrigger>
		</div>
	);
}

OrderChooser.propTypes = {
	icon: PropTypes.string,
};


export default OrderChooser;
