import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { checkA11y } from '@storybook/addon-a11y';

import {
	Action,
	ActionBar,
	IconsProvider,
	CircularProgress,
	RichError,
	HeaderTitle,
	RichTooltip,
} from '../src/index';

const myAction = {
	label: 'Click me to show the tooltip',
	icon: 'talend-dataprep',
	'data-feature': 'action',
	onClick: action('You clicked me'),
};

const shortLoreum = 'Lorem ipsum';
const LongLoreum =
	'Vestibulum sit amet urna dui. Pellentesque sapien dui, elementum tristique auctor varius, ornare ut magna. Vestibulum lobortis ultrices efficitur. Quisque eget urna sodales, maximus lorem vel, egestas dolor. Donec elementum nec elit vel euismod. Pellentesque ac ligula eu mauris suscipit lobortis ac sed nibh. In imperdiet condimentum sagittis. Sed lacus eros, varius ut viverra ultrices, auctor non mauris. Fusce cursus, augue nec imperdiet cursus, nibh nulla sollicitudin nunc, vel ornare urna libero eget quam. Suspendisse sed sagittis urna, ultrices pellentesque neque. Sed tempus enim eu velit egestas, a varius quam maximus. Suspendisse et feugiat felis. Fusce pulvinar cursus turpis vitae euismod. In et enim ac neque elementum maximus. Pellentesque vulputate finibus massa, sollicitudin interdum turpis porttitor et. Phasellus dolor risus, vehicula id gravida sit amet, maximus nec lacus.';

const addInfo = {
	id: 'add',
	label: 'Add',
	bsStyle: 'info',
	onClick: action('header.add.onClick'),
};

const header = [<HeaderTitle title="Pipelines" />, <Action {...addInfo} />];

const footer = (
	<ActionBar
		actions={{
			left: [
				{
					label: 'Cancel',
					bsStyle: 'default btn-inverse',
					onClick: action('footer.cancel.onClick'),
				},
			],
			right: [
				{
					displayMode: ActionBar.DISPLAY_MODES.BTN_GROUP,
					actions: [
						{
							label: 'Add',
							bsStyle: 'default btn-inverse',
							onClick: action('footer.add.onClick'),
						},
						{
							label: 'Valid',
							bsStyle: 'default btn-inverse',
							onClick: action('footer.valid.onClick'),
						},
					],
				},
			],
		}}
	/>
);

const customBody = <div>my custom body rich tolltip</div>;

storiesOf('RichTooltip', module)
	.addDecorator(checkA11y)
	.addDecorator(story => (
		<div className="col-lg-offset-2 col-lg-8">
			<IconsProvider />
			{story()}
		</div>
	))
	.addWithInfo('default', () => (
		<div>
			<Action
				id="default"
				overlayComponent={<RichTooltip Header={header} text={shortLoreum} Footer={footer} />}
				overlayPlacement="bottom"
				tooltipPlacement="right"
				{...myAction}
			/>
		</div>
	))
	.addWithInfo('in loading state', () => (
		<div>
			<Action
				id="loading"
				overlayComponent={<RichTooltip Content={<CircularProgress />} />}
				overlayPlacement="bottom"
				tooltipPlacement="right"
				{...myAction}
			/>
		</div>
	))
	.addWithInfo('with error message', () => (
		<div>
			<Action
				id="error"
				overlayComponent={
					<RichTooltip Content={<RichError title="Whoops!" error="One error." />} />
				}
				overlayPlacement="bottom"
				tooltipPlacement="right"
				{...myAction}
			/>
		</div>
	))
	.addWithInfo('body', () => (
		<div>
			<p>with a short text</p>
			<Action
				id="short-text"
				overlayComponent={<RichTooltip text={shortLoreum} />}
				overlayPlacement="bottom"
				tooltipPlacement="right"
				{...myAction}
			/>
			<p>with a long text</p>
			<Action
				id="body-long-text"
				overlayComponent={<RichTooltip text={LongLoreum} />}
				overlayPlacement="bottom"
				tooltipPlacement="right"
				{...myAction}
			/>
		</div>
	))
	.addWithInfo('custom body', () => (
		<div>
			<Action
				id="custom-body"
				overlayComponent={<RichTooltip Header={header} Content={customBody} Footer={footer} />}
				overlayPlacement="bottom"
				tooltipPlacement="right"
				{...myAction}
			/>
		</div>
	));
