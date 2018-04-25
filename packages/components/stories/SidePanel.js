import React from 'react';
import { I18nextProvider } from 'react-i18next';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import talendIcons from '@talend/icons/dist/react';
import i18n, { LanguageSwitcher } from './config/i18n';
import { IconsProvider, Layout, SidePanel } from '../src/index';

import { TALEND_T7_THEME_APPS as apps, TALEND_T7_THEME_CLASSNAME } from '../src/Layout/constants';

const icons = {
	'talend-arrow-left': talendIcons['talend-arrow-left'],
	'talend-dataprep': talendIcons['talend-dataprep'],
	'talend-download': talendIcons['talend-download'],
	'talend-star': talendIcons['talend-star'],
	'talend-opener': talendIcons['talend-opener'],
	'talend-world': talendIcons['talend-world'],
};

const actions = [
	{
		label: 'Preparations de chimistes',
		icon: 'talend-dataprep',
		onClick: action('Preparations clicked'),
		active: true,
	},
	{
		label: 'Datasets pour les cons',
		icon: 'talend-download',
		onClick: action('Datasets clicked'),
	},
	{
		label: 'Favorites des boulets',
		icon: 'talend-star',
		onClick: action('Favorites clicked'),
	},
];

const actionsLinks = [
	{
		label: 'Preparations de malade pour les chimistes',
		icon: 'talend-dataprep',
		href: '/preparations',
		active: true,
	},
	{
		label: 'Datasets assez court :)',
		icon: 'talend-download',
		href: '/datasets',
	},
	{
		label: 'Favorites my faroris long',
		icon: 'talend-star',
		href: '/favorites',
	},
];

const items = [
	{
		key: 'preparations',
		label: 'Preparations assez longue quand meme',
		icon: 'talend-dataprep',
	},
	{
		key: 'datasets',
		label: 'Datasets data set assez long',
		icon: 'talend-download',
	},
	{
		key: 'favorites',
		label: 'Favorites mon favoris le plus long',
		icon: 'talend-star',
	},
];

const stories = storiesOf('SidePanel', module);
if (!stories.addWithInfo) {
	stories.addWithInfo = stories.add;
}

stories
	.addDecorator(story => (
		<div>
			<LanguageSwitcher />
			<IconsProvider defaultIcons={icons} />
			<I18nextProvider i18n={i18n}>
				{story()}
			</I18nextProvider>
		</div>
	))
	.addWithInfo('default', () => (
		<SidePanel
			id="context"
			actions={actions}
			onSelect={action('onItemSelect')}
			onToggleDock={action('onToggleDock')}
			tooltipPlacement="top"
		/>
	))
	.addWithInfo('links', () => (
		<SidePanel
			id="context"
			actions={actionsLinks}
			onToggleDock={action('onToggleDock')}
			tooltipPlacement="top"
		/>
	))
	.addWithInfo('docked', () => (
		<SidePanel
			actions={actions}
			onToggleDock={action('Toggle dock clicked')}
			docked
			tooltipPlacement="top"
		/>
	))
	.addWithInfo('not dockable', () => (
		<SidePanel
			actions={items}
			onSelect={action('onItemSelect')}
			onToggleDock={action('onToggleDock')}
			dockable={false}
			selected={items[1]}
			tooltipPlacement="top"
		/>
	))
	.addWithInfo('large docked', () => (
		<SidePanel
			actions={actions}
			onToggleDock={action('Toggle dock clicked')}
			docked
			large
			tooltipPlacement="top"
		/>
	))
	.addWithInfo('reverse', () => (
		<SidePanel
			actions={items}
			onSelect={action('onItemSelect')}
			onToggleDock={action('onToggleDock')}
			selected={items[1]}
			reverse
			tooltipPlacement="top"
		/>
	))
	.addWithInfo('large reverse', () => (
		<SidePanel
			actions={items}
			onSelect={action('onItemSelect')}
			onToggleDock={action('onToggleDock')}
			selected={items[1]}
			reverse
			large
			tooltipPlacement="top"
		/>
	))
	.addWithInfo('with layout (toggle interactive)', () => {
		class WithLayout extends React.Component {
			constructor() {
				super();
				this.state = { docked: false };
			}

			render() {
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
						onToggleDock={() => this.setState({ docked: !this.state.docked })}
						docked={this.state.docked}
						tooltipPlacement="top"
					/>
				);
				return (
					<Layout mode="TwoColumns" one={panel}>
						<ol>
							{new Array(100)
								.fill('This is some random content')
								.map((item, num) => <li key={num}>{item}</li>)}
						</ol>
					</Layout>
				);
			}
		}

		return <WithLayout />;
	})
	.addWithInfo('reverse with layout (toggle interactive)', () => {
		class WithLayout extends React.Component {
			constructor() {
				super();
				this.state = { docked: false };
			}

			render() {
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
						onToggleDock={() => this.setState({ docked: !this.state.docked })}
						reverse
						docked={this.state.docked}
						tooltipPlacement="top"
					/>
				);
				return (
					<Layout mode="TwoColumns" one={panel}>
						<ol>
							{new Array(100)
								.fill('This is some random content')
								.map((item, num) => <li key={num}>{item}</li>)}
						</ol>
					</Layout>
				);
			}
		}

		return <WithLayout />;
	});

const appStyle = require('./config/themes.scss');

apps.forEach(app => {
	stories
		.addWithInfo(`🎨 [${app.toUpperCase()}] SidePanel`, () => (
			<div className={appStyle[app]}>
				<div className={TALEND_T7_THEME_CLASSNAME} style={{ height: '100vh' }}>
					<SidePanel
						id="context"
						actions={actions}
						onToggleDock={action('Toggle dock clicked')}
						docked={false}
						tooltipPlacement="top"
					/>
				</div>
			</div>
		)
	);
});
