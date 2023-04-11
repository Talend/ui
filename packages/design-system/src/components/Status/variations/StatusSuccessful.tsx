import * as React from 'react';
import { useTranslation } from 'react-i18next';
import StatusPrimitive, { StatusProps } from '../Primitive/StatusPrimitive';

export type StatusSuccessfulProps = Omit<StatusProps, 'icon' | 'variant' | 'inProgress'>;

const StatusSuccessful = React.forwardRef(
	(props: StatusSuccessfulProps, ref: React.Ref<HTMLSpanElement>) => {
		const { t } = useTranslation('design-system');
		return (
			<StatusPrimitive icon="check-filled" variant="successful" {...props} ref={ref}>
				{props.children || t('SUCCESSFUL', 'Successful')}
			</StatusPrimitive>
		);
	},
);

StatusSuccessful.displayName = 'StatusSuccessful';
export default StatusSuccessful;
