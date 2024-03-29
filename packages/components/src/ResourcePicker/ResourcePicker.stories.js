import { action } from '@storybook/addon-actions';

import ResourcePicker from '.';

const collection = [
	{
		id: 0,
		name: 'Title with few actions',
		modified: '2016-09-22',
		icon: 'talend-file-xls-o',
		author: 'First Author',
		flags: ['CERTIFIED', 'FAVORITE'],
	},
	{
		id: 1,
		name: 'Title with lot of actions',
		modified: '2016-09-22',
		icon: 'talend-file-xls-o',
		author: 'Second Author',
	},
	{
		id: 2,
		name: 'Title with persistant actions',
		modified: '2016-09-22',
		author: 'Jean-Pierre DUPONT',
		icon: 'talend-file-xls-o',
		flags: ['FAVORITE'],
	},
	{
		id: 3,
		name: 'Title with icon',
		modified: '2016-09-22',
		author: 'Third Author',
		icon: 'talend-file-xls-o',
		flags: ['CERTIFIED'],
	},
	{
		id: 4,
		name: 'Title in input mode',
		modified: '2016-09-22',
		author: 'Jean-Pierre DUPONT',
		icon: 'talend-file-xls-o',
	},
	{
		id: 5,
		name: 'Title with long long long long long long long long long long long text',
		modified: '2016-09-22',
		author: 'Jean-Pierre DUPONT with super super super long text',
		icon: 'talend-file-xls-o',
		flags: ['CERTIFIED', 'FAVORITE'],
	},
	{
		id: 5,
		name: 'Without author',
		icon: 'talend-file-xls-o',
		flags: ['CERTIFIED', 'FAVORITE'],
	},
];

const simpleCollection = [
	{
		icon: 'talend-file-xls-o',
		id: 0,
		name: 'Title with few actions',
		subtitle:
			'Lorem ipsum dolor sit amet, consectetur adipiscing elit. In tempor felis ultricies felis molestie placerat quis sit amet felis.',
	},
	{
		icon: 'talend-file-xls-o',
		id: 1,
		name: 'Title with lot of actions',
		subtitle:
			'Duis eros erat, ultricies sit amet tincidunt at, placerat quis ipsum. Cras nisi felis, condimentum sodales odio aliquet, accumsan molestie velit.',
	},
	{
		icon: 'talend-file-xls-o',
		id: 2,
		name: 'Title with persistant actions',
		subtitle:
			'Duis eros erat, ultricies sit amet tincidunt at, placerat quis ipsum. Cras nisi felis, condimentum sodales odio aliquet, accumsan molestie velit.',
	},
	{
		icon: 'talend-file-xls-o',
		id: 3,
		name: 'Title with icon',
		subtitle:
			'Curabitur ac nulla ut augue vulputate aliquet vitae at est. Curabitur massa lacus, sagittis eu cursus vel, consectetur ultricies nibh.',
	},
	{
		icon: 'talend-file-xls-o',
		id: 4,
		name: 'Title in input mode',
		subtitle:
			'Curabitur ac porttitor nunc. Quisque molestie sollicitudin nisi sed tincidunt. Nam facilisis enim nec urna pretium, vel porttitor nisl venenatis.',
	},
	{
		icon: 'talend-file-xls-o',
		id: 5,
		subtitle:
			'Cras enim ligula, ornare at lorem sed, hendrerit tempor magna. Integer ac sapien sapien. Nam scelerisque tellus at ligula pharetra vulputate.',
	},
	{
		icon: 'talend-file-xls-o',
		id: 6,
		name: 'Without author',
		subtitle: 'Vestibulum felis nulla, commodo sed sem ac, maximus sollicitudin libero.',
	},
];

const name = {
	onChange: action('Name filter changed'),
	label: 'Toolbar name label',
};

const sort = {
	onChange: action('Sort option changed'),
	orders: {
		[ResourcePicker.TOOLBAR_OPTIONS.SORT_OPTIONS.DATE]: ResourcePicker.TOOLBAR_OPTIONS.ORDERS.ASC,
		[ResourcePicker.TOOLBAR_OPTIONS.SORT_OPTIONS.NAME]: ResourcePicker.TOOLBAR_OPTIONS.ORDERS.DESC,
	},
};
const state = {
	certified: true,
	onChange: action('State filter changed'),
};

const props = {
	collection,
	toolbar: { name, sort, state },
	onRowClick: action('Row clicked'),
};

export default {
	title: 'Components/Form - Controls/ResourcePicker',
};

export const Default = () => (
	<div>
		<p>By default :</p>
		<ResourcePicker id="default" {...props} />
	</div>
);

export const GenericSubtitle = () => (
	<div>
		<p>By default :</p>
		<div style={{ width: '25rem', height: '6.25rem' }}>
			<ResourcePicker
				id="default"
				{...props}
				collection={simpleCollection}
				toolbar={{
					name,
					sort: {
						onChange: action('Sort option changed'),
						types: [ResourcePicker.TOOLBAR_OPTIONS.SORT_OPTIONS.NAME],
						orders: {
							[ResourcePicker.TOOLBAR_OPTIONS.SORT_OPTIONS.NAME]:
								ResourcePicker.TOOLBAR_OPTIONS.ORDERS.DESC,
						},
					},
					state: { types: [] },
				}}
			/>
		</div>
	</div>
);

export const WithSelectedResources = () => (
	<div>
		<p>By default :</p>
		<ResourcePicker id="default" {...props} isSelected={() => true} />
	</div>
);

export const WithoutToolbar = () => (
	<div>
		<p>By default :</p>
		<ResourcePicker id="default" collection={collection} />
	</div>
);

export const WithoutSortOptions = () => (
	<div>
		<p>By default :</p>
		<ResourcePicker id="default" collection={collection} toolbar={{ name, state }} />
	</div>
);

export const WithPartialSortOptions = () => (
	<div>
		<p>By default :</p>
		<ResourcePicker
			id="default"
			collection={collection}
			toolbar={{
				name,
				state,
				sort: {
					...sort,
					types: [ResourcePicker.TOOLBAR_OPTIONS.SORT_OPTIONS.DATE],
				},
			}}
		/>
	</div>
);

export const WithoutStateFilter = () => (
	<div>
		<p>By default :</p>
		<ResourcePicker id="default" collection={collection} toolbar={{ name, sort }} />
	</div>
);

export const WithPartialStateOptions = () => (
	<div>
		<p>By default :</p>
		<ResourcePicker
			id="default"
			collection={collection}
			toolbar={{
				name,
				sort,
				state: {
					...state,
					types: [ResourcePicker.TOOLBAR_OPTIONS.STATE_FILTERS.CERTIFIED],
				},
			}}
		/>
	</div>
);
