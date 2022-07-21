/* eslint-disable react/no-multi-comp */
import React from 'react';
import { action } from '@storybook/addon-actions';
import assetsApi from '@talend/assets-api';
import Layout from '../Layout';
import SidePanel from './SidePanel.component';
import appStyle from '../../stories/config/themes.scss';

const actions = [
	{
		label: 'Preparations',
		icon: 'talend-dataprep',
		onClick: action('Preparations clicked'),
		active: true,
	},
	{
		label: 'Datasets',
		iconName: 'dataset',
		onClick: action('Datasets clicked'),
	},
	{
		label: 'Favorites',
		icon: 'talend-star',
		beta: true,
		onClick: action('Favorites clicked'),
	},
];

const actionsLinks = [
	{
		label: 'Preparations',
		icon: 'talend-dataprep',
		href: '/preparations',
		active: true,
		beta: true,
	},
	{
		label: 'Datasets',
		icon: 'talend-download',
		href: '/datasets',
		beta: true,
	},
	{
		label: 'Favorites',
		icon: 'talend-star',
		href: '/favorites',
	},
];

const items = [
	{
		key: 'preparations',
		label: 'Preparations',
		beta: true,
		icon: 'talend-dataprep',
	},
	{
		key: 'datasets',
		label: 'Datasets',
		icon: 'talend-download',
	},
	{
		key: 'favorites',
		label: 'Favorites',
		icon: 'talend-star',
	},
];

const other = [
	{
		key: 'users',
		label: 'Users',
		icon: 'talend-user-circle',
	},
	{
		key: 'groups',
		label: 'Groups',
		icon: 'talend-group-circle',
		beta: true,
	},
	{
		key: 'roles',
		label: 'Roles',
		icon: 'talend-roles',
	},
	{
		key: 'licenses',
		label: 'Licenses',
		icon: 'talend-license',
	},
	{
		key: 'projects',
		label: 'Projects',
		icon: 'talend-projects',
	},
	{
		key: 'activity',
		label: 'Activity',
		icon: 'talend-activity',
	},
];

export default {
	title: 'Navigation/SidePanel',
};

export const Uncontrolled = () => (
	<SidePanel
		id="context"
		actions={actions}
		onSelect={action('onItemSelect')}
		tooltipPlacement="top"
	/>
);

export const Controlled = () => (
	<SidePanel
		id="context"
		actions={actions}
		onSelect={action('onItemSelect')}
		onToggleDock={action('onToggleDock')}
		tooltipPlacement="top"
	/>
);

export const WithBackGroundIcon = () => (
	<Layout
		mode="TwoColumns"
		one={
			<SidePanel
				id="context"
				actions={actions}
				onSelect={action('onItemSelect')}
				onToggleDock={action('onToggleDock')}
				tooltipPlacement="top"
				backgroundIcon={assetsApi.getURL('/src/svg/products/tmc-negative.svg', '@talend/icons')}
			/>
		}
	>
		<article style={{ padding: 10 }}>
			The props <strong>backgroundIcon</strong> let you support product icons. It is used as{' '}
			<pre>mask-image: url(backgroundIcon)</pre> so you have to provide URL. For this example we
			have used assetsApi this way:
			<pre>
				backgroundIcon={assetsApi.getURL('/src/svg/products/tmc-negative.svg', '@talend/icons')}
			</pre>
		</article>
	</Layout>
);

export const Links = () => <SidePanel id="context" actions={actionsLinks} tooltipPlacement="top" />;

export const Docked = () => <SidePanel actions={actions} docked tooltipPlacement="top" />;

export const Minimised = () => (
	<SidePanel
		actions={actions}
		onToggleDock={action('Toggle dock clicked')}
		minimised
		tooltipPlacement="top"
	/>
);

export const WithALargeAmountOfItems = () => (
	<SidePanel
		actions={[...items, ...other, ...other, ...other]}
		onSelect={action('onItemSelect')}
		selected={items[1]}
		tooltipPlacement="top"
	/>
);

export const Reverse = () => (
	<SidePanel
		actions={items}
		onSelect={action('onItemSelect')}
		selected={items[1]}
		reverse
		tooltipPlacement="top"
	/>
);

export const ReverseLargeDocked = () => (
	<SidePanel
		actions={items}
		onSelect={action('onItemSelect')}
		selected={items[1]}
		reverse
		large
		minimised
		dockable={false}
		tooltipPlacement="top"
	/>
);

export const _WithLayout = () => {
	class WithLayout extends React.Component {
		constructor() {
			super();
			this.state = { docked: false };
		}

		render() {
			const panel = (
				<SidePanel
					actions={[...items, ...other, ...other, ...other]}
					onSelect={action('onItemSelect')}
					docked={this.state.docked}
					tooltipPlacement="top"
				/>
			);
			return (
				<Layout mode="TwoColumns" one={panel}>
					<ol>
						{new Array(100).fill('This is some random content').map((item, num) => (
							<li key={num}>{item}</li>
						))}
					</ol>
				</Layout>
			);
		}
	}

	return <WithLayout />;
};

export const ReverseWithLayout = () => {
	const panelItems = items.concat([
		{
			key: 'longname',
			label: 'Some super super super long name',
			icon: 'talend-world',
		},
	]);
	const panel = (
		<SidePanel
			actions={panelItems}
			onSelect={action('onItemSelect')}
			reverse
			tooltipPlacement="top"
		/>
	);
	return (
		<Layout mode="TwoColumns" one={panel}>
			<ol>
				{new Array(100).fill('This is some random content').map((item, num) => (
					<li key={num}>{item}</li>
				))}
			</ol>
		</Layout>
	);
};

export const PortalReverse = () => (
	<div className={appStyle.portal}>
		<h1>SidePanel</h1>
		<p>
			Keep sidePanel reverse style even if <em>t7</em> styles are applied.
		</p>
		<div className={Layout.TALEND_T7_THEME_CLASSNAME} style={{ height: '100vh' }}>
			<SidePanel id="context" actions={actions} tooltipPlacement="top" reverse />
		</div>
	</div>
);
