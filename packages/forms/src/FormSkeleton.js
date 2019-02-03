import React from 'react';
import { Skeleton } from '@talend/react-components';
import theme from './FormSkeleton.scss';

export default function FormSkeleton() {
	return (
		<div className={`${theme.container} tc-skeleton-heartbeat`} aria-busy>
			<div className={theme['form-content']}>
				<Skeleton heartbeat={false} type={Skeleton.TYPES.text} width={600} />
				<Skeleton heartbeat={false} type={Skeleton.TYPES.text} width={200} />
				<Skeleton heartbeat={false} type={Skeleton.TYPES.text} width={600} />
				<Skeleton heartbeat={false} type={Skeleton.TYPES.text} width={200} />
				<Skeleton heartbeat={false} type={Skeleton.TYPES.text} width={600} />
				<Skeleton heartbeat={false} type={Skeleton.TYPES.text} width={200} />
				<Skeleton heartbeat={false} type={Skeleton.TYPES.text} width={600} />
				<Skeleton heartbeat={false} type={Skeleton.TYPES.text} width={200} />
			</div>
			<div className={theme.submit}>
				<div className={theme['submit-wrapper']}>
					<Skeleton heartbeat={false} type={Skeleton.TYPES.button} />
					<Skeleton heartbeat={false} type={Skeleton.TYPES.button} />
				</div>
			</div>
		</div>
	);
}
