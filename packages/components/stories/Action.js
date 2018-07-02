import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { checkA11y } from '@storybook/addon-a11y';
import talendIcons from '@talend/icons/dist/react';

import { Action, IconsProvider, RichTooltip } from '../src/index';

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

const loreum = `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec non ante nisi. Mauris pellentesque ipsum ac convallis facilisis. Ut ullamcorper vestibulum est at suscipit. Proin quis dui vitae elit commodo rutrum vitae nec dui. Integer sit amet pulvinar lectus. Pellentesque ornare sapien et velit placerat pretium id ut nisl. Aenean eu erat non enim tincidunt semper. Suspendisse eleifend id lectus id commodo. Mauris vel risus a lacus aliquam iaculis. Ut blandit mauris id consectetur dictum. Vivamus tincidunt sapien et nunc facilisis, in bibendum mauris hendrerit. Nullam ipsum magna, finibus condimentum urna et, lacinia gravida velit.

Nullam luctus nulla eget luctus mattis. Etiam mollis magna et sollicitudin porttitor. Nullam efficitur ut urna ac bibendum. Nullam est ex, porttitor et eros ac, rhoncus condimentum enim. Integer fringilla mollis eros, nec convallis enim facilisis pulvinar. Pellentesque interdum ornare semper. Proin at imperdiet urna, ac ultrices dui. Vivamus eu ipsum ut sem venenatis tincidunt vel ut ipsum. Pellentesque id tortor tincidunt, ultrices augue id, eleifend justo.

Mauris at orci tristique, fermentum est vel, congue velit. Donec egestas rutrum tincidunt. Aliquam hendrerit augue ut turpis ornare, sodales dictum eros commodo. Sed sodales sollicitudin elit facilisis porta. Duis nec mi vel mi tincidunt laoreet. Curabitur quis dictum est. Aliquam viverra lorem dolor, ut fringilla lectus lacinia vitae. Nam molestie sem non tellus condimentum, sit amet facilisis justo porttitor. In sit amet sapien imperdiet, rhoncus quam in, sagittis erat. Nam at neque tristique, posuere eros in, accumsan diam. Sed porttitor sem ac eleifend faucibus.

Nunc euismod varius augue, non suscipit arcu aliquam sit amet. Aliquam sagittis hendrerit mollis. Nunc elementum augue eget tincidunt luctus. Curabitur quis diam aliquam, porta magna vel, posuere felis. Nulla consequat nulla sit amet lobortis auctor. Nam rhoncus molestie sapien. Proin ut velit eget metus tristique rutrum at sagittis ligula. Sed id ultricies sem, a pharetra ex. Ut efficitur molestie tempor. Cras varius consequat sagittis. Cras pulvinar dolor eget purus gravida vehicula. Maecenas a nisi pretium, tincidunt eros at, cursus nibh.`;

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
