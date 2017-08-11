import React from 'react';

import theme from './NoRows.scss';

function NoRows() {
	return <p className={theme['no-result']}>No result found</p>;
}

export default NoRows;
