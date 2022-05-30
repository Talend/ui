import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import Carousel from './Carousel';

describe('<Carousel>', () => {
  const items = [
    <Carousel.Item key={1}>Item 1 content</Carousel.Item>,
    <Carousel.Item key={2}>Item 2 content</Carousel.Item>,
  ];

  it('Should show the correct item', () => {
    // when
    render(<Carousel activeIndex={1}>{items}</Carousel>);

    // then
    const item1 = screen.getByText('Item 1 content');
    const item2 = screen.getByText('Item 2 content');
    expect(item1).toBeInTheDocument();
    expect(item1).not.toHaveClass('active');
    expect(item2).toBeInTheDocument();
    expect(item2).toHaveClass('active');
  });

  it('Should show the correct item with defaultActiveIndex', () => {
    // when
    render(<Carousel defaultActiveIndex={1}>{items}</Carousel>);

    // then
    const item1 = screen.getByText('Item 1 content');
    const item2 = screen.getByText('Item 2 content');
    expect(item1).toBeInTheDocument();
    expect(item1).not.toHaveClass('active');
    expect(item2).toBeInTheDocument();
    expect(item2).toHaveClass('active');
    const list = screen.getByRole('list');
    expect(list).toBeInTheDocument();
    expect(list).toHaveClass('carousel-indicators');
    expect(list.querySelectorAll('li')).toHaveLength(2);
  });

  it('Should handle null children', () => {
    // when
    render(
      <Carousel activeIndex={1}>
        <Carousel.Item>Item 1 content</Carousel.Item>
        {null}
        {false}
        <Carousel.Item>Item 2 content</Carousel.Item>
      </Carousel>
    );

    // then
    const item1 = screen.getByText('Item 1 content');
    const item2 = screen.getByText('Item 2 content');
    expect(item1).toBeInTheDocument();
    expect(item1).not.toHaveClass('active');
    expect(item2).toBeInTheDocument();
    expect(item2).toHaveClass('active');
    const list = screen.getByRole('list');
    expect(list).toBeInTheDocument();
    expect(list).toHaveClass('carousel-indicators');
    expect(list.querySelectorAll('li')).toHaveLength(2);
  });

  it('Should call onSelect when indicator selected', () => {
    // given
    const onSelect = jest.fn();
    render(
      <Carousel activeIndex={1} onSelect={onSelect}>
        {items}
      </Carousel>
    );

    // when
    userEvent.click(screen.getAllByRole('listitem')[0]);

    // then
    expect(onSelect).toBeCalledWith(0);
  });

  it('Should call onSelect with direction', () => {
    // given
    const onSelect = jest.fn((index, event) => {}); // force the event with direction by requiring event in callback
    render(
      <Carousel activeIndex={1} onSelect={onSelect}>
        {items}
      </Carousel>
    );

    // when
    userEvent.click(screen.getAllByRole('listitem')[0]);

    // then
    expect(onSelect).toBeCalled();
    expect(onSelect.mock.calls[0][0]).toBe(0);
    expect(onSelect.mock.calls[0][1].direction).toBe('prev');
  });

  it('Should call onSelect with direction when there is no event', () => {
    // function onSelect(index, event) {
    //   expect(index).to.equal(0);
    //   expect(event.direction).to.equal('next');
    //   expect(event.target).to.not.exist;

    //   done();
    // }

    // given
    const onSelect = jest.fn((index, event) => {});
    render(
      <Carousel activeIndex={1} onSelect={onSelect}>
        {items}
      </Carousel>
    );

    // when
    userEvent.click(screen.getByRole('button', { name: 'Next' }));

    // then
    expect(onSelect).toBeCalled();
    expect(onSelect.mock.calls[0][0]).toBe(0);
    expect(onSelect.mock.calls[0][1].direction).toBe('next');
  });

  it('Should show back button control on the first image if wrap is true', () => {
    // given
    jest.useFakeTimers();
    render(
      <Carousel defaultActiveIndex={0} controls wrap>
        {items}
      </Carousel>
    );
    expect(screen.getByText('Item 1 content')).toHaveClass('active');

    // when
    userEvent.click(screen.getByRole('button', { name: 'Previous' }));
    jest.runAllTimers();

    // then
    expect(screen.getByText('Item 2 content')).toHaveClass('active');
  });

  it('Should show next button control on the last image if wrap is true', () => {
    // given
    jest.useFakeTimers();
    render(
      <Carousel defaultActiveIndex={1} controls wrap>
        {items}
      </Carousel>
    );
    expect(screen.getByText('Item 2 content')).toHaveClass('active');

    // when
    userEvent.click(screen.getByRole('button', { name: 'Next' }));
    jest.runAllTimers();

    // then
    expect(screen.getByText('Item 1 content')).toHaveClass('active');
  });

  it('Should not show the prev button on the first image if wrap is false', () => {
    // when
    render(
      <Carousel defaultActiveIndex={0} controls wrap={false}>
        {items}
      </Carousel>
    );

    // then
    expect(
      screen.queryByRole('button', { name: 'Previous' })
    ).not.toBeInTheDocument();
  });

  it('Should not show the next button on the last image if wrap is false', () => {
    // when
    render(
      <Carousel defaultActiveIndex={1} controls wrap={false}>
        {items}
      </Carousel>
    );

    // then
    expect(
      screen.queryByRole('button', { name: 'Next' })
    ).not.toBeInTheDocument();
  });

  it('Should allow user to specify a previous and next icon', () => {
    // when
    render(
      <Carousel
        activeIndex={1}
        controls
        wrap={false}
        prevIcon={<span className="ficon ficon-left" />}
        nextIcon={<span className="ficon ficon-right" />}
      >
        <Carousel.Item>Item 1 content</Carousel.Item>
        <Carousel.Item>Item 2 content</Carousel.Item>
        <Carousel.Item>Item 3 content</Carousel.Item>
      </Carousel>
    );

    // then
    expect(
      screen.getByRole('button', { name: 'Previous' }).firstChild
    ).toHaveClass('ficon-left');
    expect(screen.getByRole('button', { name: 'Next' }).firstChild).toHaveClass(
      'ficon-right'
    );
  });

  it('Should allow user to specify a previous and next SR label', () => {
    // when
    render(
      <Carousel
        activeIndex={1}
        controls
        wrap={false}
        prevLabel="Previous awesomeness"
        nextLabel="Next awesomeness"
      >
        <Carousel.Item>Item 1 content</Carousel.Item>
        <Carousel.Item>Item 2 content</Carousel.Item>
        <Carousel.Item>Item 3 content</Carousel.Item>
      </Carousel>
    );

    // then
    expect(
      screen.getByRole('button', { name: 'Previous awesomeness' })
    ).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: 'Next awesomeness' })
    ).toBeInTheDocument();
  });

  it('Should transition properly when slide animation is disabled', () => {
    // given
    render(
      <Carousel defaultActiveIndex={0} slide={false}>
        {items}
      </Carousel>
    );
    expect(screen.getByText('Item 1 content')).toHaveClass('active');

    // when
    userEvent.click(screen.getByRole('button', { name: 'Next' }));

    // then
    expect(screen.getByText('Item 2 content')).toHaveClass('active');

    // when
    userEvent.click(screen.getByRole('button', { name: 'Previous' }));

    // then
    expect(screen.getByText('Item 1 content')).toHaveClass('active');
  });

  it('Should render on update, default active item > new child length', () => {
    // given
    // default active is the 2nd item, which will be removed on
    // subsequent render
    const { rerender } = render(
      <Carousel defaultActiveIndex={1}>{items}</Carousel>
    );

    expect(screen.getByText('Item 1 content')).not.toHaveClass('active');
    expect(screen.getByText('Item 2 content')).toHaveClass('active');
    expect(screen.getAllByRole('listitem')).toHaveLength(2); // carousel-indicators

    const fewerItems = items.slice();
    fewerItems.pop();

    // when
    rerender(<Carousel defaultActiveIndex={0}>{fewerItems}</Carousel>);

    // then
    expect(screen.getByText('Item 1 content')).toHaveClass('active');
    expect(screen.getAllByRole('listitem')).toHaveLength(1);
  });

  it('Should render on update, active item > new child length', () => {
    // given
    // default active is the 2nd item, which will be removed on
    // subsequent render
    const { rerender } = render(<Carousel activeIndex={1}>{items}</Carousel>);
    expect(screen.getByText('Item 1 content')).not.toHaveClass('active');
    expect(screen.getByText('Item 2 content')).toHaveClass('active');
    expect(screen.getAllByRole('listitem')).toHaveLength(2); // carousel-indicators

    const fewerItems = items.slice();
    fewerItems.pop();

    // when
    rerender(<Carousel>{fewerItems}</Carousel>);

    // then
    expect(screen.getByText('Item 1 content')).toHaveClass('active');
    expect(screen.getAllByRole('listitem')).toHaveLength(1);
  });
});
