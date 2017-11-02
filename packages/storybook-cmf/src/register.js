import React from 'react';
import addons from '@kadira/storybook-addons';

export default function register() {
	addons.register('react-storybook-cmf', (api) => {
		const channel = addons.getChannel();
		addons.addPanel('react-storybook-cmf/panel', {
			title: 'CMF',
			render: () => <div>{channel} {api}</div>,
		});
	});
}
