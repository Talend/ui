import React, { forwardRef, Ref } from 'react';
import Clickable, { ClickableProps } from '../Clickable';
import { DataAttributes } from '../../../types';
import styles from './ButtonListing.module.scss';

type ButtonListingProps = Omit<ClickableProps, 'style' | 'className'> & DataAttributes;

const ButtonListing = forwardRef((props: ButtonListingProps, ref: Ref<HTMLButtonElement>) => {
	const { children, ...rest } = props;
	return (
		<Clickable {...rest} className={styles.listingEntry} ref={ref}>
			<span className={styles.listingEntry__content}>{children}</span>
		</Clickable>
	);
});

ButtonListing.displayName = 'ButtonListing';

export default ButtonListing;
