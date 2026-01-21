import type { Meta, StoryObj } from '@storybook/react';
import { Fragment, useState } from 'react';
import ActionIconToggle from './ActionIconToggle.component';

const inactiveIconToggle = {
	icon: 'talend-panel-opener-right',
	id: 'my-inactive-action',
	label: "Click me, I'm inactive",
	'data-feature': 'actionicontoggle',
	onClick: () => console.log('You clicked the inactive button'),
	tooltipPlacement: 'top' as const,
};

const activeIconToggle = {
	active: true,
	icon: 'talend-panel-opener-right',
	id: 'my-active-action',
	label: "Click me, I'm inactive",
	'data-feature': 'actionicontoggle',
	onClick: () => console.log('You clicked the active button'),
	tooltipPlacement: 'top' as const,
};

const ACTION1 = 'Action 1';
const ACTION2 = 'Action 2';

const DisableActionIconToggle = () => {
	const [active, setActive] = useState(ACTION1);

	const props = {
		icon: 'talend-panel-opener-right',
		tooltipPlacement: 'top' as const,
	};
	return (
		<Fragment>
			<p>Switch Button</p>
			<ActionIconToggle
				{...props}
				label={ACTION1}
				active={active === ACTION1}
				disabled={active === ACTION1}
				onClick={() => setActive(ACTION1)}
			/>
			<ActionIconToggle
				{...props}
				label={ACTION2}
				active={active === ACTION2}
				disabled={active === ACTION2}
				onClick={() => setActive(ACTION2)}
			/>
		</Fragment>
	);
};

type Story = StoryObj<typeof ActionIconToggle>;

const meta: Meta<typeof ActionIconToggle> = {
	title: 'Components/Actions/IconToggle',
	component: ActionIconToggle,
	tags: ['autodocs'],
	decorators: [story => <div className="col-lg-offset-2 col-lg-8">{story()}</div>],
};

export default meta;

export const DisableTheButtons: Story = {
	render: () => (
		<div>
			<DisableActionIconToggle />
		</div>
	),
};

export const Default: Story = {
	render: () => (
		<div>
			<p>Inactive (By default)</p>
			<ActionIconToggle {...inactiveIconToggle} />

			<p>Active</p>
			<ActionIconToggle {...activeIconToggle} />

			<p>With tick</p>
			<ActionIconToggle {...inactiveIconToggle} tick />

			<p>Active with tick</p>
			<ActionIconToggle {...activeIconToggle} tick />
		</div>
	),
};
