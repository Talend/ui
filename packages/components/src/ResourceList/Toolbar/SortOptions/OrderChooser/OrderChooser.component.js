import PropTypes from 'prop-types';
import classNames from 'classnames';
import { Button } from '@talend/react-bootstrap';
import OverlayTrigger from '../../../../OverlayTrigger';
import getPropsFrom from '../../../../utils/getPropsFrom';

import theme from './OrderChooser.module.scss';
import { Icon, Tooltip } from '@talend/design-system';

function OrderChooser({ icon, asc, label, tooltipPlacement, onClick, ...rest }) {
	return (
		<Tooltip title={label}>
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
			</Button>
		</Tooltip>
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
