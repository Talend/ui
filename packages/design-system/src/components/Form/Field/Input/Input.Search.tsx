import React, { forwardRef, Ref } from 'react';
import { FieldPropsPrimitive, InputPrimitiveProps } from '../../../WIP/FormPrimitives/index';
import Input from './Input';

type InputSearchProps = FieldPropsPrimitive &
	Omit<InputPrimitiveProps, 'className' | 'styles' | 'type'>;

const Search = forwardRef((props: InputSearchProps, ref: Ref<HTMLInputElement>) => {
	return <Input {...props} type="search" ref={ref} />;
});

Search.displayName = 'Search';

export default Search;
