import { forwardRef, ReactElement, Ref } from 'react';

import { Linkable, LinkableType } from '../../Linkable';
import styles from './DropdownEntry.module.css';

export type DropdownLinkType = LinkableType;

// Extend Linkable with props from Dropdown
// Since MenuItem and Linkable both have an `as` prop, this enables passing `as` to Linkable.
const LocalLink = forwardRef(
	(
		localProps: DropdownLinkType & { asPassThrough?: ReactElement },
		ref: Ref<HTMLAnchorElement>,
	) => {
		const { asPassThrough, ...rest } = localProps;
		return <Linkable {...rest} className={styles.dropdownEntry} as={asPassThrough} ref={ref} />;
	},
);
LocalLink.displayName = 'LocalLink';

const DropdownLink = forwardRef(
	({ children, as, ...props }: DropdownLinkType, ref: Ref<HTMLAnchorElement>) => {
		return (
			<LocalLink {...props} ref={ref}>
				{children}
			</LocalLink>
		);
	},
);
DropdownLink.displayName = 'DropdownLink';
export default DropdownLink;
