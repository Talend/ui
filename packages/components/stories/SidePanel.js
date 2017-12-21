import React from 'react';
import { I18nextProvider } from 'react-i18next';
import { storiesOf, action } from '@storybook/react';
import talendIcons from '@talend/icons/dist/react';
import i18n, { LanguageSwitcher } from './config/i18n';
import { SidePanel, IconsProvider, Layout } from '../src/index';

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
		label: 'Preparations',
		icon: 'talend-dataprep',
		onClick: action('Preparations clicked'),
		active: true,
	},
	{
		label: 'Datasets',
		icon: 'talend-download',
		onClick: action('Datasets clicked'),
	},
	{
		label: 'Favorites',
		icon: 'talend-star',
		onClick: action('Favorites clicked'),
	},
];

const items = [
	{
		key: 'preparations',
		label: 'Preparations',
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

const stories = storiesOf('SidePanel', module);
if (!stories.addWithInfo) {
	stories.addWithInfo = stories.add;
}

stories
	.addDecorator(story => (
		<div>
			<LanguageSwitcher />
			<IconsProvider defaultIcons={icons} />
			<I18nextProvider i18n={i18n}>{story()}</I18nextProvider>
		</div>
	))
	.addWithInfo('default', () => (
		<SidePanel
			id="context"
			actions={actions}
			onToggleDock={action('Toggle dock clicked')}
			docked={false}
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
	.addWithInfo('with onSelect function', () => (
		<SidePanel
			actions={items}
			onSelect={action('onItemSelect')}
			onToggleDock={action('onToggleDock')}
			selected={items[1]}
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
	.addWithInfo('with inverted style', () => (
		<SidePanel
			actions={items}
			onSelect={action('onItemSelect')}
			onToggleDock={action('onToggleDock')}
			selected={items[1]}
			reverse
			tooltipPlacement="top"
		/>
	))
	.addWithInfo('with large inverted style', () => (
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
	.addWithInfo('large docked', () => (
		<SidePanel
			actions={actions}
			onToggleDock={action('Toggle dock clicked')}
			docked
			large
			tooltipPlacement="top"
		/>
	))
	.addWithInfo('With layout (toggle interactive)', () => {
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
						<IconsProvider defaultIcons={icons} />
					</Layout>
				);
			}
		}

		return <WithLayout />;
	});
