import React from 'react';
import i18n from 'i18next';
import StatusPrimitive, { StatusProps } from '../Primitive/StatusPrimitive';

export type StatusCanceledProps = Omit<StatusProps, 'icon' | 'variant' | 'inProgress'>;

const StatusCanceled = React.forwardRef(
	(props: StatusCanceledProps, ref: React.Ref<HTMLSpanElement>) => {
		return (
			<StatusPrimitive icon="talend-block" variant="canceled" {...props} ref={ref}>
				{props.children || i18n.t('CANCELED', 'Canceled')}
			</StatusPrimitive>
		);
	},
);

export default StatusCanceled;
