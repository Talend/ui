import React, { forwardRef, Ref } from 'react';

import styles from './Breadcrumbs.module.scss';

const Breadcrumbs = forwardRef((props, ref: Ref<HTMLElement>) => {
	return <nav className={styles.breadcrumb} ref={ref} />;
});

export default Breadcrumbs;
