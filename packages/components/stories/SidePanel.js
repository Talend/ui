import React from 'react';
import { storiesOf, action } from '@storybook/react';
import talendIcons from '@talend/icons/dist/react';

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

const items = [{
	key: 'preparations',
	label: 'Preparations',
	icon: 'talend-dataprep',
}, {
	key: 'datasets',
	label: 'Datasets',
	icon: 'talend-download',
}, {
	key: 'favorites',
	label: 'Favorites',
	icon: 'talend-star',
}];

const stories = storiesOf('SidePanel', module);
if (!stories.addWithInfo) {
	stories.addWithInfo = stories.add;
}

stories
	.addWithInfo('default', () => (
		<div>
			<IconsProvider defaultIcons={icons} />
			<SidePanel
				id="context"
				actions={actions}
				onToggleDock={action('Toggle dock clicked')}
				docked={false}
				tooltipPlacement="top"
			/>
		</div>
	))
	.addWithInfo('docked', () => (
		<div>
			<IconsProvider defaultIcons={icons} />
			<SidePanel
				actions={actions}
				onToggleDock={action('Toggle dock clicked')}
				docked
				tooltipPlacement="top"
			/>
		</div>
	))
	.addWithInfo('with onSelect function', () => (
		<div>
			<IconsProvider defaultIcons={icons} />
			<SidePanel
				actions={items}
				onSelect={action('onItemSelect')}
				onToggleDock={action('onToggleDock')}
				selected={items[1]}
				tooltipPlacement="top"
			/>
		</div>
	))
	.addWithInfo('With layout (toggle interactive)', () => {
		class WithLayout extends React.Component {
			constructor() {
				super();
				this.state = { docked: true };
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
						selected={items[1]}
					/>
				);
				return (
					<Layout	mode="TwoColumns" one={panel}>
						<ol>
							{
								new Array(100)
									.fill('This is some random content')
									.map((item, num) => <li key={num}>{item}</li>)
							}
						</ol>
						<IconsProvider defaultIcons={icons} />
					</Layout>
				);
			}
		}

		return (
			<WithLayout />
		);
	});

