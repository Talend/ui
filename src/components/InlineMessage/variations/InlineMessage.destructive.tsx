import * as React from 'react';
import styled from 'styled-components';
import { tint } from 'polished';
import InlineMessage, { InlineMessageProps } from '../InlineMessage';

const InlineMessageDestructive: React.FC<InlineMessageProps> = styled(InlineMessage).attrs({
	icon: 'cross',
})`
	color: ${({ theme }) => theme.colors.destructiveColor};
	background: ${props => props.withBackground && tint(0.95, props.theme.colors.destructiveColor)};
	box-shadow: ${props =>
		props.withBackground && `0 1px 2px ${tint(0.75, props.theme.colors.destructiveColor)}`};
`;

export default React.memo(InlineMessageDestructive);
