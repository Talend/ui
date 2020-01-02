import React from 'react';
import classNames from 'classnames';
import Skeleton from '@talend/react-components/lib/Skeleton';
import theme from './FormSkeleton.scss';

export default function FormSkeleton() {
	return (
		<div className={classNames(theme.container, 'tc-skeleton-heartbeat')} aria-busy>
			<div className={theme['form-content']}>
				<Skeleton heartbeat={false} type={Skeleton.TYPES.text} size={Skeleton.SIZES.large} />
				<Skeleton heartbeat={false} type={Skeleton.TYPES.text} className="skeleton-fit-content" />
				<Skeleton heartbeat={false} type={Skeleton.TYPES.text} size={Skeleton.SIZES.large} />
				<Skeleton heartbeat={false} type={Skeleton.TYPES.text} className="skeleton-fit-content" />
				<Skeleton heartbeat={false} type={Skeleton.TYPES.text} size={Skeleton.SIZES.large} />
				<Skeleton heartbeat={false} type={Skeleton.TYPES.text} className="skeleton-fit-content" />
				<Skeleton heartbeat={false} type={Skeleton.TYPES.text} size={Skeleton.SIZES.large} />
				<Skeleton heartbeat={false} type={Skeleton.TYPES.text} className="skeleton-fit-content" />
			</div>
			<div className={theme['form-actions']}>
				<Skeleton heartbeat={false} type={Skeleton.TYPES.button} />
				<Skeleton heartbeat={false} type={Skeleton.TYPES.button} />
			</div>
		</div>
	);
}
