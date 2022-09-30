import styles from './StackPrimitive.module.scss';
import classnames from 'classnames';
import React, { forwardRef, ReactNode } from 'react';

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

export const spacingOptions = {
	0: 'NONE',
	XXS: 'XXS',
	XS: 'XS',
	S: 'S',
	M: 'M',
	L: 'L',
	XL: 'XL',
};

export const sizeOptions = {
	'100%': '100',
	XXXS: 'XXXS',
	XXS: 'XXS',
	XS: 'XS',
	S: 'S',
	M: 'M',
	L: 'L',
	XXXL: 'XXXL',
};

export const spacingOptionsWithAuto = {
	...spacingOptions,
	auto: 'auto',
};

type GapType =
	| keyof typeof spacingOptions
	| {
			x: keyof typeof spacingOptions;
			y: keyof typeof spacingOptions;
	  };

type SpacingType =
	| keyof typeof spacingOptions
	| {
			x: keyof typeof spacingOptions;
			y: keyof typeof spacingOptions;
	  }
	| {
			top: keyof typeof spacingOptions;
			left: keyof typeof spacingOptions;
			right: keyof typeof spacingOptions;
			bottom: keyof typeof spacingOptions;
	  };

type SpacingTypeWithAuto =
	| keyof typeof spacingOptionsWithAuto
	| {
			x: keyof typeof spacingOptionsWithAuto;
			y: keyof typeof spacingOptionsWithAuto;
	  }
	| {
			top: keyof typeof spacingOptionsWithAuto;
			left: keyof typeof spacingOptionsWithAuto;
			right: keyof typeof spacingOptionsWithAuto;
			bottom: keyof typeof spacingOptionsWithAuto;
	  };

export const possibleAsTypes = ['div', 'ul', 'ol', 'article', 'span', 'dl'] as const;

type DirectionType = 'row' | 'column';

export type StackPrimitiveProps = {
	as?: typeof possibleAsTypes[number];
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
	height?: keyof typeof sizeOptions;
	width?: keyof typeof sizeOptions;
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
		width,
		noShrink = false,
		noGrow = false,
		...props
	}: StackPrimitiveProps,
	ref: React.Ref<any>,
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
				height && styles[`height-${sizeOptions[height]}`],
				width && styles[`width-${sizeOptions[width]}`],
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
