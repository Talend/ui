import React from 'react';
import { useTranslation } from 'react-i18next';
import StatusPrimitive, { StatusProps } from '../Primitive/StatusPrimitive';

export type StatusFailedProps = Omit<StatusProps, 'icon' | 'variant' | 'inProgress'>;

const StatusFailed = React.forwardRef(
	(props: StatusFailedProps, ref: React.Ref<HTMLSpanElement>) => {
		const { t } = useTranslation('design-system');
		return (
			<StatusPrimitive icon="square-cross" variant="failed" {...props} ref={ref}>
				{props.children || t('FAILED', 'Failed')}
			</StatusPrimitive>
		);
	},
);

StatusFailed.displayName = 'StatusFailed';
export default StatusFailed;
