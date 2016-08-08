import React from 'react';
import LinksDispatcher from '../src/LinksDispatcher';
import LinkDispatcher from '../src/LinkDispatcher';
import { shallow } from 'enzyme';

describe('LinksDispatcher', () => {
  let settings;
  let state;
  let context;

  beforeEach(() => {
    settings = require('./settings.json');
    state = {
      settings,
    };
    context = {
      store: {
        getState() {
          return state;
        },
      },
    };
  });

  const childContextTypes = {
    store: React.PropTypes.object,
  };
  it('should display many LinksDispatcher', () => {
    const wrapper = shallow(
      <LinksDispatcher contentType="article" category="primary" />,
      { context, childContextTypes }
    );
    const found = wrapper.find(LinkDispatcher);
    expect(found.length).toBe(2);
  });
});
