import { forwardRef, ReactChild, Ref } from 'react';

import classnames from 'classnames';

import tokens from '@talend/design-tokens';

import { ButtonIcon } from '../../ButtonIcon';
import { Divider } from '../../Divider';
import { SizedIcon } from '../../Icon';
import { StackHorizontal } from '../../Stack';
import { Status } from '../../Status';
import { variants } from '../../Status/Primitive/StatusPrimitive';
import { PanelHeaderAction } from './types';

import styles from './CollapsiblePanelHeader.module.scss';

export type CollapsiblePanelHeaderPropsType = {
	controlId: string;
	sectionId: string;
	size?: 'S' | 'M';
	expanded: boolean;
	title?: ReactChild;
	status?: keyof typeof variants;
	metadata?: ReactChild[];
	action?: PanelHeaderAction | PanelHeaderAction[];
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
			status,
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
					<Divider orientation="vertical" key={index} />
				</>
			);
		});

		const iconSize = size === 'S' ? 'S' : 'M';
		const buttonIconSize = size === 'S' ? 'XS' : 'S';

		const actions = Array.isArray(action) ? action : [action];

		const getChevron = () => {
			if (action) {
				return (
					<ButtonIcon
						id={controlId}
						aria-label="Toggle"
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

				{status ? (
					<Status variant={status} />
				) : (
					<span
						className={classnames(styles.headerTitle, {
							[styles['headerTitle__size-s']]: size === 'S',
							[styles.headerTitle__disabled]: disabled,
						})}
					>
						{title}
					</span>
				)}
				{metadata?.length && (
					<StackHorizontal gap="S" align="center" justify="end">
						{listMetadata}
					</StackHorizontal>
				)}
				{action &&
					!disabled &&
					actions.map(
						(actionItem, index) =>
							actionItem && (
								<ButtonIcon
									key={`action-${index}`}
									size={buttonIconSize}
									data-test={`action.button.${index}`}
									data-testid={`action.button.${index}`}
									data-feature={actionItem.dataFeature}
									{...actionItem}
									onClick={e => {
										actionItem.onClick?.(e);
										actionItem.callback();
									}}
								>
									{actionItem.tooltip}
								</ButtonIcon>
							),
					)}
			</>
		);

		if (action) {
			return (
				<div
					className={classnames(styles.headerWrapper, {
						[styles['headerWrapper__size-s']]: size === 'S',
					})}
					data-test="panel.header"
					data-testid="panel.header"
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
				data-test="panel.header"
				data-testid="panel.header"
				type="button"
			>
				{getContent()}
			</button>
		);
	},
);

CollapsiblePanelHeader.displayName = 'CollapsiblePanelHeader';

export default CollapsiblePanelHeader;
