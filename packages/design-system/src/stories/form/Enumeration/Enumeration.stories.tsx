import { Enumeration as EnumerationComponent } from '../../../components/Enumeration';

export default {
	component: EnumerationComponent,
	title: 'Form/Enumeration',
};

const Enumeration = (args: any) => (
	<div style={{ height: '100vh', display: 'flex', flexDirection: 'column' }}>
		<EnumerationComponent {...args} />
	</div>
);

export const Default = () => (
	<Enumeration
		title="This is a title"
		items={[
			{ id: 'item1', label: 'Item 1' },
			{ id: 'item2', label: 'Item 2' },
			{ id: 'item3', label: 'Item 3' },
		]}
	/>
);

export const Empty = () => <Enumeration title="This is a title" items={[]} />;
