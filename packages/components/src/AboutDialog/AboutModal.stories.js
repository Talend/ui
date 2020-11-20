import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import AboutDialog from '.';
import IconsProvider from '../IconsProvider';

const props = {
	show: true,
	onToggle: action('onToggle'),
	version: "Summer '18",
	icon: 'talend-tdp-colored',
	services: ['API', 'Dataset', 'Preparation', 'Transformation'].map(name => ({
		version: '2.8.0-SNAPSHOT',
		build: '87d0dcd-12e0d6f',
		name,
	})),
};

const services = [
	'API',
	'Dataset',
	'Preparation',
	'Transformation',
	'service2',
	'service3',
	'service4',
	'service5',
	'service6',
	'service7',
	'service8',
	'service9',
	'service12',
	'service13',
	'service14',
	'service15',
	'service16',
	'service17',
	'service18',
	'service19',
].map(name => ({
	version: '2.8.0-SNAPSHOT',
	build: '87d0dcd-12e0d6f',
	name,
}));

const { name, version } = AboutDialog.Table.getColumnHeaders();

storiesOf('Layout/Modals/AboutModal', module)
	.addDecorator(story => (
		<div>
			<h1>AboutDialog</h1>
			{story()}
		</div>
	))
	.add('default', () => <AboutDialog {...props} />)
	.add('without the version', () => <AboutDialog {...props} version={null} />)
	.add('loading', () => <AboutDialog loading {...props} />)
	.add('expanded', () => <AboutDialog expanded {...props} />)
	.add('expanded with lot of services', () => (
		<AboutDialog expanded {...props} services={services} />
	))
	.add('with custom definition', () => (
		<AboutDialog expanded {...props} services={services} definition={[name, version]} />
	))
	.add('expanded & loading', () => <AboutDialog expanded loading {...props} />);
