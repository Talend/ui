import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import talendIcons from '@talend/icons/dist/react';

import Action from '../Action';
import IconsProvider from '../../IconsProvider';

const icons = {
	'talend-upload': talendIcons['talend-upload'],
};

const myAction = {
	label: 'Click me',
	'data-feature': 'actionfile',
	icon: 'talend-upload',
	onChange: action('You changed me'),
	displayMode: 'file',
};

storiesOf('Buttons/File', module)
	.addDecorator(story => (
		<div className="col-lg-offset-2 col-lg-8">
			<IconsProvider defaultIcons={icons} />
			{story()}
		</div>
	))
	.add('default', () => (
		<div>
			<p>By default :</p>
			<Action id="default" {...myAction} />
			<p>With hideLabel option</p>
			<Action id="hidelabel" {...myAction} hideLabel />
			<p>In progress</p>
			<Action id="inprogress" {...myAction} inProgress />
			<p>Disabled</p>
			<Action id="disabled" {...myAction} disabled />
			<p>Reverse display</p>
			<Action id="reverseDisplay" {...myAction} iconPosition="right" />
			<p>Transform icon</p>
			<Action id="reverseDisplay" {...myAction} iconTransform="rotate-180" />
			<p>Custom tooltip</p>
			<Action id="default" {...myAction} tooltipLabel="Custom label here" />
			<p>Bootstrap style</p>
			<Action id="default" {...myAction} bsStyle="primary" tooltipLabel="Custom label here" />
			<Action
				id="default"
				{...myAction}
				className="btn-default btn-inverse"
				tooltipLabel="Custom label here"
			/>
		</div>
	));
