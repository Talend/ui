/* eslint-disable testing-library/await-async-query */
/* eslint-disable testing-library/prefer-screen-queries */
import { Tag } from '.';
import { TagVariant } from './Tag';

context('<Tag />', () => {
	it('should render', () => {
		cy.mount(<Tag data-testid="my.tag" />);
		cy.findByTestId('my.tag').should('to.exist');
	});
	it('should render variant information', () => {
		cy.mount(<Tag data-testid="my.tag" variant={TagVariant.information} />);
		cy.findByTestId('my.tag').should('to.exist');
	});
	it('should render variant destructive', () => {
		cy.mount(<Tag data-testid="my.tag" variant={TagVariant.destructive} />);
		cy.findByTestId('my.tag').should('to.exist');
	});
	it('should render variant success', () => {
		cy.mount(<Tag data-testid="my.tag" variant={TagVariant.success} />);
		cy.findByTestId('my.tag').should('to.exist');
	});
	it('should render variant warning', () => {
		cy.mount(<Tag data-testid="my.tag" variant={TagVariant.warning} />);
		cy.findByTestId('my.tag').should('to.exist');
	});
	it('should render variant beta', () => {
		cy.mount(<Tag data-testid="my.tag" variant={TagVariant.beta} />);
		cy.findByTestId('my.tag').should('to.exist');
	});
});
