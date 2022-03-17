import React, { forwardRef, HTMLAttributes, Ref } from 'react';

type EmptyStateProps = Omit<HTMLAttributes<HTMLElement>, 'className' | 'style'> & {
	title: string;
	description: string;
};

const EmptyState = forwardRef(
	({ title, description, ...rest }: EmptyStateProps, ref: Ref<HTMLElement>) => {
		return (
			<article ref={ref} {...rest}>
				<h3>{title}</h3>
				<p>{description}</p>
			</article>
		);
	},
);

export default EmptyState;
