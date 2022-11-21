import React from 'react';
import i18n from 'i18next';
import StatusPrimitive, { StatusProps } from '../Primitive/StatusPrimitive';

export type StatusSuccessfulProps = Omit<StatusProps, 'icon' | 'variant' | 'inProgress'>;

const StatusSuccessful = React.forwardRef(
	(props: StatusSuccessfulProps, ref: React.Ref<HTMLSpanElement>) => {
		return (
			<StatusPrimitive icon="check-filled" variant="successful" {...props} ref={ref}>
				{props.children || i18n.t('design-system:SUCCESSFUL', 'Successful')}
			</StatusPrimitive>
		);
	},
);

StatusSuccessful.displayName = 'StatusSuccessful';
export default StatusSuccessful;
