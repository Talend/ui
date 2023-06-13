import { HTMLAttributes } from 'react';
import style from './VisuallyHidden.module.scss';

export type VisuallyHiddenProps = Omit<HTMLAttributes<HTMLSpanElement>, 'className'>;

export function VisuallyHidden(props: VisuallyHiddenProps) {
	return <span {...props} className={style.hidden} />;
}
