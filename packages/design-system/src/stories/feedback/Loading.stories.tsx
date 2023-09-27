import tokens from '@talend/design-tokens';
import { Loading } from '../..';

export default {
	component: Loading,
	title: 'Feedback/Loading',
};

export const Default = () => (
	<div style={{ maxWidth: tokens.coralSizingMaximal }}>
		<Loading />
	</div>
);
