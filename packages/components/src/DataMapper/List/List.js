import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import Row from './Row.js';
import DraggableRow from './DraggableRow.js';

function renderRow(
  element,
  classNameProvider,
  dataKeys,
  rowDataGetter,
  rowRenderers,
  draggable,
  dndListener,
  onClick,
  onDoubleClick,
  onEnterElement,
	onLeaveElement,
) {
  if (draggable) {
    return (
      <DraggableRow
  			key={rowDataGetter.getData(element, 'id')}
  			element={element}
  			onClick={onClick}
  			onDoubleClick={onDoubleClick}
        classNameProvider={classNameProvider}
        dataKeys={dataKeys}
        rowDataGetter={rowDataGetter}
        rowRenderers={rowRenderers}
        onEnterElement={onEnterElement}
  			onLeaveElement={onLeaveElement}
        dndListener={dndListener}
  		/>
    );
  }
  return (
    <Row
			key={rowDataGetter.getData(element, 'id')}
			element={element}
			onClick={onClick}
			onDoubleClick={onDoubleClick}
      classNameProvider={classNameProvider}
      dataKeys={dataKeys}
      rowDataGetter={rowDataGetter}
      rowRenderers={rowRenderers}
      onEnterElement={onEnterElement}
			onLeaveElement={onLeaveElement}
		/>
	);
}

export default class List extends Component {

  render() {
    const {
      classNameProvider,
      elements,
      dataKeys,
      rowDataGetter,
      rowRenderers,
      onScroll,
      draggable,
      dndListener,
      onClick,
      onDoubleClick,
      updateListNodeRef,
      onEnterElement,
			onLeaveElement,
    } = this.props;
    return (
      <div
        className={`comp-list ${classnames(classNameProvider.get())}`}
        ref={updateListNodeRef}
        onScroll={onScroll}
      >
        {elements.map(elem =>
          renderRow(
            elem,
            classNameProvider,
            dataKeys,
            rowDataGetter,
            rowRenderers,
            draggable,
            dndListener,
            onClick,
            onDoubleClick,
            onEnterElement,
      			onLeaveElement,
          )
        )}
      </div>
    );
  }
}

List.propTypes = {
	elements: PropTypes.array,
	classNameProvider: PropTypes.func,
  dataKeys: PropTypes.array,
  rowDataGetter: PropTypes.func,
  rowRenderers: PropTypes.object,
  onScroll: PropTypes.func,
	draggable: PropTypes.bool,
	onClick: PropTypes.func,
	onDoubleClick: PropTypes.func,
	onEnterElement: PropTypes.func,
	onLeaveElement: PropTypes.func,
	dndListener: PropTypes.func,
	updateListNodeRef: PropTypes.func,
};
