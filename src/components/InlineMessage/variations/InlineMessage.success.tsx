import * as React from 'react';
import styled from 'styled-components';
import { tint } from 'polished';
import InlineMessage from '../InlineMessage';

const InlineMessageSuccess = styled(InlineMessage).attrs({
	icon: 'talend-check-circle',
})(
	({ withBackground, theme }) => `
	color: ${theme.colors.successColor[500]};
	background: ${withBackground && tint(0.95, theme.colors.successColor[500])};
	box-shadow: ${withBackground && `0 1px 2px ${tint(0.75, theme.colors.successColor[500])}`};
`,
);

export default React.memo(InlineMessageSuccess);
