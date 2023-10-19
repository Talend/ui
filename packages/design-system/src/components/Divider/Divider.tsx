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

export const Divider = forwardRef((props: DividerProps, ref: Ref<HTMLHRElement>) => {
	const ruleOrientation = props.orientation || 'horizontal';

	return <hr {...props} aria-orientation={ruleOrientation} ref={ref} className={style.divider} />;
});

Divider.displayName = 'Divider';
