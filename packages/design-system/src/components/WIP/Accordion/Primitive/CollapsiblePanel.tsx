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
	onToggleExpanded?: (index: number) => void;
};

const CollapsiblePanel = forwardRef(
	(
		{
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
		}: CollapsiblePanelPropsType,
		ref: Ref<HTMLDivElement>,
	) => {
		const [localExpanded, setLocalExpanded] = useState(false);

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
					expanded={localExpanded}
					handleClick={handleToggleExpanded}
					title={title}
					action={action}
					metadata={metadata}
					size={size}
				/>
				{localExpanded && <div className={styles.panelContent}>{children}</div>}
			</div>
		);
	},
);

CollapsiblePanel.displayName = 'CollapsiblePanel';

export default CollapsiblePanel;
