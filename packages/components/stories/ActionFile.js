import React from 'react';
import { storiesOf, action } from '@storybook/react';
import talendIcons from '@talend/icons/dist/react';

import { ActionFile, IconsProvider } from '../src/index';

const icons = {
	'talend-upload': talendIcons['talend-upload'],
};


const myActionFile = {
	label: 'upload',
	icon: 'talend-upload',
	onChange: action('You change my value'),
};

storiesOf('ActionFile', module)
	.addDecorator(story => (
		<div className="col-lg-offset-2 col-lg-8">
			<IconsProvider defaultIcons={icons} />
			{story()}
		</div>
	))
	.addWithInfo('default', () => (
		<div>
			<p>By default :</p>
			<ActionFile id="default" {...myActionFile} />
			<p>With hideLabel option</p>
			<ActionFile id="hidelabel" {...myActionFile} hideLabel />
			<p>In progress</p>
			<ActionFile id="inprogress" {...myActionFile} inProgress />
			<p>Disabled</p>
			<ActionFile id="disabled" {...myActionFile} disabled />
			<p>Reverse display</p>
			<ActionFile id="reverseDisplay" {...myActionFile} iconPosition="right" />
			<p>Transform icon</p>
			<ActionFile id="reverseDisplay" {...myActionFile} iconTransform={'rotate-180'} />
			<p>Custom tooltip</p>
			<ActionFile id="default" {...myActionFile} tooltipLabel={'Custom label here'} />
		</div>
	))
	.addWithPropsCombinations('combinations', ActionFile, {
		label: ['Click me'],
		icon: ['talend-dataprep'],
		onClick: [action('You clicked me')],
		hideLabel: [false, true],
		inProgress: [true, false],
		disabled: [false, true],
		tooltipLabel: [undefined, 'Tooltip custom label'],
	});
