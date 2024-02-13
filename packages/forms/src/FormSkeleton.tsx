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
	const buttonsSkeleton = (
		<StackItem align="end">
			<SkeletonButton />
		</StackItem>
	);
	const buttons = anchorButtonsToFooter ? (
		<div data-drawer-absolute-footer-buttons className={theme['drawer-absolute-footer-buttons']}>
			{buttonsSkeleton}
		</div>
	) : (
		buttonsSkeleton
	);
	return (
		<StackVertical
			gap="S"
			align="stretch"
			data-testid="form.skeleton"
			data-test="form.skeleton"
			aria-busy
		>
			<SkeletonInput />
			<SkeletonInput />
			<SkeletonInput />
			<SkeletonInput />
			{hasButtons && buttons}
		</StackVertical>
	);
}
