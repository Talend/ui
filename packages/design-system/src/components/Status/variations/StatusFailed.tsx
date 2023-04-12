import { forwardRef } from 'react';
import type { Ref } from 'react';
import { useTranslation } from 'react-i18next';
import StatusPrimitive, { StatusProps } from '../Primitive/StatusPrimitive';

export type StatusFailedProps = Omit<StatusProps, 'icon' | 'variant' | 'inProgress'>;

const StatusFailed = forwardRef((props: StatusFailedProps, ref: Ref<HTMLSpanElement>) => {
	const { t } = useTranslation('design-system');
	return (
		<StatusPrimitive icon="square-cross" variant="failed" {...props} ref={ref}>
			{props.children || t('FAILED', 'Failed')}
		</StatusPrimitive>
	);
});

StatusFailed.displayName = 'StatusFailed';
export default StatusFailed;
