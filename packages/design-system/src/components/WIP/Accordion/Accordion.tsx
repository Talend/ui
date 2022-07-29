import React, { cloneElement, forwardRef, MouseEvent, ReactElement, Ref, useState } from 'react';

type AccordionPropsType = {
	children: ReactElement[];
};

const Accordion = forwardRef(({ children }: AccordionPropsType, ref: Ref<HTMLDivElement>) => {
	const panelCount = React.Children.count(children);
	const [openedPanelIndex, setOpenedPanelIndex] = useState<number | null>(null);

	const handleToggle = (index: number) => {
		if (index === openedPanelIndex) {
			setOpenedPanelIndex(null);
		} else {
			setOpenedPanelIndex(index);
		}
	};

	const getItems = () => {
		return React.Children.map(children, (child, index) => {
			const isFirst = index === 0;
			const isLast = index === panelCount - 1;
			const isExpanded = index === openedPanelIndex;
			return React.cloneElement(child, {
				managed: true,
				index,
				expanded: isExpanded,
				isFirst,
				isLast,
				onToggleExpanded: handleToggle,
			});
		});
	};

	return <>{getItems()}</>;
});

Accordion.displayName = 'Accordion';

export default Accordion;
