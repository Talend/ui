import { SkeletonButton, SkeletonInput, StackItem, StackVertical } from '@talend/design-system';

import { ActionProps, DisplayMode } from './types';

import theme from './FormSkeleton.module.scss';

export interface FormSkeletonProps {
	displayMode?: DisplayMode;
	actions?: ActionProps[];
	anchorButtonsToFooter?: boolean;
}

export default function FormSkeleton({
	displayMode,
	actions,
	anchorButtonsToFooter,
}: FormSkeletonProps) {
	// null/undefined actions prop will display default buttons
	const hasButtons = displayMode !== 'text' && actions?.length !== 0;
	const buttons = anchorButtonsToFooter ? (
		<div data-drawer-absolute-footer-buttons className={theme['drawer-absolute-footer-buttons']}>
			<StackItem align="end">
				<SkeletonButton />
			</StackItem>
		</div>
	) : (
		<StackItem align="end">
			<SkeletonButton />
		</StackItem>
	);
	return (
		<StackVertical gap="S" align="stretch">
			<SkeletonInput />
			<SkeletonInput />
			<SkeletonInput />
			<SkeletonInput />
			{hasButtons && buttons}
		</StackVertical>
	);
}
