import Accordion from './Accordion';
import AccordionItem from './AccordionItem';

const AccordionComponent = Accordion as typeof Accordion & {
	Item: typeof AccordionItem;
};

AccordionComponent.Item = AccordionItem;

export default AccordionComponent;
