import React from 'react';
import { Tokens, Token } from '../types';

export type TokensProps = React.PropsWithChildren<any> & {
	tokens: Tokens;
};

export type PropsWithToken = {
	token: Token;
};
