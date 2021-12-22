import React from 'react';
import i18n from 'i18next';
import StatusPrimitive, { StatusProps } from '../Primitive/StatusPrimitive';

type StatusInProgressProps = Omit<StatusProps, 'icon' | 'variant' | 'inProgress'>;

const StatusInProgress = React.forwardRef((props: StatusInProgressProps, ref: React.Ref<any>) => {
	return (
		<StatusPrimitive inProgress variant="inProgress" {...props} ref={ref}>
			{props.children || i18n.t('IN_PROGRESS', 'In progress')}
		</StatusPrimitive>
	);
});

export default StatusInProgress;
