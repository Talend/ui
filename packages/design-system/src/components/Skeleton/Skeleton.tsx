import { forwardRef, Ref } from 'react';

import SkeletonButton, { SkeletonButtonProps } from './variations/SkeletonButton';
import SkeletonButtonIcon, { SkeletonButtonIconProps } from './variations/SkeletonButtonIcon';
import SkeletonHeading, { SkeletonHeadingProps } from './variations/SkeletonHeading';
import SkeletonInput, { SkeletonInputProps } from './variations/SkeletonInput';
import SkeletonParagraph, { SkeletonParagraphProps } from './variations/SkeletonParagraph';
import SkeletonSized, { SkeletonSizedProps } from './variations/SkeletonSized';

export type SkeletonProps =
	| ({ variant: 'button' } & SkeletonButtonProps)
	| ({ variant: 'buttonIcon' } & SkeletonButtonIconProps)
	| ({ variant: 'heading' } & SkeletonHeadingProps)
	| ({ variant: 'paragraph' } & SkeletonParagraphProps)
	| ({ variant: 'input' } & SkeletonInputProps)
	| ({ variant: 'sized' } & SkeletonSizedProps);

export const Skeleton = forwardRef((props: SkeletonProps, ref: Ref<HTMLSpanElement>) => {
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

		case 'input': {
			const { variant, ...rest } = props;
			return <SkeletonInput {...rest} ref={ref} />;
		}

		case 'sized': {
			const { variant, ...rest } = props;
			return <SkeletonSized {...rest} ref={ref} />;
		}

		default: {
			return null;
		}
	}
});
Skeleton.displayName = 'Skeleton';
