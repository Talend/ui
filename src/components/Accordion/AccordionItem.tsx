import React from 'react';
import { CompositeItem, Disclosure, useDisclosureState } from 'reakit';
import * as S from './Accordion.style';
import { Icon } from '../../index';

export type AccordionItemProps = React.PropsWithChildren<any> & {
	disclosure: React.ReactNode;
	visible?: boolean;
};

const AccordionItem = ({ id, disclosure, children, visible, ...rest }: AccordionItemProps) => {
	const disclosureState = useDisclosureState({ visible });

	React.useEffect(() => (rest.currentId === id ? disclosureState.show() : disclosureState.hide()), [
		rest.currentId,
		disclosure,
	]);

	return (
		<S.DisclosureWrapper>
			<CompositeItem as="div" id={id} {...disclosureState} {...rest}>
				<S.DisclosureHeading visible={disclosureState.visible}>
					{disclosure}
					<S.DisclosureArrow>
						<Icon
							name="talend-caret-down"
							transform={disclosureState.visible ? 'rotate-180' : ''}
							currentColor
						/>
					</S.DisclosureArrow>
				</S.DisclosureHeading>
			</CompositeItem>
			<S.DisclosureContent {...disclosureState}>{children}</S.DisclosureContent>
		</S.DisclosureWrapper>
	);
};

export default AccordionItem;
