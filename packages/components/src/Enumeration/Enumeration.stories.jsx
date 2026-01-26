/* eslint-disable no-console */
import Enumeration from './Enumeration.component';

const dataLists = {
	default: [
		{ name: 'id1', label: '1' },
		{ name: 'id2', label: '2' },
		{ name: 'id3', label: '3' },
	],
	small: [
		{ name: 'id1', label: 'Small 1' },
		{ name: 'id2', label: 'Small 2' },
	],
	large: Array.from({ length: 200 }, (_, i) => ({
		name: `id${i}`,
		label: `Item ${i}`,
	})),
	empty: [],
};

const meta = {
	title: 'Components/Form - Inline form/Enumeration',
	component: Enumeration,
	tags: ['autodocs'],
};

export default meta;

export const Default = {
	render: () => (
		<Enumeration
			id="enum-default"
			items={dataLists.default}
			onSubmit={items => console.log('onSubmit', items)}
			onCancel={() => console.log('onCancel')}
		/>
	),
};

export const WithItemActions = {
	render: () => (
		<Enumeration
			id="enum-with-actions"
			items={dataLists.default}
			onSubmit={items => console.log('onSubmit', items)}
			onCancel={() => console.log('onCancel')}
			onItemSwap={(items, index1, index2) => console.log('onItemSwap', items, index1, index2)}
			itemActions={[
				{ icon: 'talend-trash', label: 'Remove', onClick: () => console.log('remove') },
				{ icon: 'talend-pencil', label: 'Edit', onClick: () => console.log('edit') },
			]}
		/>
	),
};

export const WithHeader = {
	render: () => (
		<Enumeration
			id="enum-header"
			header="My custom header"
			items={dataLists.default}
			onSubmit={items => console.log('onSubmit', items)}
			onCancel={() => console.log('onCancel')}
		/>
	),
};

export const WithTitle = {
	render: () => (
		<Enumeration
			id="enum-title"
			items={dataLists.default}
			itemTitle="My item"
			onSubmit={items => console.log('onSubmit', items)}
			onCancel={() => console.log('onCancel')}
		/>
	),
};

export const Disabled = {
	render: () => (
		<Enumeration
			id="enum-disabled"
			items={dataLists.default}
			disabled
			onSubmit={items => console.log('onSubmit', items)}
			onCancel={() => console.log('onCancel')}
		/>
	),
};

export const SmallList = {
	render: () => (
		<Enumeration
			id="enum-small"
			items={dataLists.small}
			onSubmit={items => console.log('onSubmit', items)}
			onCancel={() => console.log('onCancel')}
		/>
	),
};

export const LargeList = {
	render: () => (
		<div style={{ height: '400px' }}>
			<Enumeration
				id="enum-large"
				items={dataLists.large}
				itemHeight={36}
				onSubmit={items => console.log('onSubmit', items)}
				onCancel={() => console.log('onCancel')}
			/>
		</div>
	),
};

export const EmptyList = {
	render: () => (
		<Enumeration
			id="enum-empty"
			items={dataLists.empty}
			onSubmit={items => console.log('onSubmit', items)}
			onCancel={() => console.log('onCancel')}
		/>
	),
};

export const WithCustomHeight = {
	render: () => (
		<div style={{ height: '200px' }}>
			<Enumeration
				id="enum-custom-height"
				items={dataLists.default}
				itemHeight={40}
				onSubmit={items => console.log('onSubmit', items)}
				onCancel={() => console.log('onCancel')}
			/>
		</div>
	),
};

export const Required = {
	render: () => (
		<Enumeration
			id="enum-required"
			items={dataLists.default}
			required
			onSubmit={items => console.log('onSubmit', items)}
			onCancel={() => console.log('onCancel')}
		/>
	),
};

export const WithPlaceholder = {
	render: () => (
		<Enumeration
			id="enum-placeholder"
			items={dataLists.empty}
			placeholder="Empty list"
			onSubmit={items => console.log('onSubmit', items)}
			onCancel={() => console.log('onCancel')}
		/>
	),
};

export const ReadOnly = {
	render: () => (
		<Enumeration
			id="enum-readonly"
			items={dataLists.default}
			readOnly
			onSubmit={items => console.log('onSubmit', items)}
			onCancel={() => console.log('onCancel')}
		/>
	),
};

export const WithError = {
	render: () => (
		<Enumeration
			id="enum-error"
			items={dataLists.default}
			hasError
			onSubmit={items => console.log('onSubmit', items)}
			onCancel={() => console.log('onCancel')}
		/>
	),
};
