import { StackHorizontal, Icon } from '../../';

export default {
	title: 'Icons/Icon',
};

export const Usage = () => (
	<StackHorizontal gap="XS">
		<Icon name="talend-cross" style={{ width: '1.2rem', height: '1.2rem' }} />
		<Icon name="talend-cross" />
		<Icon name="talend-cross" style={{ width: '2.4rem', height: '2.4rem' }} />
	</StackHorizontal>
);
