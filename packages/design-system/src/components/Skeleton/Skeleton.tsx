import React, { forwardRef, Ref } from 'react';

import SkeletonButton, { SkeletonButtonProps } from './variations/SkeletonButton';
import SkeletonButtonIcon, { SkeletonButtonIconProps } from './variations/SkeletonButtonIcon';
import SkeletonHeading, { SkeletonHeadingProps } from './variations/SkeletonHeading';
import SkeletonParagraph, { SkeletonParagraphProps } from './variations/SkeletonParagraph';

type SkeletonProps =
	| ({ variant: 'button' } & SkeletonButtonProps)
	| ({ variant: 'buttonIcon' } & SkeletonButtonIconProps)
	| ({ variant: 'heading' } & SkeletonHeadingProps)
	| ({ variant: 'paragraph' } & SkeletonParagraphProps);

const Skeleton = forwardRef((props: SkeletonProps, ref: Ref<HTMLSpanElement>) => {
	switch (props.variant) {
		case 'button': {
			const { variant, ...rest } = props;
			return <SkeletonButton {...rest} ref={ref} />;
		}

		case 'buttonIcon': {
			const { variant, ...rest } = props;
			return <SkeletonButtonIcon {...rest} ref={ref} />;
		}

		case 'heading': {
			const { variant, ...rest } = props;
			return <SkeletonHeading {...rest} ref={ref} />;
		}

		case 'paragraph': {
			const { variant, ...rest } = props;
			return <SkeletonParagraph {...rest} ref={ref} />;
		}

		default: {
			return null;
		}
	}
});

export default Skeleton;
