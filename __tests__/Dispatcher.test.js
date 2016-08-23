import React from 'react';
import { shallow } from 'enzyme';
import { Dispatcher } from '../src/Dispatcher';

describe('Testing <Dispatcher />', () => {
  function replacer(k, v) {
    let val = v;
    if (typeof v === 'function') {
      val = '[Function]';
    } else if (window['File'] && v instanceof File) {
      val = '[File]';
    } else if (window['FileList'] && v instanceof FileList) {
      val = '[FileList]';
    }
    return val;
  }
  const noOp = () => {};

  it('should inject dispatchable on(event) props into its children', () => {
    const wrapper = shallow(
      <Dispatcher onClick="actionCreator:id" onStuff="another:actionCreator:id">
        <button />
      </Dispatcher>
    );
    expect(
      JSON.stringify(wrapper.find('button').props(), replacer).replace(/(\\t|\\n)/g, '')
      ).toEqual(
        JSON.stringify({ onClick: noOp, onStuff: noOp }, replacer).replace(/(\\t|\\n)/g, '')
      );
  });

  it('should have its method onEvent called when children handle an event', () => {
    const wrapper = shallow(
      <Dispatcher onClick={noOp} onStuff={noOp}>
        <button />
      </Dispatcher>
    );
    const buttonWrapper = wrapper.find('button');
    const instance = wrapper.instance();
    spyOn(instance, 'onEvent');
    buttonWrapper.simulate('click');
    expect(instance.onEvent).toHaveBeenCalled();
    expect(instance.onEvent).toHaveBeenCalledWith(undefined, 'onClick');
  });
});
