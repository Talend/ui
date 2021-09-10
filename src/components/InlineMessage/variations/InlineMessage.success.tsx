import * as React from 'react';
import styled from 'styled-components';
import { tint } from 'polished';
import InlineMessage from '../InlineMessage';

const InlineMessageSuccess = styled(InlineMessage).attrs({
	className: 'c-inline-message--success',
	icon: 'talend-check-circle',
})`
	--c-inline-message--icon-color: ${({ theme }) => theme.colors?.successColor[500]};
	--c-inline-message-background: ${({ withBackground, theme }) =>
		withBackground && tint(0.95, theme.colors?.successColor[500])};
	--c-inline-message-box-shadow: ${({ withBackground, theme }) =>
		withBackground && `0 1px 2px ${tint(0.75, theme.colors?.successColor[500])}`};
`;

export default React.memo(InlineMessageSuccess);
