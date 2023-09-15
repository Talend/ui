import { memo } from 'react';

import Badge, { BadgeProps } from './Badge';

type I18nStatusProps = Omit<BadgeProps, 'icon'>;
const I18nStatus = (props: I18nStatusProps) => {
	return (
		<Badge {...props} icon="i18next">
			i18n
		</Badge>
	);
};

export default memo(I18nStatus);
