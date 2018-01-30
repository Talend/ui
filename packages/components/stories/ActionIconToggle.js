import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import talendIcons from '@talend/icons/dist/react';

import { ActionIconToggle, IconsProvider } from '../src/index';

const icons = {
	'talend-panel-opener-right': talendIcons['talend-panel-opener-right'],
};

const inactiveIconToggle = {
	icon: 'talend-panel-opener-right',
	id: 'my-inactive-action',
	label: 'Click me, I\'m inactive',
	onClick: action('You clicked the inactive button'),
	tooltipPlacement: 'top',
};

const activeIconToggle = {
	active: true,
	icon: 'talend-panel-opener-right',
	id: 'my-active-action',
	label: 'Click me, I\'m inactive',
	onClick: action('You clicked the active button'),
	tooltipPlacement: 'top',
};

storiesOf('Action Icon Toggle', module)
	.addDecorator(story => (
		<div className="col-lg-offset-2 col-lg-8">
			<IconsProvider defaultIcons={icons} />
			{story()}
		</div>
	))
	.addWithInfo('default', () => (
		<div>
			<p>Inactive (By default)</p>
			<ActionIconToggle {...inactiveIconToggle} />

			<p>Active</p>
			<ActionIconToggle {...activeIconToggle} />
		</div>
	))
	.addWithInfo('customize sizes', () => (
		<div>
			<p>You can customize a specific icon toggle using a sass mixin</p>
			<pre>
				{
					`// sass file
@import '~@talend/react-components/lib/Actions/ActionIconToggle/ActionIconToggle.scss'
$my-btn-size: 4rem;
$my-btn-icon-size: 2.5rem;
.tc-icon-toggle.my-custom-icon-toggle {
	@include btn-icon-toggle($my-btn-size, $my-btn-icon-size);
}`
				}
			</pre>
			<pre>
				{
`// component file
<ActionIconToggle
	className={'my-custom-icon-toggle'}
	{...otherProps}
/>`
				}
			</pre>

			<style>
				{
					`.tc-icon-toggle.my-custom-icon-toggle {
						height: 4rem;
						width: 4rem;
						border-radius:2rem;
					}

					.tc-icon-toggle.my-custom-icon-toggle svg {
						height: 2.5rem;
						width: 205rem;
					}`
				}
			</style>

			<p>Custom sizes</p>
			<ActionIconToggle {...inactiveIconToggle} className={'my-custom-icon-toggle'} />
			<ActionIconToggle {...activeIconToggle} className={'my-custom-icon-toggle'} />

			<p>Classical sizes</p>
			<ActionIconToggle {...inactiveIconToggle} />
			<ActionIconToggle {...activeIconToggle} />
		</div>
	));
