import React from 'react';

import Input, { InputProps } from './Input';
import { Icon } from '../../../Icon';

const Search = React.forwardRef((props: InputProps, ref: React.Ref<HTMLInputElement>) => {
	return (
		<Input
			{...props}
			type="search"
			// @ts-ignore
			before={<Icon name="talend-search" />}
			ref={ref}
		/>
	);
});

export default Search;
