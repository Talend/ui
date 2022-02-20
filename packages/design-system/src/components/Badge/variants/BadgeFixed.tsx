import React, { forwardRef, Ref } from 'react';

import BadgeBase, { BadgeProps } from '../primitive/BadgePrimitive';

import style from './BadgeFixed.module.scss';

type BadgeWithDropdownProps = Pick<BadgeProps, 'label' | 'defaultValue' | 'values' | 'onChange'>;

const Badge = forwardRef((props: BadgeWithDropdownProps, ref: Ref<HTMLSpanElement>) => {
	return <BadgeBase className={style.badgeFixed} {...props} ref={ref} />;
});

export default Badge;
