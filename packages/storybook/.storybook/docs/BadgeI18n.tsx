import { memo } from 'react';
import type { FunctionComponent } from 'react';

import Badge from './Badge';

const I18nStatus = (props: FunctionComponent) => {
	return (
		<Badge {...props} icon="i18next">
			i18n
		</Badge>
	);
};

export default memo(I18nStatus);
