import events from 'dom-helpers/events';
import React from 'react';
import ReactDOM from 'react-dom';
import ReactTestUtils from 'react-dom/test-utils';
import BaseModal from 'react-overlays/cjs/Modal';

import Modal from '../src/Modal';

import { render } from './helpers';

describe('<Modal>', () => {
  let mountPoint;

  beforeEach(() => {
    mountPoint = document.createElement('div');
    document.body.appendChild(mountPoint);
  });

  afterEach(() => {
    ReactDOM.unmountComponentAtNode(mountPoint);
    document.body.removeChild(mountPoint);
  });

  xit('Should render the modal content', () => {
    const noOp = () => {};
    const instance = render(
      <Modal show onHide={noOp} animation={false}>
        <strong>Message</strong>
      </Modal>,
      mountPoint
    );

    assert.ok(instance._modal.getDialogElement().querySelector('strong'));
  });

  xit('Should close the modal when the modal dialog is clicked', (done) => {
    const doneOp = () => {
      done();
    };

    const instance = render(
      <Modal show onHide={doneOp}>
        <strong>Message</strong>
      </Modal>,
      mountPoint
    );

    const dialog = instance._modal.getDialogElement();

    ReactTestUtils.Simulate.click(dialog);
  });

  xit('Should not close the modal when the "static" dialog is clicked', () => {
    const onHideSpy = sinon.spy();
    const instance = render(
      <Modal show onHide={onHideSpy} backdrop="static">
        <strong>Message</strong>
      </Modal>,
      mountPoint
    );

    const dialog = instance._modal.getDialogElement();

    ReactTestUtils.Simulate.click(dialog);

    expect(onHideSpy).to.not.have.been.called;
  });

  xit('Should close the modal when the modal close button is clicked', (done) => {
    const doneOp = () => {
      done();
    };

    const instance = render(
      <Modal show onHide={doneOp}>
        <Modal.Header closeButton />
        <strong>Message</strong>
      </Modal>,
      mountPoint
    );

    const button = instance._modal
      .getDialogElement()
      .getElementsByClassName('close')[0];

    ReactTestUtils.Simulate.click(button);
  });

  xit('Should pass className to the dialog', () => {
    const noOp = () => {};
    const instance = render(
      <Modal show className="mymodal" onHide={noOp}>
        <strong>Message</strong>
      </Modal>,
      mountPoint
    );

    const dialog = instance._modal.getDialogElement();

    assert.ok(dialog.className.match(/\bmymodal\b/));
  });

  xit('Should use bsClass on the dialog', () => {
    const noOp = () => {};
    const instance = render(
      <Modal show bsClass="mymodal" onHide={noOp}>
        <strong>Message</strong>
      </Modal>,
      mountPoint
    );

    const modal = instance._modal.getDialogElement();

    assert.ok(modal.className.match(/\bmymodal\b/));
    assert.ok(modal.children[0].className.match(/\bmymodal-dialog\b/));
    assert.ok(
      modal.children[0].children[0].className.match(/\bmymodal-content\b/)
    );

    const baseModal = ReactTestUtils.findRenderedComponentWithType(
      instance,
      BaseModal
    );
    assert.ok(baseModal.backdrop.className.match(/\bmymodal-backdrop\b/));
  });

  xit('Should use backdropClassName to add classes to the backdrop', () => {
    const noOp = () => {};
    const instance = render(
      <Modal show backdropClassName="my-modal-backdrop" onHide={noOp}>
        <strong>Message</strong>
      </Modal>,
      mountPoint
    );

    const baseModal = ReactTestUtils.findRenderedComponentWithType(
      instance,
      BaseModal
    );
    assert.ok(
      baseModal.backdrop.className.match(/\bmodal-backdrop my-modal-backdrop\b/)
    );
  });

  xit('Should pass bsSize to the dialog', () => {
    const noOp = () => {};
    const instance = render(
      <Modal show bsSize="small" onHide={noOp}>
        <strong>Message</strong>
      </Modal>,
      mountPoint
    );

    const dialog = instance._modal
      .getDialogElement()
      .getElementsByClassName('modal-dialog')[0];

    assert.ok(dialog.className.match(/\bmodal-sm\b/));
  });

  xit('Should pass dialog style to the dialog', () => {
    const noOp = () => {};
    const instance = render(
      <Modal show style={{ top: 1000 }} onHide={noOp}>
        <strong>Message</strong>
      </Modal>,
      mountPoint
    );

    const dialog = instance._modal.getDialogElement();

    assert.ok(dialog.style.top === '1000px');
  });

  xit('Should pass dialogClassName to the dialog', () => {
    const noOp = () => {};
    const instance = render(
      <Modal show dialogClassName="testCss" onHide={noOp}>
        <strong>Message</strong>
      </Modal>,
      mountPoint
    );

    const dialog = instance._modal
      .getDialogElement()
      .querySelector('.modal-dialog');

    assert.ok(dialog.className.match(/\btestCss\b/));
  });

  xit('Should use dialogComponentClass', () => {
    const noOp = () => {};

    function CustomDialog() {
      return <div className="custom-dialog" tabIndex="-1" />;
    }

    const instance = render(
      <Modal show dialogComponentClass={CustomDialog} onHide={noOp}>
        <strong>Message</strong>
      </Modal>,
      mountPoint
    );

    assert.equal(instance._modal.getDialogElement().className, 'custom-dialog');
  });

  xit('Should pass transition callbacks to Transition', (done) => {
    let count = 0;
    const increment = () => {
      ++count;
    };

    const instance = render(
      <Modal
        show
        onHide={() => {}}
        onExit={increment}
        onExiting={increment}
        onExited={() => {
          increment();
          expect(count).to.equal(6);
          done();
        }}
        onEnter={increment}
        onEntering={increment}
        onEntered={() => {
          increment();
          instance.renderWithProps({ show: false });
        }}
      >
        <strong>Message</strong>
      </Modal>,
      mountPoint
    );
  });

  describe('cleanup', () => {
    let offSpy;

    beforeEach(() => {
      offSpy = sinon.spy(events, 'off');
    });

    afterEach(() => {
      events.off.restore();
    });

    xit('should remove resize listener when unmounted', () => {
      class Component extends React.Component {
        constructor(props, context) {
          super(props, context);

          this.state = {
            show: true,
          };
        }

        render() {
          if (!this.state.show) {
            return null;
          }

          return <Modal show>Foo</Modal>;
        }
      }

      const instance = render(<Component />, mountPoint);
      instance.setState({ show: false });

      expect(offSpy).to.have.been.calledWith(window, 'resize');
    });
  });
});
