import React from 'react';
import { useCompositeState, Composite, CompositeItem } from 'reakit/Composite';
import { useDisclosureState, Disclosure, DisclosureContent } from 'reakit/Disclosure';

const AccordionContext = React.createContext();

function useAccordionState({ selectedId }) {
	const [selected, setSelected] = React.useState(selectedId);
	return {
		selected,
		setSelected: id => {
			setSelected(id != selected ? id : undefined);
		},
	};
}

const Accordion = ({ selectedId, children, ...rest }) => {
	const accordion = useAccordionState({ selectedId });
	const composite = useCompositeState({});
	return (
		<AccordionContext.Provider value={accordion}>
			<Composite {...composite} {...rest}>
				{children.map((child, id) => (
					<CompositeItem
						as={'div'}
						{...composite}
						key={id}
						id={id}
						onClick={() => accordion.setSelected(`accordion-disclosure-${id}`)}
					>
						{React.cloneElement(child, { id, ...child.props })}
					</CompositeItem>
				))}
			</Composite>
		</AccordionContext.Provider>
	);
};

const Item = ({ id, disclosure, children, visible }) => {
	const accordion = React.useContext(AccordionContext);
	const disclosureId = `accordion-disclosure-${id}`;
	const disclosureState = useDisclosureState({ visible });

	React.useEffect(() => {
		accordion.selected == disclosureId ? disclosureState.show() : disclosureState.hide();
	}, [accordion.selected]);

	return (
		<>
			<Disclosure
				id={disclosureId}
				{...disclosureState}
				ref={disclosure.ref}
				{...disclosure.props}
				onClick={event => accordion.setSelected(event.currentTarget.id)}
			>
				{disclosureProps => React.cloneElement(disclosure, disclosureProps)}
			</Disclosure>
			<DisclosureContent {...disclosureState}>{children}</DisclosureContent>
		</>
	);
};

Accordion.Item = Item;

export default Accordion;
