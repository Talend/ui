import api from '../src/api';

describe('uiAbstraction api', () => {
  it('provide action, route access', () => {
    expect(typeof api.action).toBe('object');
  });
});
