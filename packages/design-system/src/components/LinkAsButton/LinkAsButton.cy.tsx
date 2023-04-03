/* eslint-disable testing-library/await-async-query */
/* eslint-disable testing-library/prefer-screen-queries */
import { LinkAsButton } from './';

context('<LinkAsButton />', () => {
	it('should render', () => {
		cy.mount(<LinkAsButton data-testid="my.link">Link example</LinkAsButton>);
		cy.findByTestId('my.link').should('have.text', 'Link example');
	});

	it('should render icon before', () => {
		cy.mount(<LinkAsButton icon="information-filled">Link example</LinkAsButton>);
		cy.findByTestId('link.icon.before').should('be.visible');
	});

	it('should render external', () => {
		cy.mount(<LinkAsButton openInNewTab>Link example</LinkAsButton>);
		cy.findByTestId('link.icon.external').should('be.visible');
	});
});
