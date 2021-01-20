import React from 'react';
import { createPopper } from '@popperjs/core';

export function usePopper(triggerRef, tooltipRef, options) {
	React.useEffect(() => {
		function show() {
			// eslint-disable-next-line no-param-reassign
			tooltipRef.current.style.display = 'block';
		}

		function hide() {
			// eslint-disable-next-line no-param-reassign
			tooltipRef.current.style.display = 'none';
		}

		const showEvents = ['focus', 'click'];
		const hideEvents = ['blur'];
		let popper = null;
		if (triggerRef && tooltipRef && triggerRef.current && tooltipRef.current) {
			popper = createPopper(triggerRef.current, tooltipRef.current, options);
			hide();
			showEvents.forEach(event => {
				triggerRef.current.addEventListener(event, show);
			});

			hideEvents.forEach(event => {
				triggerRef.current.addEventListener(event, hide);
			});
		}
		return () => {
			if (popper) {
				popper.destroy();
				popper = null;
				if (triggerRef && triggerRef.current) {
					showEvents.forEach(event => {
						triggerRef.current.removeEventListener(event, show);
					});

					hideEvents.forEach(event => {
						// eslint-disable-next-line react-hooks/exhaustive-deps
						triggerRef.current.removeEventListener(event, hide);
					});
				}
			}
		};
	}, [triggerRef, tooltipRef, options]);
}
