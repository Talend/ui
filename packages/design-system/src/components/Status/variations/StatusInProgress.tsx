import React from 'react';
import i18n from 'i18next';
import StatusPrimitive, { StatusProps } from '../Primitive/StatusPrimitive';

export type StatusInProgressProps = Omit<StatusProps, 'icon' | 'variant' | 'inProgress'>;

const StatusInProgress = React.forwardRef(
	(props: StatusInProgressProps, ref: React.Ref<HTMLSpanElement>) => {
		return (
			<StatusPrimitive inProgress variant="inProgress" {...props} ref={ref}>
				{props.children || i18n.t('design-system:IN_PROGRESS', 'In progress')}
			</StatusPrimitive>
		);
	},
);

StatusInProgress.displayName = 'StatusInProgress';
export default StatusInProgress;
