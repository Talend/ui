import { Loading } from '../..';
import { StackVertical } from '../..';

export default {
	component: Loading,
	title: 'Feedback/Loading',
};

export const Default = () => (
	<StackVertical gap="S">
		<Loading size="XS" />
		<Loading size="S" />
		<Loading size="M" />
		<Loading size="L" />
		<Loading size="XL" />
		<Loading size="XXL" />
	</StackVertical>
);
