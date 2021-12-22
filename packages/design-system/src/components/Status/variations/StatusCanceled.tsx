import React from 'react';
import i18n from 'i18next';
import StatusPrimitive, { StatusProps } from '../Primitive/StatusPrimitive';

type StatusCanceledProps = Omit<StatusProps, 'icon' | 'variant'>;

const StatusCanceled = React.forwardRef((props: StatusCanceledProps, ref: React.Ref<any>) => {
	return (
		<StatusPrimitive icon="talend-block" variant="canceled" {...props} ref={ref}>
			{props.children || i18n.t('CANCELED', 'Canceled')}
		</StatusPrimitive>
	);
});

export default StatusCanceled;
