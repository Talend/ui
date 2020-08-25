import * as React from 'react';
import styled from 'styled-components';
import { tint } from 'polished';
import InlineMessage, { InlineMessageProps } from '../InlineMessage';

const InlineMessageWarning = styled(InlineMessage).attrs({
	icon: 'warning',
})(
	({ withBackground, theme }) => `
	color: ${theme.colors.warningColor};
	background: ${withBackground && tint(0.95, theme.colors.warningColor)};
	box-shadow: ${withBackground && `0 1px 2px ${tint(0.75, theme.colors.warningColor)}`};
`,
);

export default React.memo(InlineMessageWarning);
