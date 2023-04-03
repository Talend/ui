import * as React from 'react';

import Badge from './Badge';

const I18nStatus = (props: React.FunctionComponent) => {
	return (
		<Badge {...props} icon="i18next">
			i18n
		</Badge>
	);
};

export default React.memo(I18nStatus);
