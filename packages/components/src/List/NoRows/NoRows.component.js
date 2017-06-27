import React from 'react';

import theme from './NoRows.scss';

function NoRows() {
	return <span className={theme['no-result']}>No result found</span>;
}

export default NoRows;
