import React, { useState, useLayoutEffect, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import Icon from '../Icon';
import IntercomService from './service';
import getDefaultT from '../translate';

import theme from './Intercom.scss';

export default function Intercom({ id, className, config, t }) {
	const [show, setShow] = useState(false);
	const ref = useRef(null);
	useEffect(
		() => {
			IntercomService.boot(`#${id}`, { vertical_padding: 70, ...config });
			IntercomService.onShow(setShow.bind(null, true));
			IntercomService.onHide(setShow.bind(null, false));

			return IntercomService.shutdown;
		},
		[config, setShow],
	);

	useLayoutEffect(() => IntercomService.setPosition(ref.current), [ref.current]);

	const label = show
		? t('TC_INTERCOM_CLOSE', { defaultValue: 'Close support messenger.' })
		: t('TC_INTERCOM_OPEN', { defaultValue: 'Open support messenger.' });

	const icon = show ? 'talend-cross' : 'talend-bubbles';

	return (
		<button
			ref={ref}
			id={id}
			title={label}
			className={classnames('btn', 'btn-link', 'tc-intercom', theme['tc-intercom'], className, {
				[theme.open]: show,
			})}
		>
			<Icon name={icon} />
		</button>
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
