import React from 'react';
import { siI18next } from 'simple-icons/icons';

import Link from './Link';

const I18nStatus = (props: React.FunctionComponent) => {
	return (
		<Link {...props} icon={siI18next}>
			i18n
		</Link>
	);
};

export default React.memo(I18nStatus);
