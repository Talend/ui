import route from '../src/route';
import registry from '../src/registry';

describe('uiAbstraction route', () => {
  it('registerComponent', () => {
    function C1() {}
    const emptyRegistry = {};
    registry.Registry._registry = emptyRegistry;
    route.registerComponent('C1', C1);
    expect(emptyRegistry['_.route.component:C1']).toBe(C1);
  });
});
