import React, { useState, useLayoutEffect, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { translate } from 'react-i18next';

import TooltipTrigger from '../TooltipTrigger';
import Icon from '../Icon';
import IntercomService from './Intercom.service';
import getDefaultT from '../translate';
import I18N_DOMAIN_COMPONENTS from '../constants';

import theme from './Intercom.scss';

function Intercom({ id, className, config, t }) {
	const [show, setShow] = useState(false);
	const ref = useRef(null);

	// init intercom messenger, attaching it to the custom button
	useEffect(
		() => {
			IntercomService.boot(`#${id}`, config);
			IntercomService.onShow(setShow.bind(null, true));
			IntercomService.onHide(setShow.bind(null, false));

			return IntercomService.shutdown;
		},
		[config, setShow],
	);

	// a11y: on intercom dropdown close, focus on the trigger button
	useEffect(
		() => {
			if (!show) {
				ref.current.focus();
			}
		},
		[show],
	);

	// place intercom messenger dropdown depending on the button
	useLayoutEffect(() => IntercomService.setPosition(ref.current), [ref.current]);

	const label = show
		? t('TC_INTERCOM_CLOSE', { defaultValue: 'Close support messenger.' })
		: t('TC_INTERCOM_OPEN', { defaultValue: 'Open support messenger.' });

	const icon = show ? 'talend-cross' : 'talend-bubbles';
	return (
		<TooltipTrigger label={label} tooltipPlacement="bottom">
			{tooltipProps => (
				<button
					{...tooltipProps}
					ref={ref}
					key="only"
					id={id}
					className={classnames('btn', 'btn-link', 'tc-intercom', theme['tc-intercom'], className, {
						[theme.open]: show,
					})}
				>
					<Icon name={icon} />
				</button>
			)}
		</TooltipTrigger>
	);
}

Intercom.defaultProps = {
	t: getDefaultT(),
};

Intercom.propTypes = {
	id: PropTypes.string.isRequired,
	className: PropTypes.string,
	config: PropTypes.shape({
		app_id: PropTypes.string.isRequired,
		name: PropTypes.string,
		email: PropTypes.string,
		company: PropTypes.shape({
			id: PropTypes.string.isRequired,
			name: PropTypes.string,
		}),
	}).isRequired,
	t: PropTypes.func,
};

export default translate(I18N_DOMAIN_COMPONENTS)(Intercom);
