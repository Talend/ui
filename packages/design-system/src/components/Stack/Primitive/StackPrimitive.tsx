import React, { ReactNode } from 'react';
import classnames from 'classnames';
import styles from './StackPrimitive.module.scss';
import { StackItem } from '../StackItem';

const justifyOptions = {
	start: 'justify-start',
	end: 'justify-end',
	center: 'justify-center',
	spaceBetween: 'justify-space-between',
	spaceAround: 'justify-space-around',
	spaceEvenly: 'justify-space-evenly',
};

const alignOptions = {
	start: 'align-start',
	end: 'align-end',
	center: 'align-center',
	stretch: 'align-stretch',
	baseline: 'align-baseline',
};

const alignContentOptions = {
	start: 'align-content-start',
	end: 'align-content-end',
	center: 'align-content-center',
	stretch: 'align-content-stretch',
	baseline: 'align-content-baseline',
};

const sizeOptions = {
	0: 'NONE',
	XXS: 'XXS',
	XS: 'XS',
	S: 'S',
	M: 'M',
	L: 'L',
	XL: 'XL',
};

const sizeOptionsWithAuto = {
	...sizeOptions,
	auto: 'auto',
};

type gapType =
	| keyof typeof sizeOptions
	| {
			x: keyof typeof sizeOptions;
			y: keyof typeof sizeOptions;
	  };

type spacingType =
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

type spacingTypeWithAuto =
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

type directionType = 'row' | 'column';

export type StackPrimitiveProps = {
	as?: 'div' | 'ul' | 'ol' | 'article' | 'span';
	justify?: keyof typeof justifyOptions;
	align?: keyof typeof alignOptions;
	gap: gapType;
	padding?: spacingType;
	margin?: spacingTypeWithAuto;
	children: ReactNode | ReactNode[];
	direction?: directionType;
	wrap?: 'nowrap' | 'wrap' | 'wrapReverse';
	alignContent?: keyof typeof alignContentOptions;
	display?: 'block' | 'inline';
	role?: string;
};

const StackPrimitive = React.forwardRef(function StackPrimitive(
	{
		as = 'div',
		children,
		justify = 'start',
		align = 'start',
		wrap = 'nowrap',
		direction = 'row',
		display = 'block',
		gap,
		padding,
		margin,
		role,
		...props
	}: StackPrimitiveProps,
	ref: React.Ref<any>,
) {
	const TagType = as;
	let spreadableProps = props;

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
			const { alignContent, ...rest } = props;
			spreadableProps = rest;
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
