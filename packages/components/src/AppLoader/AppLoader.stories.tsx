import type { Meta, StoryObj } from '@storybook/react';
import AppLoader from './AppLoader.component';
import APP_LOADER from './constant';

/* eslint-disable global-require */
/* eslint-disable import/no-dynamic-require */

const AppSpecificLoader = ({ iconUrl }: { iconUrl: string }) => (
	<div>
		<style>{APP_LOADER.getLoaderStyle(`url(${iconUrl})`)}</style>
		<AppLoader />
	</div>
);

type Story = StoryObj<typeof AppSpecificLoader>;

const meta: Meta<typeof AppSpecificLoader> = {
	title: 'Components/Design Principles/Loading Feedback/AppLoader',
	component: AppSpecificLoader,
	tags: ['autodocs'],
};

export default meta;

export const Default: Story = {
	args: {
		iconUrl: 'https://unpkg.com/@talend/icons@6.51.1/src/svg/products/logo-square.svg',
	},
};
