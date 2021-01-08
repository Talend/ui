import React from 'react';
import { CompositeItem, useDisclosureState } from 'reakit';
import * as S from './Accordion.style';
import { Icon } from '../Icon';

export type AccordionItemProps = React.PropsWithChildren<any> & {
	disclosure: React.ReactElement;
	visible?: boolean;
};

const AccordionItem = ({ id, disclosure, children, visible, ...rest }: AccordionItemProps) => {
	const disclosureState = useDisclosureState({ visible });

	React.useEffect(() => (rest.currentId === id ? disclosureState.show() : disclosureState.hide()), [
		id,
		rest.currentId,
		disclosureState,
	]);

	return (
		<S.AccordionItem>
			<CompositeItem as={S.DisclosureHeading} {...disclosureState} id={id} {...rest}>
				{disclosure}
				<S.DisclosureArrow>
					<Icon
						name="talend-caret-down"
						transform={disclosureState.visible ? 'rotate-180' : ''}
						currentColor
					/>
				</S.DisclosureArrow>
			</CompositeItem>
			<S.DisclosureContent {...disclosureState}>{children}</S.DisclosureContent>
		</S.AccordionItem>
	);
};

export default AccordionItem;
