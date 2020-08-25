import * as React from 'react';
import styled from 'styled-components';
import { tint } from 'polished';
import InlineMessage, { InlineMessageProps } from '../InlineMessage';

const InlineMessageSuccess = styled(InlineMessage).attrs({
	icon: 'check',
})(
	({ withBackground, theme }) => `
	color: ${theme.colors.successColor};
	background: ${withBackground && tint(0.95, theme.colors.successColor)};
	box-shadow: ${withBackground && `0 1px 2px ${tint(0.75, theme.colors.successColor)}`};
`,
);

export default React.memo(InlineMessageSuccess);
