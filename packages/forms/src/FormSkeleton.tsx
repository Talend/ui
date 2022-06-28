import React from 'react';

import { SkeletonInput, SkeletonButton } from '@talend/design-system';

import { ActionProps, DisplayMode } from './types';

import theme from './FormSkeleton.module.scss';

export interface FormSkeletonProps {
	displayMode?: DisplayMode;
	actions?: ActionProps[];
}

export default function FormSkeleton({ displayMode, actions }: FormSkeletonProps) {
	// null/undefined actions prop will display default buttons
	const hasButtons = displayMode !== 'text' && actions?.length !== 0;
	return (
		<div className={theme.container} aria-busy data-testid="form.skeleton">
			<div className={theme['form-content']} data-testid="form.skeleton.fields">
				<div className={theme['form-content-wrapper']}>
					<SkeletonInput />
					<SkeletonInput />
					<SkeletonInput />
					<SkeletonInput />
				</div>
			</div>
			{hasButtons && (
				<div className={theme.submit} data-testid="form.skeleton.buttons">
					<div className={theme['submit-wrapper']}>
						<SkeletonButton />
						<SkeletonButton />
					</div>
				</div>
			)}
		</div>
	);
}
