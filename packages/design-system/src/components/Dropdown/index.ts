import React from 'react';
import Dropdown from './Dropdown';

const DropdownComponent = Dropdown as typeof Dropdown & {
	Separator: typeof React.Fragment;
};

DropdownComponent.Separator = React.Fragment;

export default DropdownComponent;
