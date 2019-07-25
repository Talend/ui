import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import talendIcons from '@talend/icons/dist/react';

import { Action, IconsProvider } from '../src/index';

import theme from './Action.scss';

const icons = {
	'talend-dataprep': talendIcons['talend-dataprep'],
	'talend-upload': talendIcons['talend-upload'],
};

const myAction = {
	label: 'Click me',
	icon: 'talend-dataprep',
	'data-feature': 'action',
	onClick: action('You clicked me'),
};

const myFileAction = {
	label: 'Click me',
	'data-feature': 'actionfile',
	icon: 'talend-upload',
	onChange: action('You changed me'),
	displayMode: 'file',
};

const OverlayComponent = <div>I am an overlay</div>;

const mouseDownAction = {
	label: 'Click me',
	icon: 'talend-dataprep',
	'data-feature': 'action',
	onMouseDown: action('You clicked me'),
};

storiesOf('Components/Controls/Button', module)
	.addDecorator(story => (
		<div className="col-lg-offset-2 col-lg-8">
			<IconsProvider defaultIcons={icons} />
			{story()}
		</div>
	))
	.add('default', () => (
		<div>
			<h3>By default :</h3>
			<Action id="default" {...myAction} />
			<h3>Bootstrap style :</h3>
			<Action id="bsStyle" {...myAction} bsStyle="primary" />
			<Action id="bsStyle" {...myAction} className="btn-primary btn-inverse" />
			<h3>With hideLabel option</h3>
			<Action id="hidelabel" {...myAction} hideLabel />
			<h3>In progress</h3>
			<Action id="inprogress" {...myAction} inProgress />
			<h3>Loading</h3>
			<Action id="loading" loading label="loading" />
			<h3>Icon button with label</h3>
			<Action id="icon" {...myAction} link />
			<h3>Icon button without label</h3>
			<Action id="icon-without-label" {...myAction} link label="" />
			<h3>Loading Icon button</h3>
			<Action id="icon" link label="Click me" loading />
			<h3>Disabled</h3>
			<Action id="disabled" {...myAction} disabled />
			<h3>Reverse display</h3>
			<Action id="reverseDisplay" {...myAction} iconPosition="right" />
			<h3>With hover handlers</h3>
			<Action
				id="withHoverHandlers"
				{...myAction}
				onMouseEnter={action('mouse enter')}
				onMouseLeave={action('mouse leave')}
			/>
			<h3>Transform icon</h3>
			<Action id="reverseDisplay" {...myAction} iconTransform={'rotate-180'} />
			<h3>Custom tooltip</h3>
			<Action id="default" {...myAction} tooltipLabel={'Custom label here'} />
			<h3>OnMouse down handler</h3>
			<Action id="hidelabel" {...mouseDownAction} hideLabel />
			<h3>Action with popover</h3>
			<Action
				id="hidelabel"
				overlayId="hidelabel"
				overlayComponent={OverlayComponent}
				overlayPlacement="top"
				tooltipPlacement="right"
				{...mouseDownAction}
				hideLabel
			/>
			<h3>Action in progress</h3>
			<Action
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
				className={'tc-dropdown-container'}
				style={{
					border: '1px solid black',
					overflow: 'scroll',
					height: '300px',
					resize: 'vertical',
				}}
			>
				<p>Scroll me to set overflow on top or down of the container, then open the dropdown.</p>
				<div className={theme['storybook-wrapped-action']}>
					<Action
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
	.add('file', () => (
		<div>
			<p>By default :</p>
			<Action id="default" {...myFileAction} />
			<p>With hideLabel option</p>
			<Action id="hidelabel" {...myFileAction} hideLabel />
			<p>In progress</p>
			<Action id="inprogress" {...myFileAction} inProgress />
			<p>Disabled</p>
			<Action id="disabled" {...myFileAction} disabled />
			<p>Reverse display</p>
			<Action id="reverseDisplay" {...myFileAction} iconPosition="right" />
			<p>Transform icon</p>
			<Action id="reverseDisplay" {...myFileAction} iconTransform="rotate-180" />
			<p>Custom tooltip</p>
			<Action id="default" {...myFileAction} tooltipLabel="Custom label here" />
			<p>Bootstrap style</p>
			<Action id="default" {...myFileAction} bsStyle="primary" tooltipLabel="Custom label here" />
			<Action
				id="default"
				{...myFileAction}
				className="btn-default btn-inverse"
				tooltipLabel="Custom label here"
			/>
		</div>
	));
