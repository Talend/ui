import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { checkA11y } from '@storybook/addon-a11y';
import talendIcons from '@talend/icons/dist/react';

import { Action, IconsProvider, RichTooltip } from '../src/index';

const myAction = {
	label: 'Click me',
	icon: 'talend-dataprep',
	'data-feature': 'action',
	onClick: action('You clicked me'),
};

const shortLoreum = 'Lorem ipsum';
const LongLoreum =
	'Vestibulum sit amet urna dui. Pellentesque sapien dui, elementum tristique auctor varius, ornare ut magna. Vestibulum lobortis ultrices efficitur. Quisque eget urna sodales, maximus lorem vel, egestas dolor. Donec elementum nec elit vel euismod. Pellentesque ac ligula eu mauris suscipit lobortis ac sed nibh. In imperdiet condimentum sagittis. Sed lacus eros, varius ut viverra ultrices, auctor non mauris. Fusce cursus, augue nec imperdiet cursus, nibh nulla sollicitudin nunc, vel ornare urna libero eget quam. Suspendisse sed sagittis urna, ultrices pellentesque neque. Sed tempus enim eu velit egestas, a varius quam maximus. Suspendisse et feugiat felis. Fusce pulvinar cursus turpis vitae euismod. In et enim ac neque elementum maximus. Pellentesque vulputate finibus massa, sollicitudin interdum turpis porttitor et. Phasellus dolor risus, vehicula id gravida sit amet, maximus nec lacus.';

const RichTooltipHeader = (
	<RichTooltip.Header
		title="Pipelines"
		right={[
			{
				id: 'add',
				label: 'Add',
				bsStyle: 'info',
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
				bsStyle: 'default btn-inverse',
				onClick: action('footer.add.onClick'),
			},
		]}
		right={[
			{
				label: 'Add',
				bsStyle: 'default	 btn-inverse',
				onClick: action('footer.add.onClick'),
			},
		]}
	/>
);

const RichTooltipBody = <RichTooltip.Body Content="my custom body rich tolltip" />;

const LoreumRichTooltip = (
	<RichTooltip Header={RichTooltipHeader} Content={shortLoreum} Footer={RichTooltipFooter} />
);

const CustomRichTooltipBody = (
	<RichTooltip Header={RichTooltipHeader} Content={RichTooltipBody} Footer={RichTooltipFooter} />
);

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
				id="hidelabel"
				overlayComponent={LoreumRichTooltip}
				overlayPlacement="bottom"
				tooltipPlacement="right"
				{...myAction}
				hideLabel
			/>
		</div>
	))
	.addWithInfo('in loading state', () => (
		<div>
			<Action
				id="hidelabel"
				overlayComponent={<RichTooltip Content={shortLoreum} loading />}
				overlayPlacement="bottom"
				tooltipPlacement="right"
				{...myAction}
				hideLabel
			/>
		</div>
	))
	.addWithInfo('with error message', () => (
		<div>
			<Action
				id="hidelabel"
				overlayComponent={
					<RichTooltip
						Content={shortLoreum}
						error={{
							title: 'Whooops!',
							message: 'One error',
						}}
					/>
				}
				overlayPlacement="bottom"
				tooltipPlacement="right"
				{...myAction}
				hideLabel
			/>
		</div>
	))
	.addWithInfo('body', () => (
		<div>
			<p>with a short text</p>
			<Action
				id="hidelabel"
				overlayComponent={<RichTooltip Content={shortLoreum} />}
				overlayPlacement="bottom"
				tooltipPlacement="right"
				{...myAction}
				hideLabel
			/>
			<p>with a long text</p>
			<Action
				id="hidelabel"
				overlayComponent={<RichTooltip Content={LongLoreum} />}
				overlayPlacement="bottom"
				tooltipPlacement="right"
				{...myAction}
				hideLabel
			/>
		</div>
	))
	.addWithInfo('custom body', () => (
		<div>
			<Action
				id="hidelabel"
				overlayComponent={CustomRichTooltipBody}
				overlayPlacement="bottom"
				tooltipPlacement="right"
				{...myAction}
				hideLabel
			/>
		</div>
	));
