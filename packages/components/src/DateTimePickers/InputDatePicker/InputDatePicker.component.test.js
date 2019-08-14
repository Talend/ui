import React from 'react';
import { shallow } from 'enzyme';
import InputDatePicker from './InputDatePicker.component';

describe('InputDatePicker', ()=> {
    it('should render', ()=> {
        const props = {
        };
        const wrapper = shallow(<InputDatePicker {...props} />);

        expect(wrapper.find('DateTime.Input').length).toBe(1);
        expect(wrapper.find('DateTime.Picker').length).toBe(1);
    });
})
