import React, { cloneElement, forwardRef, MouseEvent, ReactChild, Ref } from 'react';
import { Clickable } from 'reakit/Clickable';
import classnames from 'classnames';
import { ButtonIcon } from '../../../ButtonIcon';
import { SizedIcon } from '../../../Icon';
import Divider from '../../../Divider';
import { StackHorizontal } from '../../../Stack';
import tokens from '@talend/design-tokens';

import styles from './CollapsiblePanelHeader.module.scss';

type CollapsiblePanelHeaderPropsType = {
	controlId: string;
	sectionId: string;
	size?: 'S' | 'M';
	expanded: boolean;
	title: string;
	metadata?: ReactChild[];
	action?: {
		icon: string;
		tooltip: string;
		callback: () => unknown;
	};
	handleClick: () => unknown;
	disabled?: boolean;
};

const CollapsiblePanelHeader = forwardRef(
	(
		{
			controlId,
			sectionId,
			expanded,
			handleClick,
			action,
			metadata,
			title,
			size,
			disabled = false,
		}: CollapsiblePanelHeaderPropsType,
		ref: Ref<HTMLButtonElement>,
	) => {
		const listMetadata = metadata?.map((item, index) => {
			if (index === metadata.length - 1 && (!action || disabled)) {
				return item;
			}

			return (
				<>
					{item}
					<Divider orientation="vertical" />
				</>
			);
		});

		const iconSize = size === 'S' ? 'S' : 'M';
		const buttonIconSize = size === 'S' ? 'XS' : 'S';

		const getChevron = () => {
			if (action) {
				return (
					<ButtonIcon
						id={controlId}
						aria-controls={sectionId}
						aria-expanded={expanded}
						icon={expanded ? 'chevron-up' : 'chevron-down'}
						onClick={handleClick}
						size={buttonIconSize}
						ref={ref}
					>
						Toggle
					</ButtonIcon>
				);
			}

			return (
				<div className={styles.iconWrapper}>
					<SizedIcon
						color={tokens.coralColorAccentIcon}
						name={expanded ? 'chevron-up' : 'chevron-down'}
						size={iconSize}
					/>
				</div>
			);
		};

		const getContent = () => (
			<>
				{!disabled && getChevron()}

				<span
					className={classnames(styles.headerTitle, {
						[styles['headerTitle__size-s']]: size === 'S',
						[styles.headerTitle__disabled]: disabled,
					})}
				>
					{title}
				</span>
				{metadata?.length && (
					<StackHorizontal gap="S" align="center" justify="end">
						{listMetadata}
					</StackHorizontal>
				)}
				{action && !disabled && (
					<ButtonIcon
						size={buttonIconSize}
						icon={action.icon}
						onClick={action.callback}
						disabled={disabled}
					>
						Action
					</ButtonIcon>
				)}
			</>
		);

		if (action) {
			return (
				<div
					className={classnames(styles.headerWrapper, {
						[styles['headerWrapper__size-s']]: size === 'S',
					})}
				>
					{getContent()}
				</div>
			);
		}
		return (
			<button
				id={controlId}
				aria-controls={sectionId}
				aria-expanded={expanded}
				onClick={handleClick}
				className={classnames(styles.headerWrapper, {
					[styles.headerWrapper__clickable]: !disabled,
					[styles['headerWrapper__size-s']]: size === 'S',
				})}
				disabled={disabled}
				ref={ref}
			>
				{getContent()}
			</button>
		);
	},
);

CollapsiblePanelHeader.displayName = 'CollapsiblePanelHeader';

export default CollapsiblePanelHeader;
