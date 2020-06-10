import React from 'react';
import Input from './Input';
import Icon from '../../../Icon';

function Search(props) {
	return <Input type="search" {...props} after={<Icon name="search" />} />;
}

export default Search;
