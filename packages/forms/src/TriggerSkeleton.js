import React from 'react';
import { Skeleton } from '@talend/react-components';
import theme from './FormSkeleton.scss';

export default function TriggerSkeleton() {
	return (
		<div className={`${theme.container} tc-skeleton-heartbeat`} aria-busy>
			<div className={theme['form-content']}>
				<Skeleton heartbeat={false} type={Skeleton.TYPES.text} size={Skeleton.SIZES.large} />
				<Skeleton heartbeat={false} type={Skeleton.TYPES.text} />
				<Skeleton heartbeat={false} type={Skeleton.TYPES.text} size={Skeleton.SIZES.large} />
				<Skeleton heartbeat={false} type={Skeleton.TYPES.text} />
			</div>
		</div>
	);
}
