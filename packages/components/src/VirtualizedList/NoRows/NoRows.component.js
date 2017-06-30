import React from 'react';

import theme from './NoRows.scss';

function NoRows() {
	return <div className={theme['no-result']}>No result found</div>;
}

export default NoRows;
