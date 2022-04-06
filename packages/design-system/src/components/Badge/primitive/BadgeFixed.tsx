import React, { forwardRef, Ref } from 'react';

import BadgeBase, { BadgeProps } from './BadgePrimitive';

import style from './BadgePrimitive.module.scss';

type BadgeWithDropdownProps = BadgeProps & {
	values: string[];
	defaultValue?: string;
	onChange: (
		event: React.MouseEvent<HTMLButtonElement> | KeyboardEvent,
		value: { label: string },
	) => void;
};

const Badge = forwardRef(
	(
		{ label, onChange, defaultValue, values, ...rest }: BadgeWithDropdownProps,
		ref: Ref<HTMLSpanElement>,
	) => {
		return (
			<BadgeBase
				{...rest}
				className={style.badgeFixed}
				label={label}
				values={values}
				defaultValue={defaultValue}
				onChange={onChange}
				ref={ref}
			/>
		);
	},
);

export default Badge;
