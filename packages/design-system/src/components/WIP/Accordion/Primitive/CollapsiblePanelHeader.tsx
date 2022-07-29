import React, { cloneElement, forwardRef, MouseEvent, ReactElement, Ref } from 'react';
import { Clickable } from 'reakit/Clickable';
import classnames from 'classnames';
import { ButtonIcon } from '../../../ButtonIcon';
import { SizedIcon } from '../../../Icon';
import tokens from '@talend/design-tokens';

import styles from './CollapsiblePanelHeader.module.scss';

type CollapsiblePanelHeaderPropsType = {
	size?: 'S' | 'M';
	expanded: boolean;
	title: string;
	metadata?: ReactElement[];
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
				{metadata}
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
