/* eslint-disable global-require */
/* eslint-disable import/no-dynamic-require */
import AppLoader from './AppLoader.component';
import APP_LOADER from './constant';

const AppSpecificLoader = ({ iconUrl }) => (
	<div>
		<style>{APP_LOADER.getLoaderStyle(`url(${iconUrl})`)}</style>
		<AppLoader />
	</div>
);

export default {
	title: 'Design Principles/Loading Feedback/AppLoader',
	component: AppSpecificLoader,
};

export const Default = {
	argTypes: {
		iconUrl: {
			name: 'iconUrl',
			type: { name: 'string', required: true },
			defaultValue: 'https://unpkg.com/@talend/icons@6.51.1/src/svg/products/logo-square.svg',
		},
	},
};
