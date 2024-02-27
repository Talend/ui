import { forwardRef, HTMLAttributes, ReactChild, Ref, useEffect, useState } from 'react';

import classNames from 'classnames';

import { DataAttributes } from '../../../types';
import { useId } from '../../../useId';
import { variants } from '../../Status/Primitive/StatusPrimitive';
import CollapsiblePanelHeader from './CollapsiblePanelHeader';
import { PanelHeaderAction } from './types';

import styles from './CollapsiblePanel.module.scss';

type CollapsiblePanelCommonPropsType = {
	children: ReactChild;
	managed?: boolean;
	expanded?: boolean;
	index?: number;
	actions?: PanelHeaderAction[];
	size?: 'S' | 'M';
	metadata?: ReactChild[];
	isFirst?: boolean;
	isLast?: boolean;
	disabled?: boolean;
	onToggleExpanded?: (index: number) => void;
} & Omit<HTMLAttributes<HTMLDivElement>, 'className' | 'style'> &
	DataAttributes;

type CollapsiblePanelWithTitlePropsType = {
	title: ReactChild;
	status?: never;
};

type CollapsiblePanelWithStatusPropsType = {
	title?: never;
	status: keyof typeof variants;
};

export type CollapsiblePanelProps = CollapsiblePanelCommonPropsType &
	(CollapsiblePanelWithTitlePropsType | CollapsiblePanelWithStatusPropsType);

export const CollapsiblePanel = forwardRef(
	(
		{
			id,
			children,
			managed,
			expanded,
			index,
			onToggleExpanded,
			title,
			status,
			actions,
			size,
			metadata,
			isFirst = false,
			isLast = false,
			disabled = false,
			...rest
		}: CollapsiblePanelProps,
		ref: Ref<HTMLButtonElement>,
	) => {
		const [localExpanded, setLocalExpanded] = useState(!!expanded);

		const componentId = useId(id);
		const controlId = `CollapsiblePanel__control--${componentId}`;
		const sectionId = `CollapsiblePanel__content--${componentId}`;

		useEffect(() => {
			if (managed && expanded !== localExpanded) {
				setLocalExpanded(!!expanded);
			}
		}, [expanded, managed, localExpanded]);

		function handleToggleExpanded() {
			if (onToggleExpanded && managed && (index || index === 0)) {
				onToggleExpanded(index);
			} else {
				setLocalExpanded(!localExpanded);
			}
		}

		return (
			<div
				className={classNames(styles.panelWrapper, {
					[styles.panelWrapper__alone]: !managed,
					[styles.panelWrapper__first]: isFirst,
					[styles.panelWrapper__last]: isLast,
					[styles.panelWrapper__notLast]: managed && !isLast,
				})}
				{...rest}
			>
				<CollapsiblePanelHeader
					controlId={controlId}
					sectionId={sectionId}
					expanded={!disabled && localExpanded}
					handleClick={handleToggleExpanded}
					title={title}
					status={status}
					actions={actions}
					metadata={metadata}
					size={size}
					disabled={disabled}
					ref={ref}
				/>
				{localExpanded && (
					<div
						id={sectionId}
						role="region"
						aria-labelledby={controlId}
						className={styles.panelContent}
						data-test="panel.section"
						data-testid="panel.section"
					>
						{children}
					</div>
				)}
			</div>
		);
	},
);

CollapsiblePanel.displayName = 'CollapsiblePanel';
