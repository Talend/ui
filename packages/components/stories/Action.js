import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
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
