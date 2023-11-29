import { screen, render, fireEvent } from '@testing-library/react';

import { FacetedManager } from '../FacetedManager';
import { AdvancedSearch } from './AdvancedSearch.component';

describe('AdvancedSearch', () => {
	const id = 'some-id';
	const onSubmit = jest.fn();
	const t = jest.fn();
	it('should render by default', () => {
		// given nothing
		// when
		const { container } = render(
			<FacetedManager id={id} t={t}>
				<AdvancedSearch onSubmit={onSubmit} />
			</FacetedManager>,
		);
		// then
		expect(container.firstChild).toMatchSnapshot();
	});
	it('should initialize with a initial query', () => {
		// given
		const initialQuery = 'my initial query';
		// when
		render(
			<FacetedManager id={id} t={t}>
				<AdvancedSearch initialQuery={initialQuery} onSubmit={onSubmit} />
			</FacetedManager>,
		);
		// then
		expect(screen.getByRole('search')).toHaveValue(initialQuery);
	});
	it('should update the query when input change', () => {
		// given
		const query = 'my new query';
		// when
		render(
			<FacetedManager id={id} t={t}>
				<AdvancedSearch onSubmit={onSubmit} />
			</FacetedManager>,
		);
		fireEvent.change(screen.getByRole('search'), { target: { value: query } });
		// then
		expect(screen.getByRole('search')).toHaveValue(query);
	});
	it('should call the onChange props when input change', () => {
		// given
		const onChange = jest.fn();
		const query = 'my new query';
		// when
		render(
			<FacetedManager id={id} t={t}>
				<AdvancedSearch onChange={onChange} onSubmit={onSubmit} />
			</FacetedManager>,
		);
		fireEvent.change(screen.getByRole('search'), { target: { value: query } });
		// then
		expect(onChange).toHaveBeenCalled();
		expect(onChange.mock.calls.length).toBe(1);
		expect(onChange.mock.calls[0][1]).toBe(query);
	});
	it('should call the onSubmit when pressing Enter in input', () => {
		// given nothing
		// when
		render(
			<FacetedManager id={id} t={t}>
				<AdvancedSearch onSubmit={onSubmit} />
			</FacetedManager>,
		);
		fireEvent.keyDown(screen.getByRole('search'), { key: 'Enter' });
		// then
		expect(onSubmit).toHaveBeenCalled();
		expect(onSubmit.mock.calls.length).toBe(1);
	});
	it('should call the props onKeyDown when pressing Enter in input', () => {
		// given
		const onKeyDown = jest.fn();
		// when
		render(
			<FacetedManager id={id} t={t}>
				<AdvancedSearch onKeyDown={onKeyDown} onSubmit={onSubmit} />
			</FacetedManager>,
		);
		fireEvent.keyDown(screen.getByRole('search'), { key: 'Enter' });
		// then
		expect(onKeyDown).toHaveBeenCalled();
		expect(onKeyDown.mock.calls.length).toBe(1);
	});
	it('should render with an explicit error', () => {
		// given
		const error = 'my Explicit Error';
		// when
		render(
			<FacetedManager id={id} error={error} t={t}>
				<AdvancedSearch onSubmit={onSubmit} />
			</FacetedManager>,
		);
		// then
		expect(screen.getByRole('status')).toHaveTextContent(error);
	});
	it('should render in progress mode when inProgress is truthy', () => {
		// given
		const inProgress = true;
		// when
		render(
			<FacetedManager id={id} inProgress={inProgress} t={t}>
				<AdvancedSearch onSubmit={onSubmit} />
			</FacetedManager>,
		);
		// then
		const buttons = document.querySelectorAll('button');
		expect(buttons.length).toBe(2);
		expect(buttons[0]).toBeDisabled();
		expect(buttons[1]).toBeDisabled();
	});
});
