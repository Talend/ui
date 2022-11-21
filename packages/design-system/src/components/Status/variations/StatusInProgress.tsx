import React from 'react';
import { useTranslation } from 'react-i18next';
import StatusPrimitive, { StatusProps } from '../Primitive/StatusPrimitive';

export type StatusInProgressProps = Omit<StatusProps, 'icon' | 'variant' | 'inProgress'>;

const StatusInProgress = React.forwardRef(
	(props: StatusInProgressProps, ref: React.Ref<HTMLSpanElement>) => {
		const { t } = useTranslation('design-system');
		return (
			<StatusPrimitive inProgress variant="inProgress" {...props} ref={ref}>
				{props.children || t('design-system:IN_PROGRESS', 'In progress')}
			</StatusPrimitive>
		);
	},
);

StatusInProgress.displayName = 'StatusInProgress';
export default StatusInProgress;
