import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { checkA11y } from '@storybook/addon-a11y';
import talendIcons from '@talend/icons/dist/react';

import { Action, IconsProvider } from '../src/index';

import theme from './Action.scss';

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

const items = [
	{ label: 'Space The Final Frontier', onClick: action('bodyList.items.onClick') },
	{ label: 'How To Look Up', onClick: action('bodyList.items.onClick') },
	{ label: 'How To Look Up2', onClick: action('bodyList.items.onClick') },
	{ label: 'How To Look Up3', onClick: action('bodyList.items.onClick') },
	{ label: 'How To Look Up4', onClick: action('bodyList.items.onClick') },
	{ label: 'How To Look Up5', onClick: action('bodyList.items.onClick') },
	{ label: 'How To Look Up6', onClick: action('bodyList.items.onClick') },
	{ label: 'How To Look Up7', onClick: action('bodyList.items.onClick') },
	{ label: 'How To Look Up8', onClick: action('bodyList.items.onClick') },
];

const tabs = [
	{
		title: 'Existing',
		items: [
			{ label: 'Space The Final Frontier', onClick: action('bodyList.items.onClick') },
			{ label: 'How To Look Up', onClick: action('bodyList.items.onClick') },
			{ label: 'How To Look Up2', onClick: action('bodyList.items.onClick') },
			{ label: 'How To Look Up3', onClick: action('bodyList.items.onClick') },
			{ label: 'How To Look Up4', onClick: action('bodyList.items.onClick') },
			{ label: 'How To Look Up5', onClick: action('bodyList.items.onClick') },
			{ label: 'How To Look Up6', onClick: action('bodyList.items.onClick') },
			{ label: 'How To Look Up7', onClick: action('bodyList.items.onClick') },
			{ label: 'How To Look Up8', onClick: action('bodyList.items.onClick') },
		],
	},
	{
		title: 'Compatible',
		items: [
			{ label: 'Space The Final Frontier', onClick: action('bodyList.items.onClick') },
			{ label: 'How To Look Up', onClick: action('bodyList.items.onClick') },
		],
	},
];

const RichTooltipHeader = (
	<RichTooltip.Header
		title="Pipelines"
		right={[
			{
				id: 'add',
				label: 'Add',
				bsStyle: 'info',
				icon: 'talend-plus-circle',
				onClick: action('header.add.onClick'),
			},
		]}
	/>
);

const RichTooltipFooter = (
	<RichTooltip.Footer
		left={[
			{
				label: 'Add',
				icon: 'fa fa-asterisk',
				bsStyle: 'primary',
				onClick: action('footer.add.onClick'),
			},
		]}
		right={[
			{
				label: 'Add',
				icon: 'fa fa-asterisk',
				bsStyle: 'primary',
				onClick: action('footer.add.onClick'),
			},
		]}
	/>
);

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
			<p>Action with advanced tooltip in loading</p>
			<Action
				id="hidelabel"
				overlayPlacement="top"
				tooltipPlacement="right"
				{...mouseDownAction}
				overlayComponent={
					<RichTooltip
						loading
						header={RichTooltipHeader}
						content={<RichTooltip.Body content={loreum} />}
						footer={RichTooltipFooter}
					/>
				}
				hideLabel
			/>
			<p>Action with advanced tooltip</p>
			<Action
				id="hidelabel"
				overlayPlacement="top"
				tooltipPlacement="right"
				{...mouseDownAction}
				overlayComponent={
					<RichTooltip
						header={RichTooltipHeader}
						content={<RichTooltip.Body content={loreum} />}
						footer={RichTooltipFooter}
					/>
				}
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
