import { forwardRef, Ref } from 'react';
import Progress, { ProgressProps } from '../Primitive/Progress';
import styles from './Progress.vertical.module.scss';

type ProgressVerticalTypes = Omit<ProgressProps, 'className' | 'orientation'>;

const ProgressVertical = forwardRef((props: ProgressVerticalTypes, ref: Ref<HTMLDivElement>) => (
	<Progress {...props} orientation="vertical" className={styles.vertical} ref={ref} />
));

ProgressVertical.displayName = 'ProgressVertical';

export default ProgressVertical;
