import React from 'react';
import { useCompositeState, Composite, CompositeItem } from 'reakit';

export type InitialAccordionState = {
	selectedId?: string;
};

export type AccordionContextType = {
	selected: string | undefined;
	setSelected: (id: string) => void;
};

export type AccordionProps = React.PropsWithChildren<any> & {
	selectedId?: string;
};

export const AccordionContext = React.createContext<AccordionContextType>({
	selected: '',
	setSelected: () => console.warn('no accordion provider'),
});

const useAccordionState = ({ selectedId }: InitialAccordionState) => {
	const [selected, setSelected] = React.useState<string | undefined>(selectedId);
	return {
		selected,
		setSelected: (id: string) => {
			setSelected(id !== selected ? id : undefined);
		},
	};
};

const Accordion = React.forwardRef<React.ReactElement, React.PropsWithChildren<any>>(
	({ selectedId, children, ...rest }: AccordionProps, ref) => {
		const accordion = useAccordionState({ selectedId });
		const composite = useCompositeState({});
		return (
			<AccordionContext.Provider value={accordion}>
				<Composite {...composite} ref={ref} {...rest}>
					{children.map((child: React.ReactElement, id: number) => (
						<CompositeItem
							as="div"
							{...composite}
							key={id}
							onClick={() => accordion.setSelected(`accordion-disclosure-${id}`)}
						>
							{React.cloneElement(child, { id, ...child.props })}
						</CompositeItem>
					))}
				</Composite>
			</AccordionContext.Provider>
		);
	},
);

export default Accordion;
