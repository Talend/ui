import React from 'react';
import PropTypes from 'prop-types';
import { act } from 'react-dom/test-utils';
import { mount } from 'enzyme';
import useLocaStorage from './useLocalStorage.hook';

const Div = () => <div />;
function LSComponent({ localStorageKey, initialValue }) {
	const [value, onChange] = useLocaStorage(localStorageKey, initialValue);
	return <Div id="mainChild" value={value} onChange={onChange} />;
}
LSComponent.propTypes = {
	localStorageKey: PropTypes.string,
	initialValue: PropTypes.any,
};

describe('useLocalStorage', () => {
	it('should NOT set initial value in localStorage', () => {
		// given
		expect(global.localStorage.lolKey).toBeUndefined();

		// when
		mount(<LSComponent localStorageKey="lolKey" initialValue="lol" />);

		// then
		expect(global.localStorage.lolKey).toBeUndefined();
	});

	it('should set value in localStorage on change', () => {
		// given
		expect(global.localStorage.lolKey).toBeUndefined();
		const wrapper = mount(<LSComponent localStorageKey="lolKey" initialValue="lol" />);

		// when
		act(() => {
			const setValue = wrapper.find('#mainChild').prop('onChange');
			setValue('mdr');
		});

		// then
		expect(global.localStorage.lolKey).toBe('mdr');
	});
});
