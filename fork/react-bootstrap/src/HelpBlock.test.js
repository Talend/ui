import React from 'react';
import { render, screen } from '@testing-library/react';
import { shallow } from 'enzyme';

import HelpBlock from './HelpBlock';

describe('<HelpBlock>', () => {
  it('should render correctly', () => {
    // given
    render(
      <HelpBlock data-testid="foo" id="foo" className="my-help-block">
        Help contents
      </HelpBlock>
    );

    // then
    expect(screen.getByText('Help contents')).toBeInTheDocument();
    expect(screen.getByText('Help contents')).toHaveClass(
      'help-block my-help-block'
    );
  });
});
