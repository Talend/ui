import * as React from 'react';
import styled from 'styled-components';
import { tint } from 'polished';
import InlineMessage from '../InlineMessage';

const InlineMessageWarning = styled(InlineMessage).attrs({
	className: 'c-inline-message--warning',
	icon: 'talend-warning',
})`
	--c-inline-message--icon-color: ${({ theme }) => theme.colors?.warningColor[500]};
	--c-inline-message-background: ${({ withBackground, theme }) =>
		withBackground && tint(0.95, theme.colors?.warningColor[500])};
	--c-inline-message-box-shadow: ${({ withBackground, theme }) =>
		withBackground && `0 1px 2px ${tint(0.75, theme.colors?.warningColor[500])}`};
`;

export default React.memo(InlineMessageWarning);
