import React from 'react';

import PropTypes from 'prop-types';

import { SkeletonInput, SkeletonButton } from '@talend/design-system';

import theme from './FormSkeleton.scss';

export default function FormSkeleton({ displayMode, actions }) {
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

FormSkeleton.propTypes = {
	displayMode: PropTypes.string,
	actions: PropTypes.array,
};
