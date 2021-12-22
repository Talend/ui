import React from 'react';
import i18n from 'i18next';
import StatusPrimitive, { StatusProps } from '../Primitive/StatusPrimitive';

export type StatusSuccessfulProps = Omit<StatusProps, 'icon' | 'variant' | 'inProgress'>;

const StatusSuccessful = React.forwardRef((props: StatusSuccessfulProps, ref: React.Ref<any>) => {
	return (
		<StatusPrimitive icon="talend-check-circle" variant="successful" {...props} ref={ref}>
			{props.children || i18n.t('SUCCESSFUL', 'Successful')}
		</StatusPrimitive>
	);
});

export default StatusSuccessful;
