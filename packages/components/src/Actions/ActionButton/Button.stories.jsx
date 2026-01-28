import { Fragment, useState } from 'react';

import ActionButton from './ActionButton.component';

import theme from './Button.stories.module.css';

const myAction = {
	label: 'Click me',
	icon: 'talend-dataprep',
	'data-feature': 'action',
	onClick: () => console.log('You clicked me'),
};

const OverlayComponent = <div>I am an overlay</div>;

const mouseDownAction = {
	label: 'Click me',
	icon: 'talend-dataprep',
	'data-feature': 'action',
	onMouseDown: () => console.log('You clicked me'),
};

const ACTION1 = 'Action 1';
const ACTION2 = 'Action 2';

const DisableActionButton = () => {
	const [active, setActive] = useState(ACTION1);

	const props = {
		icon: 'talend-panel-opener-right',
		tooltipPlacement: 'top',
		tooltip: true,
	};
	return (
		<Fragment>
			<p>Switch Button</p>
			<ActionButton
				{...props}
				label={ACTION1}
				active={active === ACTION1}
				disabled={active === ACTION1}
				onClick={() => setActive(ACTION1)}
			/>
			<ActionButton
				{...props}
				label={ACTION2}
				active={active === ACTION2}
				disabled={active === ACTION2}
				onClick={() => setActive(ACTION2)}
			/>
		</Fragment>
	);
};

const meta = {
	title: 'Components/Actions/Button',
	component: ActionButton,
	tags: ['autodocs'],
	decorators: [story => <div className="col-lg-offset-2 col-lg-8">{story()}</div>],
};

export default meta;

export const DisableTheButtons = {
	render: () => <DisableActionButton />,
};

export const Default = {
	render: () => (
		<div>
			<h3>By default :</h3>
			<ActionButton id="default" {...myAction} />
			<h3>Bootstrap style :</h3>
			<ActionButton id="bsStyle" {...myAction} bsStyle="primary" />
			<ActionButton id="bsStyle" {...myAction} className="btn-primary btn-inverse" />
			<h3>With new icons</h3>
			<ActionButton id="newIcon" {...myAction} iconName="badge-star" className="btn-primary" />
			<h3>With hideLabel option</h3>
			<ActionButton id="hidelabel" {...myAction} hideLabel />
			<h3>In progress</h3>
			<ActionButton id="inprogress" {...myAction} inProgress />
			<h3>Loading</h3>
			<ActionButton id="loading" loading label="loading" />
			<h3>Icon button with label</h3>
			<ActionButton id="icon" {...myAction} link />
			<h3>Icon button without label</h3>
			<ActionButton id="icon-without-label" {...myAction} link label="" />
			<h3>Loading Icon button</h3>
			<ActionButton id="icon" link label="Click me" loading />
			<h3>Disabled</h3>
			<ActionButton id="disabled" {...myAction} disabled tooltip />
			<h3>Reverse display</h3>
			<ActionButton id="reverseDisplay" {...myAction} iconPosition="right" />
			<h3>With hover handlers</h3>
			<ActionButton
				id="withHoverHandlers"
				{...myAction}
				onMouseEnter={() => console.log('mouse enter')}
				onMouseLeave={() => console.log('mouse leave')}
			/>
			<h3>Transform icon</h3>
			<ActionButton id="reverseDisplay" {...myAction} iconTransform="rotate-180" />
			<h3>Custom tooltip</h3>
			<ActionButton id="default" {...myAction} tooltipLabel="Custom label here" />
			<h3>OnMouse down handler</h3>
			<ActionButton id="hidelabel" {...mouseDownAction} hideLabel />
			<h3>Action with popover</h3>
			<ActionButton
				id="hidelabel"
				overlayId="hidelabel"
				overlayComponent={OverlayComponent}
				overlayPlacement="top"
				tooltipPlacement="right"
				{...mouseDownAction}
				hideLabel
			/>
			<h3>Action in progress</h3>
			<ActionButton
				id="hidelabel"
				inProgress
				overlayId="in-progress"
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
				className="tc-dropdown-container"
				style={{
					border: '1px solid black',
					overflow: 'scroll',
					height: '300px',
					resize: 'vertical',
				}}
			>
				<p>Scroll me to set overflow on top or down of the container, then open the dropdown.</p>
				<div className={theme['storybook-wrapped-action']}>
					<ActionButton
						preventScrolling
						overlayId="scroll"
						overlayComponent={OverlayComponent}
						overlayPlacement="bottom"
						tooltipPlacement="right"
						{...mouseDownAction}
						hideLabel
						style={{
							marginTop: '200px',
							marginBottom: '200px',
						}}
					/>
				</div>
			</div>
		</div>
	),
};
