import React from 'react';
import { IconName } from '@talend/icons';
import Tooltip from '../Tooltip';
import { Icon } from '../Icon/Icon';
import Loading from '../Loading';

import * as S from './Status.style';

export type StatusProps = React.PropsWithChildren<any> & {
	icon?: IconName;
	inProgress?: boolean;
	hideText?: boolean;
	children: string;
};

const Status = React.forwardRef(
	(
		{ children, icon, inProgress, hideText, ...rest }: StatusProps,
		ref: React.Ref<HTMLSpanElement>,
	) => {
		const text = <span className="status__text">{children}</span>;
		const picto = (
			<span className="status__icon" aria-hidden>
				{!inProgress && icon && <Icon name={icon} />}
				{inProgress && <Loading />}
			</span>
		);

		return (
			<S.Status ref={ref} {...rest}>
				{hideText ? <Tooltip title={children}>{picto}</Tooltip> : [picto, text]}
			</S.Status>
		);
	},
);

export default Status;
