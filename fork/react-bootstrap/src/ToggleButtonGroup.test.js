import { render } from '@testing-library/react';

import ToggleButtonGroup from './ToggleButtonGroup';

describe('ToggleButtonGroup', () => {
  it('should render checkboxes', () => {
    render(
      <ToggleButtonGroup type="checkbox">
        <ToggleButtonGroup.Button value={1}>Option 1</ToggleButtonGroup.Button>
        <ToggleButtonGroup.Button value={2}>Option 2</ToggleButtonGroup.Button>
        <ToggleButtonGroup.Button value={3}>Option 3</ToggleButtonGroup.Button>
      </ToggleButtonGroup>
    );
    expect(document.querySelectorAll('input[type="checkbox"]')).toHaveLength(3);
  });

  it('should render radios', () => {
    render(
      <ToggleButtonGroup type="radio" name="items">
        <ToggleButtonGroup.Button value={1}>Option 1</ToggleButtonGroup.Button>
        <ToggleButtonGroup.Button value={2}>Option 2</ToggleButtonGroup.Button>
        <ToggleButtonGroup.Button value={3}>Option 3</ToggleButtonGroup.Button>
      </ToggleButtonGroup>
    );
    expect(document.querySelectorAll('input[type="radio"]')).toHaveLength(3);
  });

  // xit('should select initial values', () => {
  //   mount(
  //     <ToggleButtonGroup type="checkbox" defaultValue={[1, 3]}>
  //       <ToggleButtonGroup.Button value={1}>Option 1</ToggleButtonGroup.Button>
  //       <ToggleButtonGroup.Button value={2}>Option 2</ToggleButtonGroup.Button>
  //       <ToggleButtonGroup.Button value={3}>Option 3</ToggleButtonGroup.Button>
  //     </ToggleButtonGroup>
  //   )
  //     .find('input[checked=true]')
  //     .length.should.equal(2);
  // });

  // xit('should disable radios', () => {
  //   mount(
  //     <ToggleButtonGroup type="radio" name="items">
  //       <ToggleButtonGroup.Button value={1} disabled>
  //         Option 1
  //       </ToggleButtonGroup.Button>
  //       <ToggleButtonGroup.Button value={2} disabled>
  //         Option 2
  //       </ToggleButtonGroup.Button>
  //       <ToggleButtonGroup.Button value={3}>Option 3</ToggleButtonGroup.Button>
  //     </ToggleButtonGroup>
  //   )
  //     .find('input[disabled=true]')
  //     .length.should.equal(2);
  // });

  // xit('should return an array of values', () => {
  //   const spy = sinon.spy();
  //   mount(
  //     <ToggleButtonGroup type="checkbox" onChange={spy}>
  //       <ToggleButtonGroup.Button value={1}>Option 1</ToggleButtonGroup.Button>
  //       <ToggleButtonGroup.Button value={2}>Option 2</ToggleButtonGroup.Button>
  //       <ToggleButtonGroup.Button value={3}>Option 3</ToggleButtonGroup.Button>
  //     </ToggleButtonGroup>
  //   )
  //     .find('input[type="checkbox"]')
  //     .at(1)
  //     .simulate('change');

  //   spy.should.have.been.calledWith([2]);
  // });

  // xit('should return a single value', () => {
  //   const spy = sinon.spy();
  //   mount(
  //     <ToggleButtonGroup type="radio" name="items" onChange={spy}>
  //       <ToggleButtonGroup.Button value={1}>Option 1</ToggleButtonGroup.Button>
  //       <ToggleButtonGroup.Button value={2}>Option 2</ToggleButtonGroup.Button>
  //       <ToggleButtonGroup.Button value={3}>Option 3</ToggleButtonGroup.Button>
  //     </ToggleButtonGroup>
  //   )
  //     .find('input[type="radio"]')
  //     .at(1)
  //     .simulate('change');

  //   spy.should.have.been.calledWith(2);
  // });
});
