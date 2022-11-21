import React from 'react';
import i18n from 'i18next';
import StatusPrimitive, { StatusProps } from '../Primitive/StatusPrimitive';

export type StatusWarningProps = Omit<StatusProps, 'icon' | 'variant' | 'inProgress'>;

const StatusWarning = React.forwardRef(
	(props: StatusWarningProps, ref: React.Ref<HTMLSpanElement>) => {
		return (
			<StatusPrimitive icon="exclamation" variant="warning" {...props} ref={ref}>
				{props.children || i18n.t('design-system:WARNING', 'Warning')}
			</StatusPrimitive>
		);
	},
);

StatusWarning.displayName = 'StatusWarning';
export default StatusWarning;
