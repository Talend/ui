/* eslint-disable arrow-parens */
/**
 * @jest-environment jsdom
 */
import React from 'react';
import { render, screen } from '@testing-library/react';

import Collapse from './Collapse';

describe('<Collapse>', () => {
  // eslint-disable-next-line react/prop-types
  const Component = ({ children, ...props }) => (
    <Collapse getDimensionValue={() => 15} {...props}>
      <div>{children}</div>
    </Collapse>
  );

  it('Should default to collapsed', () => {
    // when
    render(<Component>Panel content</Component>);

    // then
    expect(screen.getByText('Panel content')).toHaveClass('collapse');
  });

  describe('from collapsed to expanded', () => {
    const originalOffsetHeight = Object.getOwnPropertyDescriptor(
      HTMLElement.prototype,
      'scrollHeight'
    );
    const originalOffsetWidth = Object.getOwnPropertyDescriptor(
      HTMLElement.prototype,
      'scrollWidth'
    );
    beforeAll(() => {
      Object.defineProperty(HTMLElement.prototype, 'scrollHeight', {
        configurable: true,
        value: 100,
      });
      Object.defineProperty(HTMLElement.prototype, 'scrollWidth', {
        configurable: true,
        value: 100,
      });
    });

    afterAll(() => {
      if (originalOffsetHeight) {
        Object.defineProperty(
          HTMLElement.prototype,
          'scrollHeight',
          originalOffsetHeight
        );
      }
      if (originalOffsetWidth) {
        Object.defineProperty(
          HTMLElement.prototype,
          'scrollWidth',
          originalOffsetWidth
        );
      }
    });

    it('Should have collapsing class', () => {
      // given
      const { rerender } = render(<Component>Panel content</Component>);
      expect(screen.getByText('Panel content')).not.toHaveClass('collapsing');

      // when
      rerender(<Component in>Panel content</Component>);

      // then
      expect(screen.getByText('Panel content')).toHaveClass('collapsing');
    });

    it('Should set initial 0px height', (done) => {
      // given
      const onEnter = () => {
        // then
        expect(screen.getByText('Panel content')).toHaveStyle('height: 0px');
        done();
      };
      const { rerender } = render(
        <Component onEnter={onEnter}>Panel content</Component>
      );

      // when
      rerender(
        <Component onEnter={onEnter} in>
          Panel content
        </Component>
      );
    });

    it('Should set node to height', (done) => {
      // given
      const onEntering = () => {
        // then
        expect(screen.getByText('Panel content')).toHaveStyle('height: 100px');
        done();
      };
      const { rerender } = render(
        <Component onEntering={onEntering}>Panel content</Component>
      );

      // when
      rerender(
        <Component onEntering={onEntering} in>
          Panel content
        </Component>
      );
    });

    it('Should transition from collapsing to not collapsing', (done) => {
      // given
      const onEntering = () => {
        // then
        expect(screen.getByText('Panel content')).toHaveClass('collapsing');
      };
      const onEntered = () => {
        // then
        expect(screen.getByText('Panel content')).toHaveClass('collapse in');
        done();
      };
      const { rerender } = render(
        <Component onEntering={onEntering} onEntered={onEntered}>
          Panel content
        </Component>
      );

      // when
      rerender(
        <Component onEntering={onEntering} onEntered={onEntered} in>
          Panel content
        </Component>
      );
    });

    it('Should clear height after transition complete', (done) => {
      // given
      const onEntered = () => {
        // eslint-disable-next-line jest-dom/prefer-to-have-style
        expect(screen.getByText('Panel content')).toHaveAttribute('style', '');
        done();
      };

      const { rerender } = render(
        <Component onEntered={onEntered}>Panel content</Component>
      );

      // when
      rerender(
        <Component onEntered={onEntered} in>
          Panel content
        </Component>
      );
    });
  });

  describe('from expanded to collapsed', () => {
    it('Should have collapsing class', () => {
      // given
      const { rerender } = render(<Component in>Panel content</Component>);

      // when
      rerender(<Component>Panel content</Component>);

      // then
      expect(screen.getByText('Panel content')).toHaveClass('collapsing');
    });

    it('Should set initial height', (done) => {
      // given
      const onExit = () => {
        expect(screen.getByText('Panel content')).toHaveStyle('height: 15px');
        done();
      };
      const { rerender } = render(
        <Component onExit={onExit} in>
          Panel content
        </Component>
      );

      // when
      rerender(<Component onExit={onExit}>Panel content</Component>);
    });

    it('Should set node to height', (done) => {
      // given
      const onExiting = () => {
        expect(screen.getByText('Panel content')).toHaveStyle('height: 0px');
        done();
      };
      const { rerender } = render(
        <Component onExiting={onExiting} in>
          Panel content
        </Component>
      );

      // when
      rerender(<Component onExiting={onExiting}>Panel content</Component>);
    });

    it('Should transition from collapsing to not collapsing', (done) => {
      // given
      const onExited = () => {
        expect(screen.getByText('Panel content')).toHaveClass('collapse');
        done();
      };
      const { rerender } = render(
        <Component onExited={onExited} in>
          Panel content
        </Component>
      );

      // when
      rerender(<Component onExited={onExited}>Panel content</Component>);

      // then
      expect(screen.getByText('Panel content')).toHaveClass('collapsing');
    });

    it('Should have 0px height after transition complete', () => {
      // given
      const { rerender } = render(<Component in>Panel content</Component>);
      expect(screen.getByText('Panel content')).not.toHaveAttribute('style');

      // when
      rerender(<Component>Panel content</Component>);

      // then
      expect(screen.getByText('Panel content')).toHaveStyle('height: 0px');
    });
  });

  describe('expanded', () => {
    it('Should have collapse and in class', () => {
      // when
      render(<Component in>Panel content</Component>);

      // then
      expect(screen.getByText('Panel content')).toHaveClass('collapse in');
    });
  });

  describe('with a role', () => {
    it('sets aria-expanded true when expanded', () => {
      // given
      const { rerender } = render(
        <Component role="note">Panel content</Component>
      );
      expect(screen.getByText('Panel content')).not.toHaveAttribute(
        'aria-expanded',
        'true'
      );

      // when
      rerender(
        <Component role="note" in>
          Panel content
        </Component>
      );

      // then
      expect(screen.getByText('Panel content')).toHaveAttribute(
        'aria-expanded',
        'true'
      );
    });

    it('sets aria-expanded false when collapsed', () => {
      // given
      const { rerender } = render(
        <Component role="note" in>
          Panel content
        </Component>
      );
      expect(screen.getByText('Panel content')).toHaveAttribute(
        'aria-expanded',
        'true'
      );

      // when
      rerender(<Component role="note">Panel content</Component>);

      // then
      expect(screen.getByText('Panel content')).toHaveAttribute(
        'aria-expanded',
        'false'
      );
    });
  });
});
