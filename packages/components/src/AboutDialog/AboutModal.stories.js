import React from 'react';
import { action } from '@storybook/addon-actions';
import AboutDialog from '.';

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

export default {
	title: 'Layout/Modals/AboutModal',

	decorators: [
		story => (
			<div>
				<h1>AboutDialog</h1>
				{story()}
			</div>
		),
	],
};

export const Default = () => <AboutDialog {...props} />;

export const WithoutTheVersion = () => <AboutDialog {...props} version={null} />;

export const Loading = () => <AboutDialog loading {...props} />;

export const Expanded = () => <AboutDialog expanded {...props} />;

export const ExpandedWithLotOfServices = () => (
	<AboutDialog expanded {...props} services={services} />
);

export const WithCustomDefinition = () => (
	<AboutDialog expanded {...props} services={services} definition={[name, version]} />
);

export const ExpandedLoading = () => <AboutDialog expanded loading {...props} />;
