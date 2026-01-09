import { action } from '@storybook/addon-actions';
import Immutable from 'immutable';

import FilterBar from '../../FilterBar';
import Action from '../Action';
import ActionDropdown from './ActionDropdown.component';

const myAction = {
	id: 'context-dropdown-related-items',
	label: 'related items',
	icon: 'talend-file-xls-o',
	items: [
		{
			id: 'context-dropdown-item-document-1',
			icon: 'talend-file-json-o',
			label: 'document 1',
			'data-feature': 'actiondropdown.items',
			onClick: action('document 1 click'),
		},
		{
			icon: 'src-data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAxNiAxNiI+CiAgPGc+CiAgICA8cGF0aCBjbGFzcz0idGktYmFja2dyb3VuZCIgIGZpbGw9IiNGRjZFNzAiIGQ9Ik0xNiw4IEMxNiwxMi40MTg4NzM3IDEyLjQxODI2NDgsMTYuMDAwNjA4OCA4LDE2LjAwMDYwODggQzMuNTgxNzM1MTYsMTYuMDAwNjA4OCAwLDEyLjQxODg3MzcgMCw4IEMwLDMuNTgxNzM1MTYgMy41ODE3MzUxNiw1LjM0OTk2ODgzZS0xNCA4LDUuMzQ5OTY4ODNlLTE0IEMxMi40MTgyNjQ4LDUuMzQ5OTY4ODNlLTE0IDE2LDMuNTgxNzM1MTYgMTYsOCIvPgogICAgPHBhdGggY2xhc3M9InRpLWZvcmVncm91bmQiIGZpbGw9IiNGRkYiIGQ9Ik0xMC4xNzgwMTY4LDExLjQzMTYwMzQgQzEwLjE1MTM5NSwxMS4zNTQxNTggMTAuMTEzODgyNCwxMS4yODIxNTggMTAuMDY0ODczOSwxMS4yMTYyMDg0IEMxMC4wMTY0NzA2LDExLjE0OTY1MzggOS45Nzg5NTc5OCwxMS4xMjMwMzE5IDkuOTUyMzM2MTMsMTEuMTM2MzQyOSBDOS43ODQxMzQ0NSwxMS4yMTk4Mzg3IDkuNjAwMjAxNjgsMTEuMjkxMjMzNiA5LjQwMTE0Mjg2LDExLjM0ODcxMjYgQzkuMjAyMDg0MDMsMTEuNDA2MTkxNiA5LjAyOTA0MjAyLDExLjQzNTIzMzYgOC44ODMyMjY4OSwxMS40MzUyMzM2IEM4LjcxOTI2MDUsMTEuNDM1MjMzNiA4LjU5NDAxNjgxLDExLjM5NzcyMSA4LjUwODEwMDg0LDExLjMyNTcyMSBDOC40MjE1Nzk4MywxMS4yNTI1MTA5IDguMzU5ODY1NTUsMTEuMTE2OTgxNSA4LjMyMjM1Mjk0LDEwLjkyMDM0MjkgQzguMjg0MjM1MjksMTAuNzIzNzA0MiA4LjI2NTQ3ODk5LDEwLjQzNjMwOTIgOC4yNjU0Nzg5OSwxMC4wNTk5NzMxIEw4LjI2NTQ3ODk5LDYuMjQyNzYzMDMgTDkuNjkzMzc4MTUsNi4yNDI3NjMwMyBDOS43NDE3ODE1MSw2LjI0Mjc2MzAzIDkuNzg3MTU5NjYsNi4xOTYxNzQ3OSA5LjgyOTUxMjYxLDYuMTAyMzkzMjggQzkuODcxMjYwNSw2LjAxMDQyNjg5IDkuODkyNDM2OTcsNS44OTU0Njg5MSA5Ljg5MjQzNjk3LDUuNzU4MTI0MzcgQzkuODkyNDM2OTcsNS43MDAwNDAzNCA5Ljg3NzkxNTk3LDUuNjQ4NjExNzYgOS44NDg4NzM5NSw1LjYwNTA0ODc0IEM5LjgyMDQzNjk3LDUuNTYwODgwNjcgOS43ODE3MTQyOSw1LjUzNjY3ODk5IDkuNzMzMzEwOTIsNS41MzI0NDM3IEw4LjI2NTQ3ODk5LDUuNTMyNDQzNyBMOC4yNjU0Nzg5OSwzLjY3OTIgQzguMjY1NDc4OTksMy42MDIzNTk2NiA4LjIxNDY1NTQ2LDMuNTQ3OTA1ODggOC4xMjQ1MDQyLDMuNTEwOTk4MzIgQzcuOTU4MTE3NjUsMy40NTg5NjQ3MSA3Ljg2MDcwNTg4LDMuNjM5ODcyMjcgNy44NjA3MDU4OCwzLjYzOTg3MjI3IEM3LjQxNDE4NDg3LDQuNjcyMDczOTUgNi41Mzc0Nzg5OSw1LjQ2ODkxNDI5IDUuNDUzMjQzNyw1LjgwODM0Mjg2IEM1LjQ1MzI0MzcsNS44MDgzNDI4NiA1LjIzMTc5ODMyLDUuODYwOTgxNTEgNS4yODg2NzIyNyw2LjA5MjcxMjYxIEM1LjI5NTMyNzczLDYuMTEyNjc4OTkgNS4zMDEzNzgxNSw2LjEzMjY0NTM4IDUuMzExMDU4ODIsNi4xNTI2MTE3NiBDNS4zNDE5MTU5Nyw2LjIxNzM1MTI2IDUuMzc5NDI4NTcsNi4yNTA2Mjg1NyA1LjQyMzU5NjY0LDYuMjU2MDczOTUgTDYuMTMzOTE1OTcsNi4yNTYwNzM5NSBMNi4xMzM5MTU5NywxMC42NTE3MDQyIEM2LjEzMzkxNTk3LDExLjI3NTUwMjUgNi4zMjMyOTQxMiwxMS43MTE3Mzc4IDYuNzAyMDUwNDIsMTEuOTU5ODA1IEM3LjA4MDIwMTY4LDEyLjIwNzI2NzIgNy41ODg0MzY5NywxMi4zMzA2OTU4IDguMjI1NTQ2MjIsMTIuMzMwNjk1OCBDOC40MjUyMTAwOCwxMi4zMzA2OTU4IDguNjU2MzM2MTMsMTIuMjkzNzg4MiA4LjkxOTUyOTQxLDEyLjIxODc2MyBDOS4xODI3MjI2OSwxMi4xNDMxMzI4IDkuNDMwNzg5OTIsMTIuMDQ2OTMxMSA5LjY2MzEyNjA1LDExLjkyOTU1MjkgQzkuODk2MDY3MjMsMTEuODEyNzc5OCAxMC4wNjcyOTQxLDExLjY5NDE5MTYgMTAuMTc4MDE2OCwxMS41NzM3ODgyIEMxMC4yMDQ2Mzg3LDExLjU1Njg0NzEgMTAuMjA0NjM4NywxMS41MDkwNDg3IDEwLjE3ODAxNjgsMTEuNDMxNjAzNCIvPgogIDwvZz4KPC9zdmc+Cg==',
			label: 'Button with icon as image',
			onClick: action('Button with icon clicked'),
			type: 'button',
		},
		{
			divider: true,
		},
		{
			id: 'context-dropdown-item-document-2',
			label: 'document 2',
			'data-feature': 'actiondropdown.items',
			onClick: action('document 2 click'),
		},
	],
};

const loadingAdditionalContent = {
	id: 'context-dropdown-related-items',
	label: 'related items',
	loading: true,
	icon: 'talend-file-xls-o',
	items: [],
};

const contentAndLoadingAdditionalContent = {
	...loadingAdditionalContent,
	items: [
		{
			id: 'context-dropdown-item-document-1',
			icon: 'talend-file-json-o',
			label: 'document 1',
			'data-feature': 'actiondropdown.items',
			onClick: action('document 1 click'),
		},
		{
			divider: true,
		},
	],
};

const withImmutable = {
	id: 'context-dropdown-related-items',
	label: 'related immutable items',
	items: Immutable.fromJS([
		{
			id: 'context-dropdown-item-document-1',
			icon: 'talend-file-json-o',
			label: 'document 1',
			'data-feature': 'actiondropdown.items',
			onClick: action('document 1 click'),
		},
		{
			divider: true,
		},
		{
			id: 'context-dropdown-item-document-2',
			label: 'document 2',
			'data-feature': 'actiondropdown.items',
			onClick: action('document 2 click'),
		},
	]),
};

const openWithImmutable = { ...withImmutable, open: true };

const withComponents = {
	id: 'context-dropdown-custom-items',
	label: 'custom items',
	icon: 'talend-file-xls-o',
	getComponent: key => {
		if (key === 'Action') {
			return Action;
		} else if (key === 'FilterBar') {
			return FilterBar;
		}
		throw new Error('Component not found');
	},
	components: {
		itemsDropdown: [
			{
				component: 'Action',
				label: 'First item',
				'data-feature': 'actiondropdown.items',
			},
			{
				divider: true,
			},
			{
				component: 'FilterBar',
				label: 'Second item',
				'data-feature': 'actiondropdown.items',
				onFilter: action('onFilter'),
			},
		],
	},
};

const mixItemsComponents = {
	id: 'context-dropdown-mix-items',
	label: 'mix items',
	getComponent: key => {
		if (key === 'Action') {
			return Action;
		}
		throw new Error('Component not found');
	},
	items: [
		{
			id: 'context-dropdown-item-document-1',
			icon: 'talend-file-json-o',
			label: 'document 1',
			'data-feature': 'actiondropdown.items',
			onClick: action('document 1 click'),
		},
		{
			divider: true,
		},
		{
			id: 'context-dropdown-item-document-2',
			label: 'document 2',
			'data-feature': 'actiondropdown.items',
			onClick: action('document 2 click'),
		},
	],
	components: {
		itemsDropdown: [
			{
				component: 'Action',
				label: 'Third item',
				'data-feature': 'actiondropdown.items',
			},
			{
				divider: true,
			},
			{
				component: 'Action',
				label: 'Fourth item',
				'data-feature': 'actiondropdown.items',
			},
		],
	},
};

const propsTooltip = {
	id: 'context-dropdown-tooltip-items',
	tooltipLabel: 'my tooltip',
	label: 'Tooltip',
	items: [
		{
			id: 'context-dropdown-item-document-1',
			icon: 'talend-file-json-o',
			label: 'document 1',
			'data-feature': 'actiondropdown.items',
			onClick: action('document 1 click'),
		},
		{
			divider: true,
		},
		{
			id: 'context-dropdown-item-document-2',
			label: 'document 2',
			'data-feature': 'actiondropdown.items',
			onClick: action('document 2 click'),
		},
	],
};

const oneEventAction = {
	id: 'context-dropdown-events',
	label: 'Dropdown',
	items: [
		{ id: 'item-1', label: 'Item 1', 'data-feature': 'actiondropdown.items' },
		{
			id: 'item-2',
			label: 'Item 2',
			'data-feature': 'actiondropdown.items',
		},
	],
	onSelect: action('onItemSelect'),
};

export default {
	title: 'Components/Actions/Dropdown',
};

export const Default = () => (
	<div>
		<h3>By default :</h3>
		<div id="default">
			<ActionDropdown {...myAction} />
		</div>
		<h3>With one event handler:</h3>
		<div id="oneEvent">
			<ActionDropdown {...oneEventAction} />
		</div>
		<h3>With hideLabel option</h3>
		<div id="hidelabel">
			<ActionDropdown {...myAction} hideLabel />
		</div>
		<h3>With ellipsis option</h3>
		<div id="ellipsis">
			<ActionDropdown {...myAction} ellipsis />
		</div>
		<h3>Empty option</h3>
		<div id="empty">
			<ActionDropdown {...myAction} items={[]} hideLabel />
		</div>
		<h3>Dropup</h3>
		<div id="dropup">
			<ActionDropdown {...myAction} dropup />
		</div>
		<h3>Automatic Dropup : this is contained in a restricted ".tc-dropdown-container" element.</h3>
		<div
			id="auto-dropup"
			className="tc-dropdown-container"
			style={{ border: '1px solid black', overflow: 'scroll', height: '300px' }}
		>
			Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
			<br />
			ut labore et dolore magna aliqua.
			<br />
			Ut enim ad minim veniam, quis nostrud exercitation ullamco la
			<br />
			Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
			<br />
			ut labore et dolore magna aliqua.
			<br />
			Ut enim ad minim veniam, quis nostrud exercitation ullamco la
			<br />
			<br />
			<br />
			<br />
			<p>Scroll me to set overflow on top or down of the container, then open the dropdown.</p>
			<ActionDropdown {...myAction} />
			<br />
			<br />
			<br />
			Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor <br />
			ut labore et dolore magna aliqua.
			<br />
			Ut enim ad minim veniam, quis nostrud exercitation ullamco la Lorem ipsum dolor sit amet,
			consectetur adipiscing elit, sed do eiusmod tempor <br />
			ut labore et dolore magna aliqua.
			<br />
			Ut enim ad minim veniam, quis nostrud exercitation ullamco la
		</div>
		<h3>Type link</h3>
		<div id="typeLink">
			<ActionDropdown {...myAction} link />
		</div>
		<h3>Components Items</h3>
		<div id="withComponents">
			<ActionDropdown {...withComponents} />
		</div>
		<h3>Mix Items</h3>
		<div id="mixComponents">
			<ActionDropdown {...mixItemsComponents} />
		</div>
		<h3>Tool tip</h3>
		<div id="toolTip">
			<ActionDropdown {...propsTooltip} />
		</div>
		<h3>With immutable items :</h3>
		<div id="default">
			<ActionDropdown {...withImmutable} />
		</div>
		<h3>Loading additional content</h3>
		<div id="loadingAdditionalContent">
			<ActionDropdown {...loadingAdditionalContent} />
		</div>
		<h3>Content and loading additional content</h3>
		<div id="contentAndLoadingAdditionalContent">
			<ActionDropdown {...contentAndLoadingAdditionalContent} />
		</div>
		<h3>Opened and with immutable items :</h3>
		<div id="openImmutable">
			<ActionDropdown {...openWithImmutable} />
		</div>
	</div>
);
