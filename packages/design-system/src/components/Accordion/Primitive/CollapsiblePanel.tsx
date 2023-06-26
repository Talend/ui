import { forwardRef, ReactChild, Ref, useState, useEffect, HTMLAttributes } from 'react';
import classNames from 'classnames';

import { DataAttributes } from '../../../types';
import { variants } from '../../Status/Primitive/StatusPrimitive';
import { useId } from '../../../useId';

import CollapsiblePanelHeader from './CollapsiblePanelHeader';
import { PanelHeaderAction } from './types';
import styles from './CollapsiblePanel.module.scss';

type CollapsiblePanelCommonPropsType = {
	children: ReactChild;
	managed?: boolean;
	expanded?: boolean;
	index?: number;
	action?: PanelHeaderAction;
	size?: 'S' | 'M';
	metadata?: ReactChild[];
	isFirst?: boolean;
	isLast?: boolean;
	disabled?: boolean;
	onToggleExpanded?: (index: number) => void;
} & Omit<HTMLAttributes<HTMLDivElement>, 'className' | 'style'> &
	DataAttributes;

export type CollapsiblePanelWithTitlePropsType = {
	title: ReactChild;
	status?: never;
};

export type CollapsiblePanelWithStatusPropsType = {
	title?: never;
	status: keyof typeof variants;
};

export type CollapsiblePanelPropsType = CollapsiblePanelCommonPropsType &
	(CollapsiblePanelWithTitlePropsType | CollapsiblePanelWithStatusPropsType);

const CollapsiblePanel = forwardRef(
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
			action,
			size,
			metadata,
			isFirst = false,
			isLast = false,
			disabled = false,
			...rest
		}: CollapsiblePanelPropsType,
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
					action={action}
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

export default CollapsiblePanel;
