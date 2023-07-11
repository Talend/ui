import { StackVertical } from '@talend/design-system';

import { ColorToken, Token, TokenType } from '../../../src/tokens/types';
import { TokensProps } from './TokensTypes';
import BreakpointScale from './components/DefinitionList/BreakpointScale/BreakpointScale';
import DefinitionListBreakpoint from './components/DefinitionList/DefinitionListBreakpoint';

const TokensBreakpoint = ({ tokens }: TokensProps<ColorToken>) => (
	<StackVertical gap="L" justify="stretch" align="stretch">
		<BreakpointScale tokens={tokens.filter((t: Token) => t.type === TokenType.BREAKPOINT)} />
		<DefinitionListBreakpoint
			tokens={tokens.filter((t: Token) => t.type === TokenType.BREAKPOINT)}
		/>
	</StackVertical>
);

export default TokensBreakpoint;
