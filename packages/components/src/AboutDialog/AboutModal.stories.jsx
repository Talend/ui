import { action } from 'storybook/actions';
import AboutDialog from '.';

const defaultProps = {
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

const meta = {
	title: 'Components/Layout/Modals/AboutModal',
	component: AboutDialog,
	decorators: [
		Story => (
			<div>
				<h1>AboutDialog</h1>
				<Story />
			</div>
		),
	],
};

export default meta;

export const Default = {
	args: defaultProps,
};

export const WithoutTheVersion = {
	args: {
		...defaultProps,
		version: null,
	},
};

export const Loading = {
	args: {
		...defaultProps,
		loading: true,
	},
};

export const Expanded = {
	args: {
		...defaultProps,
		expanded: true,
	},
};

export const ExpandedWithLotOfServices = {
	args: {
		...defaultProps,
		expanded: true,
		services,
	},
};

export const WithCustomDefinition = {
	args: {
		...defaultProps,
		expanded: true,
		services,
		definition: [name, version],
	},
};

export const ExpandedLoading = {
	args: {
		...defaultProps,
		expanded: true,
		loading: true,
	},
};
