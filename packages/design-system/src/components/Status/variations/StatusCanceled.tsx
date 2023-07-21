import { forwardRef } from 'react';
import type { Ref } from 'react';
import { useTranslation } from 'react-i18next';
import StatusPrimitive, { StatusProps } from '../Primitive/StatusPrimitive';

export type StatusCanceledProps = Omit<StatusProps, 'icon' | 'variant' | 'inProgress'>;

const StatusCanceled = forwardRef((props: StatusCanceledProps, ref: Ref<HTMLSpanElement>) => {
	const { t } = useTranslation('design-system');
	return (
		<StatusPrimitive icon="circle-slash" variant="canceled" {...props} ref={ref}>
			{props.children || t('CANCELED', 'Canceled')}
		</StatusPrimitive>
	);
});

StatusCanceled.displayName = 'StatusCanceled';
export default StatusCanceled;
