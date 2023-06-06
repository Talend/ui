import { forwardRef, Ref, HTMLAttributes, RefAttributes } from 'react';

import style from './Divider.module.scss';

export type DividerOptions = {
	/**
	 * Separator's orientation.
	 */
	orientation?: 'horizontal' | 'vertical';
};

export type DividerHTMLProps = HTMLAttributes<HTMLHRElement> & RefAttributes<HTMLHRElement>;

export type DividerProps = DividerOptions & DividerHTMLProps;

const Divider = forwardRef((props: DividerProps, ref: Ref<HTMLHRElement>) => {
	return <hr {...props} aria-orientation={props.orientation} ref={ref} className={style.divider} />;
});

Divider.displayName = 'Divider';
export default Divider;
