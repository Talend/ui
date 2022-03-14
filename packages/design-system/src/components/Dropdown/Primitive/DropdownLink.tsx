import React, { forwardRef, ReactElement, Ref } from 'react';
import { MenuItem, MenuItemProps } from 'reakit';
import Linkable, { LinkableType } from '../../Linkable';

import styles from './DropdownEntry.module.scss';

type LinkProps = LinkableType & MenuItemProps;

const LocalLink = forwardRef(
	(localProps: LinkProps & { asPassThrough?: ReactElement }, ref: Ref<HTMLAnchorElement>) => {
		const { asPassThrough, ...rest } = localProps;
		return (
			<Linkable
				className={styles.dropdownEntry}
				isNaturallyAligned
				as={asPassThrough}
				ref={ref}
				{...rest}
			/>
		);
	},
);

const DropdownLink = forwardRef(
	({ children, as, ...props }: LinkProps, ref: Ref<HTMLAnchorElement>) => {
		return (
			<MenuItem as={LocalLink} asPassThrough={as !== 'a' ? as : undefined} {...props} ref={ref}>
				{children}
			</MenuItem>
		);
	},
);

export default DropdownLink;
