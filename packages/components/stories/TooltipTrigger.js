import React from 'react';
import { storiesOf } from '@storybook/react';

import { TooltipTrigger, Button } from '../src/index';

storiesOf('TooltipTrigger', module).addWithInfo('default', () => (
	<div>
		<h1>TooltipTrigger</h1>
		<h2>Definition</h2>
		<p>
			The action component display a dropdown where each element let the user dispatch an action
		</p>
		<h2>Examples</h2>
		<p>By default :</p>
		<TooltipTrigger label="This is a tooltip demo">
			<Button>Default tooltip</Button>
		</TooltipTrigger>
		<p>With tooltipPlacement option</p>
		<TooltipTrigger label="This is a tooltip demo" tooltipPlacement="bottom">
			<Button>Bottom tooltip</Button>
		</TooltipTrigger>
		<p>With a custom component in the tooltip</p>
		<TooltipTrigger
			tooltipPlacement="bottom"
			label={
				<div>
					<span>I'm a custom component</span>
					{'\n'}
					<span>with a line feeding</span>
				</div>
			}
		>
			<span>Loreum....</span>
		</TooltipTrigger>
	</div>
));
