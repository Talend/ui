import { forwardRef, Ref } from 'react';
import EmptyStateLarge, { EmptyStateLargeProps } from './variants/EmptyStateLarge';
import EmptyStateMedium, { EmptyStateMediumProps } from './variants/EmptyStateMedium';
import EmptyStateSmall, { EmptyStateSmallProps } from './variants/EmptyStateSmall';

type availableVariantsTypes = 'L' | 'M' | 'S';

export type VariantType<T extends availableVariantsTypes, P extends object> = {
	variant: T;
} & P;

type Large = VariantType<'L', EmptyStateLargeProps>;
type Medium = VariantType<'M', EmptyStateMediumProps>;
type Small = VariantType<'S', EmptyStateSmallProps>;

export type EmptyStateProps = Large | Medium | Small;

const EmptyState = forwardRef((props: EmptyStateProps, ref: Ref<HTMLElement>) => {
	switch (props.variant) {
		case 'L': {
			const { variant, ...rest } = props;
			return <EmptyStateLarge {...rest} ref={ref} />;
		}

		case 'M': {
			const { variant, ...rest } = props;
			return <EmptyStateMedium {...rest} ref={ref} />;
		}

		case 'S': {
			const { variant, ...rest } = props;
			return <EmptyStateSmall {...rest} ref={ref} />;
		}

		default: {
			return <></>;
		}
	}
});

export default EmptyState;
