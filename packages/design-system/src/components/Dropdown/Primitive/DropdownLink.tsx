import React, { forwardRef, ReactElement, Ref } from 'react';
import { MenuItem, MenuItemProps } from 'reakit';
import Linkable, { LinkableType } from '../../Linkable';

import styles from './DropdownEntry.module.scss';

export type DropdownLinkType = LinkableType & MenuItemProps;

// Extend Linkable with props from Dropdown
// Since MenuItem and Linkable both have an `as` prop, this enables passing `as` to Linkable.
const LocalLink = forwardRef(
	(
		localProps: DropdownLinkType & { asPassThrough?: ReactElement },
		ref: Ref<HTMLAnchorElement>,
	) => {
		const { asPassThrough, ...rest } = localProps;
		return <Linkable className={styles.dropdownEntry} as={asPassThrough} ref={ref} {...rest} />;
	},
);

const DropdownLink = forwardRef(
	({ children, as, ...props }: DropdownLinkType, ref: Ref<HTMLAnchorElement>) => {
		return (
			<MenuItem as={LocalLink} asPassThrough={as !== 'a' ? as : undefined} {...props} ref={ref}>
				{children}
			</MenuItem>
		);
	},
);

export default DropdownLink;
