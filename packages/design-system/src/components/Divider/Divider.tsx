import React, { forwardRef, Ref } from 'react';
import { Separator as ReakitSeparator, SeparatorProps as ReakitSeparatorProps } from 'reakit';

import style from './Divider.module.scss';

type DividerProps = Omit<ReakitSeparatorProps, 'style' | 'className'>;

const Divider = forwardRef((props: DividerProps, ref: Ref<HTMLHRElement>) => {
	return <ReakitSeparator {...props} ref={ref} className={style.divider} />;
});

export default Divider;
