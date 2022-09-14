import React, {
	cloneElement,
	forwardRef,
	MouseEvent,
	ReactChild,
	Ref,
	useState,
	useEffect,
} from 'react';
import classNames from 'classnames';
import CollapsiblePanelHeader from './CollapsiblePanelHeader';

import styles from './CollapsiblePanel.module.scss';

type CollapsiblePanelPropsType = {
	a11yId: string;
	children: ReactChild;
	managed?: boolean;
	expanded?: boolean;
	index?: number;
	title: string;
	action?: any;
	size?: 'S' | 'M';
	metadata?: ReactChild[];
	isFirst?: boolean;
	isLast?: boolean;
	disabled?: boolean;
	onToggleExpanded?: (index: number) => void;
};

const CollapsiblePanel = forwardRef(
	(
		{
			a11yId,
			children,
			managed,
			expanded,
			index,
			onToggleExpanded,
			title,
			action,
			size,
			metadata,
			isFirst = false,
			isLast = false,
			disabled = false,
		}: CollapsiblePanelPropsType,
		ref: Ref<HTMLDivElement>,
	) => {
		const [localExpanded, setLocalExpanded] = useState(false);

		const headerId = a11yId + '_header';
		const sectionId = a11yId + '_section';

		useEffect(() => {
			if (managed && expanded != localExpanded) {
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
			>
				<CollapsiblePanelHeader
					headerId={headerId}
					sectionId={sectionId}
					expanded={disabled ? false : localExpanded}
					handleClick={handleToggleExpanded}
					title={title}
					action={action}
					metadata={metadata}
					size={size}
					disabled={disabled}
				/>
				{localExpanded && (
					<div
						id={sectionId}
						role="region"
						aria-labelledby={headerId}
						className={styles.panelContent}
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
