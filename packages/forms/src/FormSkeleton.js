import React from 'react';
import { Skeleton } from '@talend/react-components';
import theme from './FormSkeleton.scss';

export default function FormSkeleton() {
	return (
		<div className={theme.container} aria-busy>
			<div className={theme['form-content']}>
				<Skeleton type={Skeleton.TYPES.text} size={Skeleton.SIZES.large} />
				<Skeleton type={Skeleton.TYPES.text} size={400} />
				<Skeleton type={Skeleton.TYPES.text} size={Skeleton.SIZES.large} />
				<Skeleton type={Skeleton.TYPES.text} size={400} />
				<Skeleton type={Skeleton.TYPES.text} size={Skeleton.SIZES.large} />
				<Skeleton type={Skeleton.TYPES.text} size={400} />
				<Skeleton type={Skeleton.TYPES.text} size={Skeleton.SIZES.large} />
				<Skeleton type={Skeleton.TYPES.text} size={400} />
				<Skeleton type={Skeleton.TYPES.text} size={Skeleton.SIZES.large} />
				<Skeleton type={Skeleton.TYPES.text} size={400} />
			</div>
			<div className={theme.submit}>
				<div className={theme['submit-wrapper']}>
					<Skeleton type={Skeleton.TYPES.button} />
					<Skeleton type={Skeleton.TYPES.button} />
				</div>
			</div>
		</div>
	);
}
