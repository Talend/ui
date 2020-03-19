import React from 'react';
import PropTypes from 'prop-types';
import Skeleton from '@talend/react-components/lib/Skeleton';
import theme from './FormSkeleton.scss';

export default function FormSkeleton({ displayMode }) {
	return (
		<div className={`${theme.container} tc-skeleton-heartbeat`} aria-busy>
			<div className={theme['form-content']}>
				<div className={theme['form-content-wrapper']}>
					<Skeleton heartbeat={false} type={Skeleton.TYPES.text} size={Skeleton.SIZES.large} />
					<Skeleton heartbeat={false} type={Skeleton.TYPES.text} className="skeleton-fit-content" />
					<Skeleton heartbeat={false} type={Skeleton.TYPES.text} size={Skeleton.SIZES.large} />
					<Skeleton heartbeat={false} type={Skeleton.TYPES.text} className="skeleton-fit-content" />
					<Skeleton heartbeat={false} type={Skeleton.TYPES.text} size={Skeleton.SIZES.large} />
					<Skeleton heartbeat={false} type={Skeleton.TYPES.text} className="skeleton-fit-content" />
					<Skeleton heartbeat={false} type={Skeleton.TYPES.text} size={Skeleton.SIZES.large} />
					<Skeleton heartbeat={false} type={Skeleton.TYPES.text} className="skeleton-fit-content" />
				</div>
			</div>
			{displayMode !== 'text' && (
				<div className={theme.submit}>
					<div className={theme['submit-wrapper']}>
						<Skeleton heartbeat={false} type={Skeleton.TYPES.button} />
						<Skeleton heartbeat={false} type={Skeleton.TYPES.button} />
					</div>
				</div>
			)}
		</div>
	);
}

FormSkeleton.propTypes = {
	displayMode: PropTypes.string,
};
