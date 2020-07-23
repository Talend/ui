import * as React from 'react';
import styled from 'styled-components';
import { tint } from 'polished';
import InlineMessage, { InlineMessageProps } from '../InlineMessage';
import Icon from '../../Icon';

const StyledComponent = styled(InlineMessage)`
	color: ${({ theme }) => theme.colors.successColor};
	background: ${props => props.withBackground && tint(0.95, props.theme.colors.successColor)};
	box-shadow: ${props =>
		props.withBackground && `0 1px 2px ${tint(0.75, props.theme.colors.successColor)}`};
`;

const InlineMessageSuccess: React.FC<InlineMessageProps> = React.forwardRef(
	(props: InlineMessageProps, ref) => {
		return <StyledComponent icon={<Icon name={'check'} />} {...props} ref={ref} />;
	},
);

export default React.memo(InlineMessageSuccess);
