import React from 'react';
import { Disclosure, useDisclosureState } from 'reakit';
import { AccordionContext } from './Accordion';
import * as S from './Accordion.style';
import { Icon } from '../../index';

export type AccordionItemProps = React.PropsWithChildren<any> & {
	disclosure: React.ReactNode;
	visible?: boolean;
};

const AccordionItem = ({ id, disclosure, children, visible }: AccordionItemProps) => {
	const accordion = React.useContext(AccordionContext);
	const disclosureId = `accordion-disclosure-${id}`;
	const disclosureState = useDisclosureState({ visible });

	React.useEffect(() => {
		if (visible) {
			accordion.setSelected(disclosureId);
		}
	}, [visible]);

	React.useEffect(
		() => (accordion.selected === disclosureId ? disclosureState.show() : disclosureState.hide()),
		[accordion.selected],
	);

	return (
		<S.DisclosureWrapper>
			<Disclosure
				id={disclosureId}
				{...disclosureState}
				ref={disclosure.ref}
				{...disclosure.props}
				onClick={(event: React.MouseEvent<HTMLButtonElement>) =>
					accordion.setSelected(event.currentTarget.id)
				}
			>
				{disclosureProps => (
					<S.DisclosureHeading visible={disclosureState.visible}>
						{React.cloneElement(disclosure, disclosureProps)}
						<S.DisclosureArrow>
							<Icon
								name="talend-caret-down"
								transform={disclosureState.visible ? 'rotate-180' : ''}
								currentColor
							/>
						</S.DisclosureArrow>
					</S.DisclosureHeading>
				)}
			</Disclosure>
			<S.DisclosureContent {...disclosureState}>{children}</S.DisclosureContent>
		</S.DisclosureWrapper>
	);
};

export default AccordionItem;
