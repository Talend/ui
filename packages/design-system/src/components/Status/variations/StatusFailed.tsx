import React from 'react';
import i18n from 'i18next';
import StatusPrimitive, { StatusProps } from '../Primitive/StatusPrimitive';

export type StatusFailedProps = Omit<StatusProps, 'icon' | 'variant' | 'inProgress'>;

const StatusFailed = React.forwardRef(
	(props: StatusFailedProps, ref: React.Ref<HTMLSpanElement>) => {
		return (
			<StatusPrimitive icon="square-cross" variant="failed" {...props} ref={ref}>
				{props.children || i18n.t('design-system:FAILED', 'Failed')}
			</StatusPrimitive>
		);
	},
);

StatusFailed.displayName = 'StatusFailed';
export default StatusFailed;
