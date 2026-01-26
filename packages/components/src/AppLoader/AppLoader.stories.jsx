import AppLoader from './AppLoader.component';
import APP_LOADER from './constant';

/* eslint-disable global-require */
/* eslint-disable import/no-dynamic-require */

const AppSpecificLoader = ({ iconUrl }) => (
	<div>
		<style>{APP_LOADER.getLoaderStyle(`url(${iconUrl})`)}</style>
		<AppLoader />
	</div>
);

const meta = {
	title: 'Components/Design Principles/Loading Feedback/AppLoader',
	component: AppSpecificLoader,
	tags: ['autodocs'],
};

export default meta;

export const Default = {
	args: {
		iconUrl: 'https://unpkg.com/@talend/icons@6.51.1/src/svg/products/logo-square.svg',
	},
};
