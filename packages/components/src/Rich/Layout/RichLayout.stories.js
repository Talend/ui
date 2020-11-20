import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import { Actions, Action } from '../../Actions';
import ActionBar from '../../ActionBar';
import CircularProgress from '../../CircularProgress';
import HeaderTitle from '../HeaderTitle';
import RichError from '../Error';
import RichLayout from './RichLayout.component';
import { Pipeline, pipelines, FilteredResourceList } from '../../ResourceList/ResourceList.stories';

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

const header = (
	<React.Fragment>
		<HeaderTitle title="Pipelines" />
		<Action {...addInfo} />
	</React.Fragment>
);
const headerWithActions = [
	<HeaderTitle title="Pipelines" />,
	<Actions
		actions={[
			{
				label: 'Add',
				className: 'btn-default btn-inverse',
				onClick: action('footer.add.onClick'),
			},
			{
				label: 'Valid',
				className: 'btn-default btn-inverse',
				onClick: action('footer.valid.onClick'),
			},
		]}
	/>,
];

const footer = (
	<ActionBar
		actions={{
			left: [
				{
					label: 'Cancel',
					className: 'btn-default btn-inverse',
					onClick: action('footer.cancel.onClick'),
				},
			],
			right: [
				{
					displayMode: ActionBar.DISPLAY_MODES.BTN_GROUP,
					actions: [
						{
							label: 'Add',
							className: 'btn-default btn-inverse',
							onClick: action('footer.add.onClick'),
						},
						{
							label: 'Valid',
							className: 'btn-default btn-inverse',
							onClick: action('footer.valid.onClick'),
						},
					],
				},
			],
		}}
	/>
);

const customBody = <div>my custom body rich tolltip</div>;

storiesOf('Layout/RichLayout', module)
	.addDecorator(story => <div className="col-lg-offset-2 col-lg-8">{story()}</div>)
	.add('default', () => (
		<div>
			<Action
				id="default"
				overlayId="default-overlay"
				overlayComponent={
					<RichLayout id="richlayout" Header={header} text={shortLoreum} Footer={footer} />
				}
				overlayPlacement="bottom"
				tooltipPlacement="right"
				{...myAction}
			/>
		</div>
	))
	.add('default with actions', () => (
		<div>
			<Action
				id="default"
				overlayId="default-overlay"
				overlayComponent={
					<RichLayout
						id="richlayout"
						Header={headerWithActions}
						text={shortLoreum}
						Footer={footer}
					/>
				}
				overlayPlacement="bottom"
				tooltipPlacement="right"
				{...myAction}
			/>
		</div>
	))
	.add('only with header', () => (
		<div>
			<Action
				id="default"
				overlayId="default-overlay"
				overlayComponent={<RichLayout id="richlayout" Header={header} />}
				overlayPlacement="bottom"
				tooltipPlacement="right"
				{...myAction}
			/>
		</div>
	))
	.add('in loading state', () => (
		<div>
			<Action
				id="loading"
				overlayId="loading-overlay"
				overlayComponent={<RichLayout id="richlayout" Content={<CircularProgress />} />}
				overlayPlacement="bottom"
				tooltipPlacement="right"
				{...myAction}
			/>
		</div>
	))
	.add('with error message', () => (
		<div>
			<Action
				id="error"
				overlayId="error-overlay"
				overlayComponent={
					<RichLayout id="richlayout" Content={<RichError title="Whoops!" error="One error." />} />
				}
				overlayPlacement="bottom"
				tooltipPlacement="right"
				{...myAction}
			/>
		</div>
	))
	.add('body', () => (
		<div>
			<p>with a short text</p>
			<Action
				id="short-text"
				overlayId="short-text-overlay"
				overlayComponent={<RichLayout id="richlayout" text={shortLoreum} />}
				overlayPlacement="bottom"
				tooltipPlacement="right"
				{...myAction}
			/>
			<p>with a long text</p>
			<Action
				id="body-long-text"
				overlayId="body-long-text-overlay"
				overlayComponent={<RichLayout id="richlayout" text={LongLoreum} />}
				overlayPlacement="bottom"
				tooltipPlacement="right"
				{...myAction}
			/>
		</div>
	))
	.add('custom body', () => (
		<div>
			<Action
				id="custom-body"
				overlayId="custom-body-overlay"
				overlayComponent={
					<RichLayout id="richlayout" Header={header} Content={customBody} Footer={footer} />
				}
				overlayPlacement="bottom"
				tooltipPlacement="right"
				{...myAction}
			/>
		</div>
	))
	.add('loading resource list', () => (
		<div>
			<Action
				id="custom-body"
				overlayId="custom-body-overlay"
				overlayComponent={
					<RichLayout
						id="richlayout"
						Header={header}
						Content={<FilteredResourceList isLoading />}
					/>
				}
				overlayPlacement="bottom"
				tooltipPlacement="right"
				{...myAction}
			/>
		</div>
	))
	.add('resource list', () => (
		<div>
			<Action
				id="custom-body"
				overlayId="custom-body-overlay"
				overlayComponent={
					<RichLayout
						id="richlayout"
						Header={header}
						Content={<FilteredResourceList collection={pipelines} renderAs={Pipeline} />}
					/>
				}
				overlayPlacement="bottom"
				tooltipPlacement="right"
				{...myAction}
			/>
		</div>
	));
