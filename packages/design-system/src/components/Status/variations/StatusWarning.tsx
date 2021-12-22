import React from 'react';
import i18n from 'i18next';
import StatusPrimitive, { StatusProps } from '../Primitive/StatusPrimitive';

export type StatusWarningProps = Omit<StatusProps, 'icon' | 'variant' | 'inProgress'>;

const StatusWarning = React.forwardRef((props: StatusWarningProps, ref: React.Ref<any>) => {
	return (
		<StatusPrimitive icon="talend-warning" variant="warning" {...props} ref={ref}>
			{props.children || i18n.t('WARNING', 'Warning')}
		</StatusPrimitive>
	);
});

export default StatusWarning;
