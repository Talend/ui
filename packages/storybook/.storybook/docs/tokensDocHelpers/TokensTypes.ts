import type { PropsWithChildren } from 'react';
import { Token, Tokens } from '../../../src/tokens/types';

export type TokensProps = PropsWithChildren<any> & {
	tokens: Tokens;
};

export type PropsWithToken = {
	token: Token;
};
