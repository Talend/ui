import { HTMLAttributes } from 'react';
import style from './VisuallyHidden.module.css';

export type VisuallyHiddenProps = Omit<HTMLAttributes<HTMLSpanElement>, 'className'>;

export function VisuallyHidden(props: VisuallyHiddenProps) {
	return <span {...props} className={style.hidden} />;
}
