import React from 'react';
import styled from 'styled-components';
import { tint } from 'polished';
import InlineMessage from '../InlineMessage';

const InlineMessageDestructive = styled(InlineMessage).attrs({
	icon: 'talend-cross',
})(
	({ withBackground, theme }) => `
	color: ${theme.colors.destructiveColor};
	background: ${withBackground && tint(0.95, theme.colors.destructiveColor)};
	box-shadow: ${withBackground && `0 1px 2px ${tint(0.75, theme.colors.destructiveColor)}`};
`,
);

export default React.memo(InlineMessageDestructive);
