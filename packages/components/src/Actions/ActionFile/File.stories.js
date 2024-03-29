import { action } from '@storybook/addon-actions';

import Action from '../Action';

const myAction = {
	label: 'Click me',
	'data-feature': 'actionfile',
	icon: 'talend-upload',
	onChange: action('You changed me'),
	displayMode: 'file',
};

export default {
	title: 'Components/Actions/File',
	decorators: [story => <div className="col-lg-offset-2 col-lg-8">{story()}</div>],
};

export const Default = () => (
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
);
