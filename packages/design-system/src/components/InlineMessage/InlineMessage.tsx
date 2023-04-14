import { forwardRef, Ref } from 'react';

import InlineMessageInformation, {
	InlineMessageInformationProps,
} from './variations/InlineMessageInformation';
import InlineMessageSuccess, { InlineMessageSuccessProps } from './variations/InlineMessageSuccess';
import InlineMessageWarning, { InlineMessageWarningProps } from './variations/InlineMessageWarning';
import InlineMessageDestructive, {
	InlineMessageDestructiveProps,
} from './variations/InlineMessageDestructive';
import InlineMessageBeta, { InlineMessageBetaProps } from './variations/InlineMessageBeta';

import { InlineMessageVariantType } from './Primitive/InlineMessagePrimitive';

type Information = InlineMessageVariantType<'information', InlineMessageInformationProps>;
type Success = InlineMessageVariantType<'success', InlineMessageSuccessProps>;
type Warning = InlineMessageVariantType<'warning', InlineMessageWarningProps>;
type Destructive = InlineMessageVariantType<'destructive', InlineMessageDestructiveProps>;
type Beta = InlineMessageVariantType<'beta', InlineMessageBetaProps>;

export type InlineMessageType = Information | Success | Warning | Destructive | Beta;

const InlineMessage = forwardRef((props: InlineMessageType, ref: Ref<HTMLDivElement>) => {
	switch (props.variant) {
		case 'information': {
			const { variant, ...rest } = props;
			return <InlineMessageInformation {...rest} ref={ref} />;
		}

		case 'destructive': {
			const { variant, ...rest } = props;
			return <InlineMessageDestructive {...rest} ref={ref} />;
		}

		case 'success': {
			const { variant, ...rest } = props;
			return <InlineMessageSuccess {...rest} ref={ref} />;
		}

		case 'warning': {
			const { variant, ...rest } = props;
			return <InlineMessageWarning {...rest} ref={ref} />;
		}

		case 'beta': {
			const { variant, ...rest } = props;
			return <InlineMessageBeta {...rest} ref={ref} />;
		}

		default:
			throw new Error("InlineMessage needs a 'variant' prop");
	}
});

InlineMessage.displayName = 'InlineMessage';

export default InlineMessage;
