import React, { forwardRef, Ref } from 'react';
import EmptyStatePrimitive, { EmptyStatePrimitiveProps } from '../primitive/EmptyStatePrimitive';

import styles from './EmptyStateMedium.module.scss';

type EmptyStateLargeProps = Omit<EmptyStatePrimitiveProps, 'illustration'> & {
	callback?: never;
};

const EmptyStateMedium = forwardRef((props: EmptyStateLargeProps, ref: Ref<HTMLElement>) => {
	return (
		<EmptyStatePrimitive
			{...props}
			illustration={
				<svg
					width="41"
					height="40"
					fill="none"
					xmlns="http://www.w3.org/2000/svg"
					className={styles.mediumIllustration}
				>
					<path
						d="M9.618 21.984c0-1.537 1.278-2.783 2.855-2.783h5.71c1.576 0 2.854 1.246 2.854 2.783v8.348c0 1.536-1.278 2.782-2.855 2.782h-5.71c-1.576 0-2.854-1.246-2.854-2.782v-8.348Z"
						fill="var(--coral-color-illustration-color-04)"
					/>
					<path
						d="M19.073 29.88a3.12 3.12 0 0 1-2.75 1.617h-6.22c-1.717 0-3.109-1.357-3.109-3.03v-9.092c0-1.674 1.392-3.031 3.11-3.031h6.218c1.718 0 3.11 1.357 3.11 3.03v7.274"
						stroke="var(--coral-color-illustration-color-06)"
						strokeWidth="2"
						strokeLinecap="round"
					/>
					<path
						d="M24.648 19.46c0-.829.674-1.5 1.505-1.5h6.018c.831 0 1.505.671 1.505 1.5 0 .828-.674 1.5-1.505 1.5h-6.018c-.83 0-1.505-.672-1.505-1.5ZM24.648 25.52c0-.828.674-1.5 1.505-1.5h6.018c.831 0 1.505.672 1.505 1.5 0 .829-.674 1.5-1.505 1.5h-6.018c-.83 0-1.505-.671-1.505-1.5ZM24.648 31.583c0-.828.674-1.5 1.505-1.5h3.01c.83 0 1.504.672 1.504 1.5s-.674 1.5-1.505 1.5h-3.009c-.83 0-1.505-.672-1.505-1.5Z"
						fill="var(--coral-color-illustration-color-03)"
					/>
					<path
						fillRule="evenodd"
						clipRule="evenodd"
						d="M1.98 14.825v-4.55c0-3.426 2.758-6.204 6.16-6.204h24.64c3.402 0 6.16 2.778 6.16 6.204v4.55H1.98Zm7.512-7.183a1.5 1.5 0 1 0-3 0 1.5 1.5 0 0 0 3 0Zm4.514 0a1.5 1.5 0 1 0-3 0 1.5 1.5 0 0 0 3 0Zm3.014-1.5a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Z"
						fill="var(--coral-color-illustration-color-03)"
					/>
					<path
						d="M1.979 9.07c0-3.347 2.694-6.061 6.018-6.061H32.07c3.324 0 6.018 2.714 6.018 6.061v21.215c0 1.652-.656 3.15-1.72 4.243m-10.43 1.818H7.997c-3.324 0-6.018-2.714-6.018-6.061V14.826"
						stroke="var(--coral-color-illustration-color-06)"
						strokeWidth="2"
						strokeLinecap="round"
					/>
					<circle cx="24.221" cy="18.164" r="1" fill="var(--coral-color-illustration-color-06)" />
					<circle cx="27.657" cy="18.164" r="1" fill="var(--coral-color-illustration-color-06)" />
					<circle cx="29.666" cy="36.346" r="1" fill="var(--coral-color-illustration-color-06)" />
					<circle cx="33.332" cy="35.945" r="1" fill="var(--coral-color-illustration-color-06)" />
					<path
						d="M30.531 18.163h2.643m-1.805 6.162h-7.523m0 6.163h4.212"
						stroke="var(--coral-color-illustration-color-06)"
						strokeWidth="2"
						strokeLinecap="round"
					/>
				</svg>
			}
			ref={ref}
		/>
	);
});

export default EmptyStateMedium;
