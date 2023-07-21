import styles from './StackPrimitive.module.scss';
import classnames from 'classnames';
import { forwardRef } from 'react';
import type { Ref, ReactNode } from 'react';

export const justifyOptions = {
	start: 'justify-start',
	end: 'justify-end',
	center: 'justify-center',
	spaceBetween: 'justify-space-between',
	spaceAround: 'justify-space-around',
	spaceEvenly: 'justify-space-evenly',
	stretch: 'justify-stretch',
};

export const alignOptions = {
	start: 'align-start',
	end: 'align-end',
	center: 'align-center',
	stretch: 'align-stretch',
	baseline: 'align-baseline',
};

export const alignContentOptions = {
	start: 'align-content-start',
	end: 'align-content-end',
	center: 'align-content-center',
	stretch: 'align-content-stretch',
	baseline: 'align-content-baseline',
};

export const sizeOptions = {
	0: 'NONE',
	XXS: 'XXS',
	XS: 'XS',
	S: 'S',
	M: 'M',
	L: 'L',
	XL: 'XL',
};

export const heightOptions = {
	'100%': '100',
	XXXS: 'XXXS',
	XXS: 'XXS',
	XS: 'XS',
	S: 'S',
	M: 'M',
	L: 'L',
	XXXL: 'XXXL',
};

export const sizeOptionsWithAuto = {
	...sizeOptions,
	auto: 'auto',
};

type GapType =
	| keyof typeof sizeOptions
	| {
			x: keyof typeof sizeOptions;
			y: keyof typeof sizeOptions;
	  };

type SpacingType =
	| keyof typeof sizeOptions
	| {
			x: keyof typeof sizeOptions;
			y: keyof typeof sizeOptions;
	  }
	| {
			top: keyof typeof sizeOptions;
			left: keyof typeof sizeOptions;
			right: keyof typeof sizeOptions;
			bottom: keyof typeof sizeOptions;
	  };

type SpacingTypeWithAuto =
	| keyof typeof sizeOptionsWithAuto
	| {
			x: keyof typeof sizeOptionsWithAuto;
			y: keyof typeof sizeOptionsWithAuto;
	  }
	| {
			top: keyof typeof sizeOptionsWithAuto;
			left: keyof typeof sizeOptionsWithAuto;
			right: keyof typeof sizeOptionsWithAuto;
			bottom: keyof typeof sizeOptionsWithAuto;
	  };

export const possibleAsTypes = ['div', 'ul', 'ol', 'article', 'span', 'dl'] as const;

type DirectionType = 'row' | 'column';

export type StackPrimitiveProps = {
	as?: (typeof possibleAsTypes)[number];
	justify?: keyof typeof justifyOptions;
	align?: keyof typeof alignOptions;
	gap: GapType;
	padding?: SpacingType;
	margin?: SpacingTypeWithAuto;
	children: ReactNode | ReactNode[];
	direction?: DirectionType;
	wrap?: 'nowrap' | 'wrap' | 'wrapReverse';
	alignContent?: keyof typeof alignContentOptions;
	display?: 'block' | 'inline';
	role?: string;
	relative?: boolean;
	height?: keyof typeof heightOptions;
	isFullWidth?: boolean;
	noShrink?: boolean;
	noGrow?: boolean;
};

const StackPrimitive = forwardRef(function StackPrimitive(
	{
		as = 'div',
		children,
		justify = 'start',
		align = 'start',
		wrap = 'nowrap',
		direction = 'row',
		display = 'block',
		relative = false,
		gap,
		padding,
		margin,
		role,
		height,
		noShrink = false,
		noGrow = false,
		isFullWidth,
		...props
	}: StackPrimitiveProps,
	ref: Ref<any>,
) {
	const TagType = as;
	const { alignContent, ...spreadableProps } = props;

	function getGap() {
		if (typeof gap === 'object') {
			return [styles[`gap-x-${gap.x}`], styles[`gap-y-${gap.y}`]];
		}

		return [styles[`gap-x-${gap}`], styles[`gap-y-${gap}`]];
	}

	function getPadding() {
		if (padding && typeof padding === 'object') {
			if ('top' in padding) {
				return [
					styles[`padding-top-${padding.top}`],
					styles[`padding-right-${padding.right}`],
					styles[`padding-bottom-${padding.bottom}`],
					styles[`padding-left-${padding.left}`],
				];
			}

			return [
				styles[`padding-top-${padding.y}`],
				styles[`padding-right-${padding.x}`],
				styles[`padding-bottom-${padding.y}`],
				styles[`padding-left-${padding.x}`],
			];
		}

		if (padding && typeof padding !== 'object') {
			return [
				styles[`padding-top-${padding}`],
				styles[`padding-right-${padding}`],
				styles[`padding-bottom-${padding}`],
				styles[`padding-left-${padding}`],
			];
		}

		return [];
	}

	function getMargin() {
		if (margin && typeof margin === 'object') {
			if ('top' in margin) {
				return [
					styles[`margin-top-${margin.top}`],
					styles[`margin-right-${margin.right}`],
					styles[`margin-bottom-${margin.bottom}`],
					styles[`margin-left-${margin.left}`],
				];
			}

			return [
				styles[`margin-top-${margin.y}`],
				styles[`margin-right-${margin.x}`],
				styles[`margin-bottom-${margin.y}`],
				styles[`margin-left-${margin.x}`],
			];
		}

		if (margin && typeof margin !== 'object') {
			return [
				styles[`margin-top-${margin}`],
				styles[`margin-right-${margin}`],
				styles[`margin-bottom-${margin}`],
				styles[`margin-left-${margin}`],
			];
		}

		return [];
	}

	function getAlignContent() {
		if ('alignContent' in props) {
			return alignContent ? styles[alignContentOptions[alignContent]] : '';
		}
		return '';
	}

	return (
		<TagType
			className={classnames(
				styles.stack,
				styles[justifyOptions[justify]],
				styles[alignOptions[align]],
				styles[wrap],
				styles[direction],
				styles[display],
				height && styles[`height-${heightOptions[height]}`],
				isFullWidth && styles.fullWidth,
				{ [styles.relative]: relative },
				{ [styles.noShrink]: noShrink },
				{ [styles.noGrow]: noGrow },
				getAlignContent(),
				...getGap(),
				...getPadding(),
				...getMargin(),
			)}
			ref={ref}
			role={role}
			{...spreadableProps}
		>
			{children}
		</TagType>
	);
});

export default StackPrimitive;
