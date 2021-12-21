import React, { ReactNode } from 'react';
import classnames from 'classnames';
import styles from './StackItem.module.scss';

const alignOptions = {
	auto: 'align-auto',
	start: 'align-start',
	end: 'align-end',
	center: 'align-center',
	stretch: 'align-stretch',
	baseline: 'align-baseline',
};

const overflowOptions = {
	scroll: 'overflow-scroll',
	hidden: 'overflow-hidden',
	visible: 'overflow-visible',
	auto: 'overflow-auto',
};

export type ItemProps = {
	children: ReactNode;
	grow?: boolean;
	shrink?: boolean;
	align?: keyof typeof alignOptions;
	overflow?: keyof typeof overflowOptions;
	as?: 'div' | 'li' | 'span' | 'section';
};

export const StackItem = React.forwardRef(function StackItem(
	{
		as = 'div',
		children,
		grow = false,
		shrink = true,
		align = 'auto',
		overflow = 'auto',
		...props
	}: ItemProps,
	ref: React.Ref<any>,
) {
	const TagType = as;
	return (
		<TagType
			ref={ref}
			className={classnames(
				styles.item,
				styles[alignOptions[align]],
				styles[overflowOptions[overflow]],
				{
					[styles.grow]: grow,
					[styles.shrink]: shrink,
				},
			)}
			{...props}
		>
			{children}
		</TagType>
	);
});
