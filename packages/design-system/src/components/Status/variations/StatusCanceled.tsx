import React from 'react';
import i18n from 'i18next';
import StatusPrimitive, { StatusProps } from '../Primitive/StatusPrimitive';

export type StatusCanceledProps = Omit<StatusProps, 'icon' | 'variant' | 'inProgress'>;

const StatusCanceled = React.forwardRef(
	(props: StatusCanceledProps, ref: React.Ref<HTMLSpanElement>) => {
		return (
			<StatusPrimitive icon="circle-slash" variant="canceled" {...props} ref={ref}>
				{props.children || i18n.t('design-system:CANCELED', 'Canceled')}
			</StatusPrimitive>
		);
	},
);

StatusCanceled.displayName = 'StatusCanceled';
export default StatusCanceled;
