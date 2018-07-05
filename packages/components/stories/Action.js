import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { checkA11y } from '@storybook/addon-a11y';
import talendIcons from '@talend/icons/dist/react';

import { RichTooltip, Action, IconsProvider } from '../src/index';

const loreum = `2Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris vel lectus et nulla dictum tempor et vel ex. Sed ornare placerat ultrices. Maecenas facilisis vulputate enim vitae facilisis. Phasellus ut sagittis mauris. Praesent pellentesque vulputate purus ut consequat. Vestibulum eget nisi et velit pulvinar accumsan eu et quam. Quisque vulputate, velit nec sollicitudin efficitur, justo ex consequat eros, et ornare felis odio at felis. Aenean tempor justo sit amet quam dictum, ac pretium diam lacinia. Quisque eget mollis metus. Aenean semper condimentum ante vitae pretium. Nam mattis et neque in porta.

Duis fringilla ut tellus in mollis. Praesent bibendum neque nibh, id cursus sapien hendrerit in. Vestibulum nec neque non nisl laoreet mattis ut sit amet ipsum. Proin ac ultrices nisi. Integer aliquam magna nec nunc varius dictum. Suspendisse sem massa, pulvinar a convallis in, egestas quis mi. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi nunc ligula, elementum quis felis sit amet, tristique commodo massa. Donec blandit leo ac odio eleifend accumsan at sed leo. Nunc a erat nec ex aliquet interdum sit amet sed arcu. Nunc elementum accumsan arcu nec euismod. Donec lectus elit, porta non urna vitae, condimentum ultrices leo. Nulla facilisi. Phasellus massa eros, pellentesque ac nisl non, ornare mattis massa.

Vivamus fermentum nisl nec justo feugiat, eu cursus felis rutrum. Nullam luctus sem quis enim molestie tempor. Vivamus ultricies finibus urna, ac fringilla ex cursus vel. Sed eget commodo tellus. Vivamus vitae dignissim purus, vitae molestie risus. Mauris velit massa, varius ut ex ac, sodales cursus arcu. Donec justo leo, placerat vel volutpat at, porta non magna. Aliquam commodo tincidunt erat, sit amet finibus lorem lobortis ut. Donec vitae finibus arcu. Ut a elit ut quam accumsan sodales. In fringilla rutrum luctus.

Nunc condimentum fringilla erat at gravida. Praesent mattis gravida maximus. Fusce malesuada posuere vestibulum. Vestibulum pulvinar est tristique, euismod quam ac, malesuada justo. Mauris posuere gravida nisi, ultricies imperdiet enim. Aenean rhoncus convallis vehicula. Sed nunc tellus, tristique vitae rhoncus quis, aliquet non neque. Nunc feugiat, eros vitae finibus aliquet, purus ex condimentum neque, sit amet varius neque nulla non nibh. Cras non porttitor orci.

Vivamus lobortis magna a sem efficitur faucibus. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Aenean vel semper eros. Cras sed mollis ligula. Mauris sed dictum enim. Proin sagittis diam sem, sed aliquam massa iaculis ut. Donec scelerisque purus mauris, in venenatis nisl vestibulum sit amet.`;

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

const RichTooltipBodyList = (
	<RichTooltip.BodyList
		tabs={tabs}
		filter={{
			autoFocus: true,
			docked: false,
			iconAlwaysVisible: true,
			dockable: false,
			navbar: false,
			onFilter: action('bodyList.onFilter'),
			placeholder: 'Search',
			highlight: false,
		}}
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
						Header={RichTooltipHeader}
						Content={<RichTooltip.Body content={loreum} />}
						Footer={RichTooltipFooter}
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
						Header={RichTooltipHeader}
						Content={<RichTooltip.Body content={loreum} />}
						Footer={RichTooltipFooter}
					/>
				}
				hideLabel
			/>
			<p>Action with advanced tooltip BodyList</p>
			<Action
				id="hidelabel"
				overlayPlacement="top"
				tooltipPlacement="right"
				{...mouseDownAction}
				overlayComponent={
					<RichTooltip
						Header={RichTooltipHeader}
						Content={<RichTooltip.BodyList items={items} />}
						Footer={RichTooltipFooter}
					/>
				}
				hideLabel
			/>
			<p>Action with advanced tooltip BodyListTabFilter 2</p>
			<Action
				id="hidelabel"
				overlayPlacement="top"
				tooltipPlacement="right"
				{...mouseDownAction}
				overlayComponent={
					<RichTooltip
						Header={RichTooltipHeader}
						Content={RichTooltipBodyList}
						Footer={RichTooltipFooter}
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
