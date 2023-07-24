import { forwardRef, Ref } from 'react';
import Progress, { ProgressProps } from '../Primitive/Progress';
import styles from './Progress.horizontal.module.scss';

type ProgressHorizontalTypes = Omit<ProgressProps, 'className' | 'orientation'>;

const ProgressHorizontal = forwardRef(
	(props: ProgressHorizontalTypes, ref: Ref<HTMLDivElement>) => (
		<Progress {...props} orientation="horizontal" className={styles.horizontal} ref={ref} />
	),
);

ProgressHorizontal.displayName = 'ProgressHorizontal';

export default ProgressHorizontal;
