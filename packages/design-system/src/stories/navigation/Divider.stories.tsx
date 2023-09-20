import { Divider, StackHorizontal, StackVertical } from '../../';

export default {
	title: 'Navigation/Divider',
	component: Divider,
};

export const Default = () => (
	<>
		Lorem ipsum
		<Divider />
		Lorem ipsum
	</>
);

export const Horizontal = () => (
	<StackHorizontal gap="S">
		Foo
		<Divider orientation="vertical" />
		Bar
	</StackHorizontal>
);

export const Vertical = () => (
	<StackVertical gap="S">
		Foo
		<Divider orientation="horizontal" />
		Bar
	</StackVertical>
);
