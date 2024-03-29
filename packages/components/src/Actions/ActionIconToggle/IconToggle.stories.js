import { Component, Fragment } from 'react';

import { action } from '@storybook/addon-actions';

import ActionIconToggle from './ActionIconToggle.component';

const inactiveIconToggle = {
	icon: 'talend-panel-opener-right',
	id: 'my-inactive-action',
	label: "Click me, I'm inactive",
	'data-feature': 'actionicontoggle',
	onClick: action('You clicked the inactive button'),
	tooltipPlacement: 'top',
};

const activeIconToggle = {
	active: true,
	icon: 'talend-panel-opener-right',
	id: 'my-active-action',
	label: "Click me, I'm inactive",
	'data-feature': 'actionicontoggle',
	onClick: action('You clicked the active button'),
	tooltipPlacement: 'top',
};

const ACTION1 = 'Action 1';
const ACTION2 = 'Action 2';

class DisableActionIconToggle extends Component {
	constructor(props) {
		super(props);

		this.state = {
			active: ACTION1,
		};
	}

	render() {
		const props = {
			icon: 'talend-panel-opener-right',
			tooltipPlacement: 'top',
		};
		return (
			<Fragment>
				<p>Switch Button</p>
				<ActionIconToggle
					{...props}
					label={ACTION1}
					active={this.state.active === ACTION1}
					disabled={this.state.active === ACTION1}
					onClick={() => this.setState({ active: ACTION1 })}
				/>
				<ActionIconToggle
					{...props}
					label={ACTION2}
					active={this.state.active === ACTION2}
					disabled={this.state.active === ACTION2}
					onClick={() => this.setState({ active: ACTION2 })}
				/>
			</Fragment>
		);
	}
}

export default {
	title: 'Components/Actions/IconToggle',
	decorators: [story => <div className="col-lg-offset-2 col-lg-8">{story()}</div>],
};

export const DisableTheButtons = () => (
	<div>
		<DisableActionIconToggle />
	</div>
);

export const Default = () => (
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
);

export const CustomizeSizes = () => (
	<div>
		<p>You can customize a specific icon toggle using a sass mixin</p>
		<pre>
			{`// sass file
@import '~@talend/react-components/lib/Actions/ActionIconToggle/ActionIconToggle.scss'
$my-btn-size: 2.5rem;
$my-btn-icon-size: 1.5625rem;
.tc-icon-toggle.my-custom-icon-toggle {
    @include tc-icon-toggle($my-btn-size, $my-btn-icon-size);
}`}
		</pre>
		<pre>
			{`// component file
<ActionIconToggle
    className={'my-custom-icon-toggle'}
    {...otherProps}
/>`}
		</pre>

		<style>
			{`.tc-icon-toggle.my-custom-icon-toggle {
                        height: 2.5rem;
                        width: 2.5rem;
                        border-radius:1.25rem;
                    }

                    .tc-icon-toggle.my-custom-icon-toggle svg {
                        height: 1.5625rem;
                        width: 1.5625rem;
                    }`}
		</style>

		<p>Custom sizes</p>
		<ActionIconToggle {...inactiveIconToggle} className="my-custom-icon-toggle" />
		<ActionIconToggle {...activeIconToggle} className="my-custom-icon-toggle" />

		<p>Classical sizes</p>
		<ActionIconToggle {...inactiveIconToggle} />
		<ActionIconToggle {...activeIconToggle} />
	</div>
);
