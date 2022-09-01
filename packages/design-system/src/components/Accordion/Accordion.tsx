import React from 'react';
import { useCompositeState, CompositeProps as ReakitCompositeProps } from 'reakit';

import * as S from './Accordion.style';

export type AccordionProps = React.PropsWithChildren<any> & {
	selectedId?: string;
};

const Accordion = React.forwardRef(
	({ selectedId, children, ...rest }: AccordionProps, ref: React.Ref<ReakitCompositeProps>) => {
		const composite = useCompositeState({});

		return null;
	},
);

export default Accordion;
