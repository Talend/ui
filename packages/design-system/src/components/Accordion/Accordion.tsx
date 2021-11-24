import React from 'react';
import { useCompositeState } from 'reakit';
import * as S from './Accordion.style';

export type AccordionProps = React.PropsWithChildren<any> & {
	selectedId?: string;
};

const Accordion = React.forwardRef<React.ReactElement, React.PropsWithChildren<any>>(
	({ selectedId, children, ...rest }: AccordionProps, ref) => {
		const composite = useCompositeState({});

		return (
			<S.Accordion {...composite} ref={ref} {...rest}>
				{children.map((child: React.ReactElement, key: number) =>
					React.cloneElement(child, {
						id: `${composite.baseId}-${key + 1}`,
						...composite,
						...child.props,
					}),
				)}
			</S.Accordion>
		);
	},
);

export default Accordion;
