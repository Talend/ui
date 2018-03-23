import React from 'react';
import List from '../../List/List';
import * as Constants from '../../Constants';

class SchemaClassNameProvider {

  updateProps(props) {
    this.props = props;
  }

  get(element, key) {
    const {
      dataAccessor,
      selection,
      side,
      pendingItem,
      focusedElements,
      mappedElements,
      isHighlighted,
      isMapped,
      isSelected,
    } = this.props;
    if (element && key) {
      return `comp-list-row-data-${key} ${side}`;
    } else if (element) {
      return {
        'schema-element': true,
        highlighted: isHighlighted(
          dataAccessor,
          element,
          selection,
          side,
          pendingItem,
          focusedElements,
        ),
        mapped: isMapped(
          dataAccessor,
          element,
          mappedElements,
        ),
        selected: isSelected(
          dataAccessor,
          selection,
          element,
          side,
        ),
        input: side === Constants.MappingSide.INPUT,
        output: side === Constants.MappingSide.OUTPUT,
      };
    }
    return `schema-content ${side}`;
  }

}

class SchemaDndListener {

  updateProps(props) {
    this.props = props;
  }

  beginDrag(element) {
    return this.props.beginDrag(element, this.props.side);
  }

  canDrop(sourceItem, targetElement) {
    const targetItem = {
      element: targetElement,
      side: this.props.side,
    };
    return this.props.canDrop(sourceItem, targetItem);
  }

  drop(sourceItem, targetElement) {
    this.props.drop(targetElement, this.props.side);
    if (sourceItem.side === Constants.MappingSide.INPUT) {
			this.props.performMapping(sourceItem.element, targetElement,
        Constants.MappingSide.OUTPUT);
		} else {
			this.props.performMapping(targetElement, sourceItem.element,
        Constants.MappingSide.INPUT);
		}
  }

  endDrag() {
    this.props.endDrag();
  }

}

class RowDataGetter {

  updateProps(props) {
    this.props = props;
  }

  getData(element, key) {
    switch (key) {
      case Constants.Schema.DATA_KEYS.ID:
        return this.props.dataAccessor.getElementId(element);
      case Constants.Schema.DATA_KEYS.NAME:
        return this.props.dataAccessor.getElementName(element);
      case Constants.Schema.DATA_KEYS.TYPE:
        return this.props.dataAccessor.getElementType(element);
      case Constants.Schema.DATA_KEYS.DESC:
        return this.props.dataAccessor.getElementDescription(element);
      default:
        return 'No data available!';
    }
  }

}

export default class ListRenderer {

  constructor() {
    this.select = this.select.bind(this);
    this.revealConnection = this.revealConnection.bind(this);
    this.onEnterElement = this.onEnterElement.bind(this);
    this.onLeaveElement = this.onLeaveElement.bind(this);
    this.classNameProvider = new SchemaClassNameProvider();
    this.dndListener = new SchemaDndListener();
    this.rowDataGetter = new RowDataGetter();
  }

  getElement(ev) {
    const node = ev.currentTarget;
    const elementId = node.dataset.id;
    return this.props.dataAccessor.getSchemaElementFromId(this.props.schema, elementId);
  }

  select(ev) {
    const element = this.getElement(ev);
    this.props.onSelect(ev.ctrlKey, element, this.props.side);
  }

  revealConnection(ev) {
    const element = this.getElement(ev);
    this.props.revealConnection(element, this.props.side);
  }

  onEnterElement(element) {
    this.props.onEnterElement(element, this.props.side);
  }

  onLeaveElement(element) {
    this.props.onLeaveElement(element, this.props.side);
  }

  renderContent(props) {
    this.props = props;
    this.classNameProvider.updateProps(props);
    this.dndListener.updateProps(props);
    this.rowDataGetter.updateProps(props);
    const {
      dataAccessor,			
			schema,
			draggable,
      onScroll,
      columnKeys,
      updateContentNodeRef,
    } = props;
    return (
      <List
        classNameProvider={this.classNameProvider}
        elements={dataAccessor.getSchemaElements(schema)}
        dataKeys={columnKeys}
        rowDataGetter={this.rowDataGetter}
        onScroll={onScroll}
        draggable={draggable}
        dndListener={this.dndListener}
        onClick={this.select}
        onDoubleClick={this.revealConnection}
        updateListNodeRef={updateContentNodeRef}
        onEnterElement={this.onEnterElement}
        onLeaveElement={this.onLeaveElement}
      />
    );
  }

}
