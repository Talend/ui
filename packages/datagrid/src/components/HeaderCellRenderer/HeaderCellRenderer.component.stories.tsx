import React, { useRef, useState } from 'react';

import { action } from '@storybook/addon-actions';

import { StackHorizontal, StackVertical } from '@talend/design-system';
import { Overlay, Popover } from '@talend/react-bootstrap';

import { HeaderComponentParams } from '../../types';
import HeaderCellRenderer, { HeaderRendererProps } from './HeaderCellRenderer.component';

const defaultArgs = {
	displayName: 'My column',
	type: 'string',
	typeLabel: 'My type',
	semanticTypeLabel: 'Semantic type',
	quality: {
		invalid: 10,
		empty: 0,
		valid: 38,
	},
};
const longContent = {
	...defaultArgs,
	displayName: 'My loooooooooooooooooooooong column',
	semanticTypeLabel: 'My loooooooooooooooooooooooooooong type',
};
const withoutQuality = {
	...defaultArgs,
	quality: undefined,
};
const menu = {
	onClick: action('onMenuClick'),
	children: 'My menu label',
};
const withDqRule = {
	...defaultArgs,
	dqRule: true,
};

export default {
	component: HeaderCellRenderer,
	title: 'Components/HeaderCellRenderer',
	args: { ...defaultArgs },
};

const Template = (props: HeaderComponentParams) => (
	<div style={{ border: '1px solid var(--coral-color-neutral-border-weak)', width: 150 }}>
		<HeaderCellRenderer
			{...(props as HeaderRendererProps)}
			column={
				{
					getColId: () => 'colId',
				} as HeaderRendererProps['column']
			}
		/>
	</div>
);

export const Default = Template.bind({});

export const WithMenus = () => {
	const [hasMenu, setHasMenu] = useState(false);
	const overlayRef = useRef<EventTarget | null>(null);
	return (
		<>
			<Template
				{...defaultArgs}
				menuProps={{
					children: 'My button label',
					onClick: (e: React.MouseEvent<HTMLButtonElement, MouseEvent> | KeyboardEvent) => {
						e.stopPropagation();
						overlayRef.current = e.currentTarget;
						setHasMenu(true);
					},
				}}
				qualityBarProps={{
					onClick: (e: React.MouseEvent) => {
						overlayRef.current = e.currentTarget;
						setHasMenu(true);
					},
				}}
			/>
			{overlayRef.current && (
				<Overlay
					onHide={(): void => {
						setHasMenu(false);
					}}
					placement="bottom"
					rootClose
					show={hasMenu}
					target={overlayRef.current}
				>
					<Popover>
						<h1>MY MENU</h1>
					</Popover>
				</Overlay>
			)}
		</>
	);
};

export const All = () => (
	<div style={{ display: 'flex', flexWrap: 'wrap', gap: 10 }}>
		{[undefined, menu].flatMap((menuProps, index) => (
			<StackVertical gap="S" key={index}>
				<h2>{menuProps ? 'With' : 'Without'} menu</h2>
				{[undefined, 'My description'].map(description => (
					<StackHorizontal gap="S" key={description}>
						<b style={{ width: 100 }}>{description ? 'With' : 'Without'} description</b>
						{[defaultArgs, longContent, withDqRule, withoutQuality].map(props => (
							<Template key={null} {...props} menuProps={menuProps} description={description} />
						))}
					</StackHorizontal>
				))}

				<StackHorizontal gap="S">
					<b style={{ width: 100 }}>Loading (from TDC/no specs)</b>
					<Template {...defaultArgs} isLoading menuProps={menuProps} />
				</StackHorizontal>

				<StackHorizontal gap="S">
					<b style={{ width: 100 }}>Semantic type draft (from TDC/no specs)</b>
					<Template {...defaultArgs} draftType="Draft type" menuProps={menuProps} />
				</StackHorizontal>
			</StackVertical>
		))}
	</div>
);
