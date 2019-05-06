import React, { useState, useLayoutEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import Icon from '../Icon';
// import { ActionButton } from '../Actions';
import IntercomService from './service';
import getDefaultT from '../translate';

import theme from './Intercom.scss';

export default function Intercom({ id, className, config, t }) {
	const [show, setShow] = useState(false);
	const ref = useRef(null);
	useLayoutEffect(
		() => {
			let intercomContainer;
			let customStyle = document.createElement('style');
			const callback = () => {
				let time = 0;
				const interval = setInterval(() => {
					time += 1;
					intercomContainer = document.querySelector('#intercom-container');
					if (intercomContainer) {
						const { bottom, left, right } = ref.current.getBoundingClientRect();
						const x = (left + right) / 2;
						const y = bottom;
						customStyle = document.createElement('style');
						customStyle.appendChild(
							document.createTextNode(`
							.intercom-namespace .intercom-app div.intercom-messenger-frame {
								top: ${y}px;
								left: calc(${x}px - 376px / 2);
								margin-top: 2rem;
							}
						`),
						);
						intercomContainer.appendChild(customStyle);
					}

					if (time === 10 || intercomContainer) {
						clearInterval(interval);
					}
				}, 1000);
			};

			IntercomService.boot(`#${id}`, { vertical_padding: 70, ...config }, callback);
			IntercomService.onShow(setShow.bind(null, true));
			IntercomService.onHide(setShow.bind(null, false));

			return () => {
				IntercomService.shutdown();
				if (customStyle) {
					intercomContainer.removeChild(customStyle);
				}
			};
		},
		[config, setShow],
	);

	const label = show
		? t('TC_INTERCOM_CLOSE', { defaultValue: 'Close support messenger.' })
		: t('TC_INTERCOM_OPEN', { defaultValue: 'Open support messenger.' });

	const icon = show ? 'talend-cross' : 'talend-bubbles';

	return (
		/*
		<ActionButton
			buttonRef={ref}
			id={id}
			className={className}
			label={label}
			icon={icon}
			tooltipPlacement="bottom"
			hideLabel
			link
		/>
		*/
		<button
			ref={ref}
			id={id}
			title={label}
			className={classnames('btn', 'btn-link', 'tc-intercom', theme['tc-intercom'], className, {
				[theme['open']]: show,
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
