import React, { useState, useLayoutEffect, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { withTranslation } from 'react-i18next';

import TooltipTrigger from '../TooltipTrigger';
import Icon from '../Icon';
import IntercomService from './Intercom.service';
import getDefaultT from '../translate';
import I18N_DOMAIN_COMPONENTS from '../constants';

import theme from './Intercom.scss';

function Intercom({ id, className, config, t, tooltipPlacement }) {
	const [show, setShow] = useState(false);
	const ref = useRef(null);

	// init intercom messenger, attaching it to the custom button
	useEffect(() => {
		IntercomService.boot(`#${id}`, config);
		IntercomService.onShow(setShow.bind(null, true));
		IntercomService.onHide(() => {
			setShow(false);
			// a11y: on intercom dropdown close, focus on the trigger button
			ref.current.focus();
		});

		return IntercomService.shutdown;
	}, [id, config, setShow]);

	// place intercom messenger dropdown depending on the button
	useLayoutEffect(() => IntercomService.setPosition(ref.current), [ref.current]);

	const label = show
		? t('TC_INTERCOM_CLOSE', { defaultValue: 'Close chat with Talend Support' })
		: t('TC_INTERCOM_OPEN', { defaultValue: 'Chat with Talend Support' });

	return (
		<TooltipTrigger label={label} tooltipPlacement={tooltipPlacement}>
			<button
				data-feature={show ? 'ipc.close' : 'ipc.open'}
				ref={ref}
				id={id}
				className={classnames('btn', 'btn-link', 'tc-intercom', theme['tc-intercom'], className, {
					[theme.open]: show,
				})}
			>
				<Icon name="talend-bubbles" />
			</button>
		</TooltipTrigger>
	);
}

Intercom.defaultProps = {
	t: getDefaultT(),
	tooltipPlacement: 'bottom',
};

if (process.env.NODE_ENV !== 'production') {
	Intercom.propTypes = {
		id: PropTypes.string.isRequired,
		className: PropTypes.string,
		config: PropTypes.shape({
			app_id: PropTypes.string.isRequired,
			name: PropTypes.string,
			email: PropTypes.string.isRequired,
			company: PropTypes.shape({
				id: PropTypes.string.isRequired,
				name: PropTypes.string,
			}),
		}).isRequired,
		t: PropTypes.func,
		tooltipPlacement: PropTypes.string,
	};
}

export default withTranslation(I18N_DOMAIN_COMPONENTS)(Intercom);
