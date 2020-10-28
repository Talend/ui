import React from 'react';
import { shallow } from 'enzyme';
import { RatioBar } from './RatioBar.component';

describe('RatioBar', () => {
    describe('RatioBar component', () => {
        it('should render an empty bar', () => {
            // given
            const props = {
                amount: 0,
                total: 12,
            };
            // when
            const wrapper = shallow(<RatioBar {...props} />);
            // then
            expect(wrapper.find('FilledLine').props()).toEqual({ percentage: 0, value: 0 });
            expect(wrapper.find('EmptyLine').props()).toEqual({ percentage: 100, value: 12 });
            expect(wrapper.find('.tc-ratio-bar-counter').text()).toEqual('0/12');
        });

        it('should render a not applicable chart', () => {
            // given
            const props = {
                amount: null,
                total: 12,
            };
            // when
            const wrapper = shallow(<RatioBar {...props} />);
            // then
            expect(wrapper.find('FilledLine').props()).toEqual({ percentage: 0, value: 0 });
            expect(wrapper.find('EmptyLine').props()).toEqual({ percentage: 100, value: 12 });
            expect(wrapper.find('Trans').length).toBe(1);
        });

        it('should render an full sized chart', () => {
            // given
            const props = {
                amount: 12,
                total: 12,
            };
            // when
            const wrapper = shallow(<RatioBar {...props} />);
            // then
            expect(wrapper.find('FilledLine').props()).toEqual({ percentage: 100, value: 12 });
            expect(wrapper.find('EmptyLine').props()).toEqual({ percentage: 0, value: 0 });
            expect(wrapper.find('.tc-ratio-bar-counter').text()).toEqual('12/12');
        });

        it('should render a classic ratio bar', () => {
            // given
            const props = {
                amount: 5,
                total: 12,
            };
            // when
            const wrapper = shallow(<RatioBar {...props} />);
            // then
            expect(wrapper.find('FilledLine').props()).toEqual({
                percentage: 41.66666666666667,
                value: 5,
            });
            expect(wrapper.find('EmptyLine').props()).toEqual({
                percentage: 58.33333333333333,
                value: 7,
            });
            expect(wrapper.find('.tc-ratio-bar-counter').text()).toEqual('5/12');
        });
    });
});
