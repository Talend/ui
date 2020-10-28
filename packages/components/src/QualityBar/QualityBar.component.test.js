import React from 'react';
import { shallow } from 'enzyme';
import { QualityBar } from './QualityBar.component';

describe('QualityBar', () => {
    describe('QualityBar component', () => {
        it('should render an chart', () => {
            // given
            const props = {
                valid: 523,
                invalid: 123,
                empty: 332,
            };
            // when
            const wrapper = shallow(<QualityBar {...props} />);
            // then
            expect(wrapper.find('QualityInvalidLine').props().percentage).toBe(12.6);
            expect(wrapper.find('QualityInvalidLine').props().value).toBe(123);
            expect(wrapper.find('QualityEmptyLine').props().percentage).toBe(33.9);
            expect(wrapper.find('QualityEmptyLine').props().value).toBe(332);
            expect(wrapper.find('QualityValidLine').props().percentage).toBe(53.5);
            expect(wrapper.find('QualityValidLine').props().value).toBe(523);
        });
    });
});
