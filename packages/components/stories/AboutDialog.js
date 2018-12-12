import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { AboutDialog, IconsProvider } from '../src/index';

const props = {
	show: true,
	onToggle: action('onToggle'),
	version: 'Summer \'18',
	icon: 'talend-tdp-colored',
	services: ['API', 'Dataset', 'Preparation', 'Transformation'].map(name => ({
		version: '2.8.0-SNAPSHOT',
		build: '87d0dcd-12e0d6f',
		name,
	})),
};


storiesOf('AboutDialog', module)
	.addDecorator(story => (
		<div>
			<IconsProvider />
			<h1>AboutDialog</h1>
			{story()}
		</div>
	))
	.add('default', () => <AboutDialog {...props} />)
	.add('loading', () => <AboutDialog loading {...props} />)
	.add('expanded', () => <AboutDialog expanded {...props} />)
	.add('expanded & loading', () => <AboutDialog expanded loading {...props} />);
