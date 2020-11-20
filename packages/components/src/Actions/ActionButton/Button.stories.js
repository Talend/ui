import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import withPropsCombinations from 'react-storybook-addon-props-combinations';

import ActionButton from './ActionButton.component';
import IconsProvider from '../../IconsProvider';

import theme from './Button.stories.scss';

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

const ACTION1 = 'Action 1';
const ACTION2 = 'Action 2';

class DisableActionButton extends React.Component {
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
			tooltip: true,
		};
		return (
			<React.Fragment>
				<p>Switch Button</p>
				<ActionButton
					{...props}
					label={ACTION1}
					active={this.state.active === ACTION1}
					disabled={this.state.active === ACTION1}
					onClick={() => this.setState({ active: ACTION1 })}
				/>
				<ActionButton
					{...props}
					label={ACTION2}
					active={this.state.active === ACTION2}
					disabled={this.state.active === ACTION2}
					onClick={() => this.setState({ active: ACTION2 })}
				/>
			</React.Fragment>
		);
	}
}

storiesOf('Buttons/Button', module)
	.addDecorator(story => (
		<div className="col-lg-offset-2 col-lg-8">
			<IconsProvider bundles={[`${location.origin}${location.pathname}all.svg`]} />
			{story()}
		</div>
	))
	.add('Disable the buttons', () => (
		<div>
			<DisableActionButton />
		</div>
	))
	.add('default', () => (
		<div>
			<h3>By default :</h3>
			<ActionButton id="default" {...myAction} />
			<h3>Bootstrap style :</h3>
			<ActionButton id="bsStyle" {...myAction} bsStyle="primary" />
			<ActionButton id="bsStyle" {...myAction} className="btn-primary btn-inverse" />
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
				onMouseEnter={action('mouse enter')}
				onMouseLeave={action('mouse leave')}
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
	))
	.add(
		'combinations',
		withPropsCombinations(ActionButton, {
			label: ['Click me'],
			icon: ['talend-dataprep'],
			'data-feature': ['my.feature'],
			onClick: [action('You clicked me')],
			hideLabel: [false, true],
			inProgress: [true, false],
			disabled: [false, true],
			tooltipLabel: [undefined, 'Tooltip custom label'],
		}),
	);
