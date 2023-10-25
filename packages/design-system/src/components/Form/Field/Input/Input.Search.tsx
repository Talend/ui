import { forwardRef, Ref } from 'react';
import Input, { TypedInputFieldProps } from './Input';

const Search = forwardRef((props: TypedInputFieldProps, ref: Ref<HTMLInputElement>) => {
	return <Input {...props} type="search" ref={ref} />;
});

Search.displayName = 'Search';

export default Search;
