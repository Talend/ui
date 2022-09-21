import React, { ReactElement, useState } from 'react';

type AccordionPropsType = {
	children: ReactElement[];
};

const Accordion = ({ children }: AccordionPropsType) => {
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
				key: index,
				onToggleExpanded: handleToggle,
			});
		});
	};

	return <>{getItems()}</>;
};

Accordion.displayName = 'Accordion';

export default Accordion;
