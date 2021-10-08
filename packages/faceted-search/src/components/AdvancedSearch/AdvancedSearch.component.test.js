import React from 'react';
import { act } from 'react-dom/test-utils';
import keycode from 'keycode';
// eslint-disable-next-line import/no-extraneous-dependencies
import { mount } from 'enzyme';

import { FacetedManager } from '../FacetedManager';
import { AdvancedSearch } from './AdvancedSearch.component';

describe('AdvancedSearch', () => {
	const id = 'some-id';
	const onSubmit = jest.fn();
	const t = jest.fn();
	it('should render by default', () => {
		// given nothing
		// when
		const wrapper = mount(
			<FacetedManager id={id} t={t}>
				<AdvancedSearch onSubmit={onSubmit} />
			</FacetedManager>,
		);
		// then
		expect(wrapper.html()).toMatchSnapshot();
	});
	it('should initialize with a initial query', () => {
		// given
		const initialQuery = 'my initial query';
		// when
		const wrapper = mount(
			<FacetedManager id={id} t={t}>
				<AdvancedSearch initialQuery={initialQuery} onSubmit={onSubmit} />
			</FacetedManager>,
		);
		// then
		expect(wrapper.find('input#some-id-form').prop('value')).toBe(initialQuery);
	});
	it('should update the query when input change', () => {
		// given
		const query = 'my new query';
		// when
		const wrapper = mount(
			<FacetedManager id={id} t={t}>
				<AdvancedSearch onSubmit={onSubmit} />
			</FacetedManager>,
		);
		act(() => {
			wrapper.find('input#some-id-form').simulate('change', { target: { value: query } });
		});
		wrapper.update();
		// then
		expect(wrapper.find('input#some-id-form').prop('value')).toBe(query);
	});
	it('should call the onChange props when input change', () => {
		// given
		const onChange = jest.fn();
		const query = 'my new query';
		// when
		const wrapper = mount(
			<FacetedManager id={id} t={t}>
				<AdvancedSearch onChange={onChange} onSubmit={onSubmit} />
			</FacetedManager>,
		);
		act(() => {
			wrapper.find('input#some-id-form').simulate('change', { target: { value: query } });
		});
		// then
		expect(onChange).toHaveBeenCalled();
		expect(onChange.mock.calls.length).toBe(1);
		expect(onChange.mock.calls[0][1]).toBe(query);
	});
	it('should call the onSubmit when pressing Enter in input', () => {
		// given nothing
		// when
		const wrapper = mount(
			<FacetedManager id={id} t={t}>
				<AdvancedSearch onSubmit={onSubmit} />
			</FacetedManager>,
		);
		act(() => {
			wrapper.find('input#some-id-form').simulate('keyDown', { keyCode: keycode.codes.enter });
		});
		// then
		expect(onSubmit).toHaveBeenCalled();
		expect(onSubmit.mock.calls.length).toBe(1);
	});
	it('should call the props onKeyDown when pressing Enter in input', () => {
		// given
		const onKeyDown = jest.fn();
		// when
		const wrapper = mount(
			<FacetedManager id={id} t={t}>
				<AdvancedSearch onKeyDown={onKeyDown} onSubmit={onSubmit} />
			</FacetedManager>,
		);
		act(() => {
			wrapper.find('input#some-id-form').simulate('keyDown', { keyCode: keycode.codes.enter });
		});
		// then
		expect(onKeyDown).toHaveBeenCalled();
		expect(onKeyDown.mock.calls.length).toBe(1);
	});
	it('should render with an explicit error', () => {
		// given
		const error = 'my Explicit Error';
		// when
		const wrapper = mount(
			<FacetedManager id={id} error={error} t={t}>
				<AdvancedSearch onSubmit={onSubmit} />
			</FacetedManager>,
		);
		// then
		expect(wrapper.html()).toMatchSnapshot();
	});
	it('should render in progress mode when inProgress is truthy', () => {
		// given
		const inProgress = true;
		// when
		const wrapper = mount(
			<FacetedManager id={id} inProgress={inProgress} t={t}>
				<AdvancedSearch onSubmit={onSubmit} />
			</FacetedManager>,
		);
		// then
		expect(wrapper.find('svg[aria-busy="true"]').prop('className')).toEqual(
			'tc-circular-progress theme-loader theme-animate theme-small',
		);
	});
});
