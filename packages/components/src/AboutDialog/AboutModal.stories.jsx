import { fn } from 'storybook/test';
import AboutDialog from '.';

const props = {
	show: true,
	onToggle: () => fn('onToggle'),
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

const meta = {
	title: 'Components/Layout/Modals/AboutModal',
	component: AboutDialog,
	tags: ['autodocs'],
	parameters: {
		layout: 'fullscreen',
	},
};

export default meta;

export const Default = {
	args: props,
	render: args => <AboutDialog {...args} />,
};

export const WithoutTheVersion = {
	args: {
		...props,
		version: null,
	},
	render: args => <AboutDialog {...args} />,
};

export const Loading = {
	args: {
		...props,
		loading: true,
	},
	render: args => <AboutDialog {...args} />,
};

export const Expanded = {
	args: {
		...props,
		expanded: true,
	},
	render: args => <AboutDialog {...args} />,
};

export const ExpandedWithLotOfServices = {
	args: {
		...props,
		expanded: true,
		services,
	},
	render: args => <AboutDialog {...args} />,
};

export const WithCustomDefinition = {
	args: {
		...props,
		expanded: true,
		services,
		definition: [name, version],
	},
	render: args => <AboutDialog {...args} />,
};

export const ExpandedLoading = {
	args: {
		...props,
		expanded: true,
		loading: true,
	},
	render: args => <AboutDialog {...args} />,
};
