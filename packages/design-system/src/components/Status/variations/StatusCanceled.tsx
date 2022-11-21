import React from 'react';
import { useTranslation } from 'react-i18next';
import StatusPrimitive, { StatusProps } from '../Primitive/StatusPrimitive';

export type StatusCanceledProps = Omit<StatusProps, 'icon' | 'variant' | 'inProgress'>;

const StatusCanceled = React.forwardRef(
	(props: StatusCanceledProps, ref: React.Ref<HTMLSpanElement>) => {
		const { t } = useTranslation('design-system');
		return (
			<StatusPrimitive icon="circle-slash" variant="canceled" {...props} ref={ref}>
				{props.children || t('CANCELED', 'Canceled')}
			</StatusPrimitive>
		);
	},
);

StatusCanceled.displayName = 'StatusCanceled';
export default StatusCanceled;
