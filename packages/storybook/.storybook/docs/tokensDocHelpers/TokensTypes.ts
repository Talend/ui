import * as React from 'react';
import { Token, Tokens } from '../../../src/tokens/types';

export type TokensProps = React.PropsWithChildren<any> & {
	tokens: Tokens;
};

export type PropsWithToken = {
	token: Token;
};
