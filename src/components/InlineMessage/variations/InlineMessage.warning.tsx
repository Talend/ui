import * as React from 'react';
import styled from 'styled-components';
import { tint } from 'polished';
import InlineMessage, { InlineMessageProps } from '../InlineMessage';

const InlineMessageWarning: React.FC<InlineMessageProps> = styled(InlineMessage).attrs({
	icon: 'warning',
})`
	color: ${({ theme }) => theme.colors.warningColor};
	background: ${props => props.withBackground && tint(0.95, props.theme.colors.warningColor)};
	box-shadow: ${props =>
		props.withBackground && `0 1px 2px ${tint(0.75, props.theme.colors.warningColor)}`};
`;

export default React.memo(InlineMessageWarning);
