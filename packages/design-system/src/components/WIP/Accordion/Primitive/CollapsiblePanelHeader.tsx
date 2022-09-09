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
};

const CollapsiblePanelHeader = forwardRef(
	(
		{ expanded, handleClick, action, metadata, title, size }: CollapsiblePanelHeaderPropsType,
		ref: Ref<HTMLDivElement>,
	) => {
		const listMetadata = metadata?.map((item, index) => {
			if (index === metadata.length - 1 && !action) {
				return item;
			}

			return (
				<>
					{item}
					<Divider orientation="vertical" />
				</>
			);
		});

		const getContent = () => (
			<>
				{action ? (
					<ButtonIcon
						icon={expanded ? 'chevron-up' : 'chevron-down'}
						onClick={handleClick}
						size="S"
					>
						Toggle
					</ButtonIcon>
				) : (
					<div className={styles.iconWrapper}>
						<SizedIcon
							color={tokens.coralColorAccentIcon}
							name={expanded ? 'chevron-up' : 'chevron-down'}
							size="M"
						/>
					</div>
				)}

				<span className={styles.headerTitle}>{title}</span>
				{metadata?.length && (
					<StackHorizontal gap="S" align="center" justify="end">
						{listMetadata}
					</StackHorizontal>
				)}
				{action && (
					<ButtonIcon icon={action.icon} onClick={action.callback}>
						Action
					</ButtonIcon>
				)}
			</>
		);

		if (action) {
			return <div className={styles.headerWrapper}>{getContent()}</div>;
		}
		return (
			<Clickable
				as="div"
				onClick={handleClick}
				focusable
				className={classnames(styles.headerWrapper, styles.headerWrapper__clickable)}
			>
				{getContent()}
			</Clickable>
		);
	},
);

CollapsiblePanelHeader.displayName = 'CollapsiblePanelHeader';

export default CollapsiblePanelHeader;
