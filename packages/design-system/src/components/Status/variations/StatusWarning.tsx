import { forwardRef } from 'react';
import type { Ref } from 'react';
import { useTranslation } from 'react-i18next';
import StatusPrimitive, { StatusProps } from '../Primitive/StatusPrimitive';

export type StatusWarningProps = Omit<StatusProps, 'icon' | 'variant' | 'inProgress'>;

const StatusWarning = forwardRef((props: StatusWarningProps, ref: Ref<HTMLSpanElement>) => {
	const { t } = useTranslation('design-system');
	return (
		<StatusPrimitive icon="exclamation" variant="warning" {...props} ref={ref}>
			{props.children || t('WARNING', 'Warning')}
		</StatusPrimitive>
	);
});

StatusWarning.displayName = 'StatusWarning';
export default StatusWarning;
