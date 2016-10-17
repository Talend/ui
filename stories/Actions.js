import React from 'react';
import { storiesOf, action } from '@kadira/storybook';

import { Actions } from '../src/index';

const actions = [
	{ label: 'Preparations', icon: 'fa fa-asterisk', onClick: action('Preparations clicked'), bsStyle: 'primary' },
	{ label: 'Datasets', icon: 'fa fa-file-excel-o', onClick: action('Datasets clicked') },
	{ label: 'Favorites', icon: 'fa fa-star', onClick: action('Favorites clicked') },
];
storiesOf('Actions', module)
	.addWithInfo('default', () => (
		<div>
			<h1>Actions</h1>
			<h2>Definition</h2>
			<p>The actions component display buttons to let the user dispatch those actions</p>
			<h2>Examples</h2>
			<p>By default :</p>
			<Actions actions={actions} />
			<p>With hideLabel option</p>
			<Actions
				actions={actions}
				hideLabel
			/>
			<p>Vertical</p>
			<Actions
				actions={actions}
				vertical
			/>
			<p>Vertical with hideLabel</p>
			<Actions
				actions={actions}
				placement="right"
				hideLabel
				vertical
			/>
		</div>
	));
