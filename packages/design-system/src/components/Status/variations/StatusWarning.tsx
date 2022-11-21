import React from 'react';
import { useTranslation } from 'react-i18next';
import StatusPrimitive, { StatusProps } from '../Primitive/StatusPrimitive';

export type StatusWarningProps = Omit<StatusProps, 'icon' | 'variant' | 'inProgress'>;

const StatusWarning = React.forwardRef(
	(props: StatusWarningProps, ref: React.Ref<HTMLSpanElement>) => {
		const { t } = useTranslation('design-system');
		return (
			<StatusPrimitive icon="exclamation" variant="warning" {...props} ref={ref}>
				{props.children || t('WARNING', 'Warning')}
			</StatusPrimitive>
		);
	},
);

StatusWarning.displayName = 'StatusWarning';
export default StatusWarning;
