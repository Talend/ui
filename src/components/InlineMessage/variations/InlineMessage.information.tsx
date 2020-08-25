import * as React from 'react';
import styled from 'styled-components';
import { tint } from 'polished';
import InlineMessage, { InlineMessageProps } from '../InlineMessage';

const InlineMessageInformation = styled(InlineMessage).attrs({
	icon: 'information',
})(
	({ withBackground, theme }) => `
	color: ${theme.colors.informationColor};
	background: ${withBackground && tint(0.95, theme.colors.informationColor)};
	box-shadow: ${withBackground && `0 1px 2px ${tint(0.75, theme.colors.informationColor)}`};
`,
);

export default React.memo(InlineMessageInformation);
