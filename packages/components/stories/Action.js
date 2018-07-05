import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { checkA11y } from '@storybook/addon-a11y';
import talendIcons from '@talend/icons/dist/react';

import { Action, IconsProvider } from '../src/index';

const icons = {
	'talend-dataprep': talendIcons['talend-dataprep'],
};

const myAction = {
	label: 'Click me',
	icon: 'talend-dataprep',
	'data-feature': 'action',
	onClick: action('You clicked me'),
};

const OverlayComponent = <div>I am an overlay</div>;

const mouseDownAction = {
	label: 'Click me',
	icon: 'talend-dataprep',
	'data-feature': 'action',
	onMouseDown: action('You clicked me'),
};

storiesOf('Action', module)
	.addDecorator(checkA11y)
	.addDecorator(story => (
		<div className="col-lg-offset-2 col-lg-8">
			<IconsProvider defaultIcons={icons} />
			{story()}
		</div>
	))
	.addWithInfo('default', () => (
		<div>
			<p>By default :</p>
			<Action id="default" {...myAction} />
			<p>With hideLabel option</p>
			<Action id="hidelabel" {...myAction} hideLabel />
			<p>In progress</p>
			<Action id="inprogress" {...myAction} inProgress />
			<p>loading</p>
			<Action id="loading" loading />
			<p>Icon button</p>
			<Action id="icon" {...myAction} link />
			<p>Loading Icon button</p>
			<Action id="icon" link label={'Click me'} loading />
			<p>Disabled</p>
			<Action id="disabled" {...myAction} disabled />
			<p>Reverse display</p>
			<Action id="reverseDisplay" {...myAction} iconPosition="right" />
			<p>Transform icon</p>
			<Action id="reverseDisplay" {...myAction} iconTransform={'rotate-180'} />
			<p>Custom tooltip</p>
			<Action id="default" {...myAction} tooltipLabel={'Custom label here'} />
			<p>onMouse down handler</p>
			<Action id="hidelabel" {...mouseDownAction} hideLabel />
			<p>Action with popover</p>
			<Action
				id="hidelabel"
				overlayComponent={OverlayComponent}
				overlayPlacement="top"
				tooltipPlacement="right"
				{...mouseDownAction}
				hideLabel
			/>
			<p>Action in progress</p>
			<Action
				id="hidelabel"
				inProgress="true"
				overlayComponent={OverlayComponent}
				overlayPlacement="top"
				tooltipPlacement="right"
				{...mouseDownAction}
				hideLabel
			/>
			<h3>
				Automatic Dropup : this is contained in a restricted ".tc-dropdown-container" element.
			</h3>
			<div
				id="auto-dropup"
				className={'tc-dropdown-container'}
				style={{ border: '1px solid black', overflow: 'scroll', height: '300px' }}
			>
				Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor<br />
				ut labore et dolore magna aliqua.<br />
				Ut enim ad minim veniam, quis nostrud exercitation ullamco la<br />
				Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor<br />
				ut labore et dolore magna aliqua.<br />
				Ut enim ad minim veniam, quis nostrud exercitation ullamco la<br />
				<br />
				<br />
				<br />
				<p>Scroll me to set overflow on top or down of the container, then open the dropdown.</p>
				<Action
					preventScrolling
					overlayComponent={OverlayComponent}
					overlayPlacement="top"
					tooltipPlacement="right"
					{...mouseDownAction}
					hideLabel
				/>
				<br />
				<br />
				<br />
				Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor <br />
				ut labore et dolore magna aliqua.<br />
				Ut enim ad minim veniam, quis nostrud exercitation ullamco la Lorem ipsum dolor sit amet,
				consectetur adipiscing elit, sed do eiusmod tempor <br />
				ut labore et dolore magna aliqua.<br />
				Ut enim ad minim veniam, quis nostrud exercitation ullamco la
			</div>
		</div>
	))
	.addWithPropsCombinations('combinations', Action, {
		label: ['Click me'],
		icon: ['talend-dataprep'],
		'data-feature': ['my.feature'],
		onClick: [action('You clicked me')],
		hideLabel: [false, true],
		inProgress: [true, false],
		disabled: [false, true],
		tooltipLabel: [undefined, 'Tooltip custom label'],
	});
