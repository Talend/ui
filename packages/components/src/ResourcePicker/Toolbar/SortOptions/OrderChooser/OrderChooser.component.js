import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import Button from 'react-bootstrap/lib/Button';
import { translate } from 'react-i18next';
import Icon from '../../../../Icon';
import TooltipTrigger from '../../../../TooltipTrigger';
import OverlayTrigger from '../../../../OverlayTrigger';
import getPropsFrom from '../../../../utils/getPropsFrom';
import I18N_DOMAIN_COMPONENTS from '../../../../constants';
import getDefaultT from '../../../../translate';

import theme from './OrderChooser.scss';


function OrderChooser({ t, icon, asc, label, tooltipPlacement, onClick, ...rest }) {
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
						alt={t('CURRENT_ORDER', {
							defaultValue: 'current order: {{ order }}',
							order: asc ? 'asc' : 'desc',
						})}
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
	t: PropTypes.func,
	icon: PropTypes.string,
	asc: PropTypes.bool,
	label: PropTypes.string,
	onClick: PropTypes.func.isRequired,
	tooltipPlacement: OverlayTrigger.propTypes.placement,
};

OrderChooser.defaultProps = {
	t: getDefaultT(),
	tooltipPlacement: 'top',
};

export default translate(I18N_DOMAIN_COMPONENTS)(OrderChooser);
